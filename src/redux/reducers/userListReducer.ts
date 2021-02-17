import { Message } from '../../models/message';
import { User, Friend } from '../../models/user';
import { ADD_FRIEND, SEND_MESSAGE, SET_USER, SET_LOGGED_USER, ADD_USER_LIST, SET_USER_LIST } from '../actions/userLIstActions';

interface State {
    selectedUser: User,
    loggedUser: User,
    users: User[]
}

const userListReducer = (state: State = {selectedUser: null, loggedUser: null, users: []}, action) => {
    switch (action.type) {
        case SET_LOGGED_USER:
            return {...state, loggedUser: action.payload};
        case ADD_USER_LIST:
            return {...state, users: state.users.concat(action.payload)};
        case SET_USER_LIST:
            return {...state, users: action.payload};
        case SET_USER:
            return {...state, selectedUser: state.users.find((user) => user.id === parseInt(action.payload))};
        case ADD_FRIEND:
            let modifiedUser, modifiedFriend;
            const userList = state.users.map((user) => {
                if (user.id === action.payload.loggedUser.id &&
                        (!user.friends || !user.friends.find(friend => friend.user.id === action.payload.friend.id) )) {
                    const friends = user.friends ? 
                        user.friends.concat({
                            user: action.payload.friend,
                            chat: []
                        } as Friend) : [{user: action.payload.friend, chat: []}];
                    modifiedUser = {...user, friends}
                    return modifiedUser;
                }
                if (user.id === action.payload.friend.id &&
                        (!user.friends || !user.friends.find(friend => friend.user.id === action.payload.loggedUser.id) )) {
                    const friends = user.friends ? 
                        user.friends.concat({
                            user: action.payload.loggedUser,
                            chat: []
                        } as Friend) : [{user: action.payload.loggedUser, chat: []}];
                    modifiedFriend = {...user, friends}
                    return modifiedFriend;
                }
                return user;
            });
            return {...state, loggedUser: modifiedUser ? modifiedUser : state.loggedUser,
                selectedUser: modifiedFriend ? modifiedFriend : state.selectedUser, users: userList};
        case SEND_MESSAGE:
            const sender = state.users.find((user) => user.id === parseInt(action.payload.sender.id));
            const receiver = state.users.find((user) => user.id === parseInt(action.payload.receiver.id));
            const message = action.payload.message;
            let senderModified;
            let receiverModified;
            const users = state.users.map((user) => {
                const newMessage: Message = {
                    text: message,
                    sender: sender,
                    receiver: receiver,
                    date: (new Date()).getTime()
                };
                if (user.id === action.payload.sender.id) {
                    const friends = user.friends.map(friend => {
                        if (friend.user.id === receiver.id) {
                            return {...friend, chat: friend.chat.concat(newMessage)};
                        } else {
                            return friend;
                        }
                    });
                    senderModified = {...user, friends};
                    return senderModified;
                }
                if (user.id === action.payload.receiver.id) {
                    const friends = action.payload.receiver.friends.map(friend => {
                        if (friend.user.id === sender.id) {
                            return {...friend, chat: friend.chat.concat(newMessage)};
                        } else {
                            return friend;
                        }
                    });
                    receiverModified = {...user, friends};
                    return receiverModified;
                }
                return user;
            })
            return {...state, users, loggedUser: senderModified, selectedUser: receiverModified};
        default:
            return state;
    }
};

export default userListReducer;