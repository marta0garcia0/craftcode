import React, { useEffect, useState } from'react';
import Link from'next/link';
import { useRouter } from 'next/router'
import { ADD_FRIEND, SET_USER, SEND_MESSAGE } from '../../redux/actions/userLIstActions';
import withRedux from 'next-redux-wrapper';
import { store } from '../../redux/store';
import Header from '../../containers/header/header';
import Button from '../../components/button/button';
import Chat from '../../containers/chat/chat';

const makeStore = () => store;
const madeStore = makeStore();

function ChatPage() {
	const router = useRouter();
    function handleBackSelection() {
		router.back();
    }
	if (!madeStore.getState().users.selectedUser || parseInt(router.asPath.replace('/chat?id=', '')) !== madeStore.getState().users.selectedUser.id) {
		madeStore.dispatch({type: SET_USER, payload: router.query.id ? router.query.id :
			router.asPath.replace('/chat?id=', '')});
	}
    const user = madeStore.getState().users.selectedUser;
	const [text, setText] = useState('');
	const friend = madeStore.getState().users.loggedUser && madeStore.getState().users.loggedUser.friends && madeStore.getState().users.loggedUser.friends.find(friend => friend.user.id === user.id);
	const [chat, setChat] = useState(friend && friend.chat);
	function handleSubmit() {
		const newChat = {
			message: text,
			sender: madeStore.getState().users.loggedUser,
			receiver: madeStore.getState().users.selectedUser,
		};
		madeStore.dispatch({type: SEND_MESSAGE, payload: newChat});
		setChat(madeStore.getState().users.loggedUser.friends.find(friend => friend.user.id === user.id).chat);
		setText('');
	}
	function handleAddFriend() {
		madeStore.dispatch({type: ADD_FRIEND, payload: {
			loggedUser: madeStore.getState().users.loggedUser,
			friend: user
		}});
		router.reload();
	}
	useEffect(() => {
		if (!madeStore.getState().users.loggedUser) {
			router.push('/login')
		}
	});

	return (
		<div style={{'height': '100%'}}>
			<Header user={madeStore.getState().users.loggedUser}></Header>
			<Chat user={user} loggedUser={madeStore.getState().users.loggedUser}
				friend={friend} chat={chat} handleSubmit={handleSubmit} text={text}
				setText={setText} handleAddFriend={handleAddFriend} handleBackSelection={handleBackSelection}/>
		</div>
	);
}

export default withRedux(makeStore)(ChatPage);