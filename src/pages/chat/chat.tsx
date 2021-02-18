import React, { useEffect, useState } from'react';
import { useRouter } from 'next/router'
import { ADD_FRIEND, SET_USER, SEND_MESSAGE } from '../../redux/actions/userLIstActions';
import { store } from '../../redux/store';
import Header from '../../containers/header/header';
import Chat from '../../containers/chat/chat';

function ChatPage() {
	const router = useRouter();
	if (!store.getState().users.selectedUser || parseInt(router.asPath.replace('/chat?id=', '')) !== store.getState().users.selectedUser.id) {
		store.dispatch({type: SET_USER, payload: router.query.id ? router.query.id :
			router.asPath.replace('/chat?id=', '')});
	}
    const user = store.getState().users.selectedUser;
	const [text, setText] = useState('');
	const friend = store.getState().users.loggedUser && store.getState().users.loggedUser.friends && store.getState().users.loggedUser.friends.find(friend => friend.user.id === user.id);
	const [chat, setChat] = useState(friend && friend.chat);

	const handleBackSelection = () => {
		router.back();
    };

	const handleSubmit = () => {
		const newChat = {
			message: text,
			sender: store.getState().users.loggedUser,
			receiver: store.getState().users.selectedUser,
		};
		store.dispatch({type: SEND_MESSAGE, payload: newChat});
		setChat(store.getState().users.loggedUser.friends.find(friend => friend.user.id === user.id).chat);
		setText('');
	};

	const handleAddFriend = () => {
		store.dispatch({type: ADD_FRIEND, payload: {
			loggedUser: store.getState().users.loggedUser,
			friend: user
		}});
		router.reload();
	};

	useEffect(() => {
		if (!store.getState().users.loggedUser) {
			router.push('/login')
		}
	});

	return (
		<div style={{'height': '100%'}}>
			<Header user={store.getState().users.loggedUser}></Header>
			<Chat user={user} loggedUser={store.getState().users.loggedUser}
				friend={friend} chat={chat} handleSubmit={handleSubmit} text={text}
				setText={setText} handleAddFriend={handleAddFriend} handleBackSelection={handleBackSelection}/>
		</div>
	);
}

export default (ChatPage);