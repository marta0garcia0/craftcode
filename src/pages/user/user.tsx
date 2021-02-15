import React, { useEffect } from'react';
import Link from'next/link';
import { useRouter } from 'next/router'
import { SET_USER, ADD_FRIEND } from '../../redux/actions/userLIstActions';
import withRedux from 'next-redux-wrapper';
import { store } from '../../redux/store';

const makeStore = () => store;

function UserPage() {
    const router = useRouter()
    function handleChatSelection(user) {
		router.push({
			pathname: '/chat',
			query: { id: user }
		});
    }
    function handleAddFriend() {
		makeStore().dispatch({type: ADD_FRIEND, payload: {
			loggedUser: state.users.loggedUser,
			friend: user
		}});
	}
    makeStore().dispatch({type: SET_USER, payload: router.query.id ? router.query.id :
        router.asPath.replace('/user?id=', '')});
    const state = makeStore().getState();
    const user = state.users.selectedUser;
	const friend = state.users.loggedUser && state.users.loggedUser.friends && state.users.loggedUser.friends.find(friend => friend.user.id === user.id);
	useEffect(() => {
		if (!state.users.loggedUser) {
			router.push('/login')
		}
	});
    return (
		<main>
            <div>You're logged as:
				{state.users.loggedUser && state.users.loggedUser.name}
			</div>
            {user ?
			    <h1>{user && user.name}</h1>
            :
                <span>The user doesn't exist</span>
            }
            <button onClick={() => handleChatSelection(router.query.id)}>
                <a>Ir a <em>/chat</em></a>
            </button>
			<Link href="/home">
				<a>Ir a <em>/home</em></a>
			</Link>
            {
				state.users.loggedUser && state.users.loggedUser.friends && friend ?
                <span>you're friends</span> :
                <button onClick={() => handleAddFriend()}>Add as friend</button>

            }

			<style>{`
				h1 { color: red; }
			`}</style>
		</main>
	);
}

export default withRedux(makeStore)(UserPage);