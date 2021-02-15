import React, { useEffect, useState } from'react';
import Link from'next/link';
import { useRouter } from 'next/router'
import { ADD_FRIEND, SET_USER, SEND_MESSAGE } from '../../redux/actions/userLIstActions';
import withRedux from 'next-redux-wrapper';
import { store } from '../../redux/store';

const makeStore = () => store;

function ChatPage() {
	const router = useRouter();
    function handleBackSelection() {
		router.back();
    }

    makeStore().dispatch({type: SET_USER, payload: router.query.id ? router.query.id :
        router.asPath.replace('/chat?id=', '')});
    const state = makeStore().getState();
    const user = state.users.selectedUser;
	const [text, setText] = useState('');
	function handleSubmit() {
		makeStore().dispatch({type: SEND_MESSAGE, payload: {
			message: text,
			sender: state.users.loggedUser,
			receiver: state.users.selectedUser,
		}});
	}
	function handleAddFriend() {
		makeStore().dispatch({type: ADD_FRIEND, payload: {
			loggedUser: state.users.loggedUser,
			friend: user
		}});
	}
	useEffect(() => {
		if (!state.users.loggedUser) {
			router.push('/login')
		}
	});
	const friend = state.users.loggedUser && state.users.loggedUser.friends && state.users.loggedUser.friends.find(friend => friend.user.id === user.id);
	return (
		<main>
            <div>You're logged as:
				{state.users.loggedUser && state.users.loggedUser.name}
			</div>
            {user ?
			    <h1>You're talking to {user && user.name}</h1>
            :
                <span>The user doesn't exist</span>
            }
			<button onClick={() => handleBackSelection()}>
                Back
            </button>
			{
				state.users.loggedUser && state.users.loggedUser.friends && friend ?
					<div>
						<label>
							Write a message:
							<input type="text" value={text} name="name" onChange={e => setText(e.target.value)}/>
						</label>
						<button onClick={() => handleSubmit()}>
							Send
						</button>
						<div>
							CHAT
							<div>
							{friend.chat.map((message) => {
							return <div key={message.date}>
										<span>{message.sender.username}</span>
										<span>{message.date}</span>
										<span>{message.text}</span>
									</div>
							})}
							</div>
					</div>
				</div>
				:
				<button onClick={() => handleAddFriend()}>Add as friend</button>
			}
			<Link href="/home">
				<a>Ir a <em>/home</em></a>
			</Link>
			<style>{`
				h1 { color: red; }
			`}</style>
		</main>
	);
}

export default withRedux(makeStore)(ChatPage);