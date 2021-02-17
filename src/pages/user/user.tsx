import React, { useEffect, useState } from'react';
import Link from'next/link';
import { useRouter } from 'next/router'
import { SET_USER, ADD_FRIEND } from '../../redux/actions/userLIstActions';
import withRedux from 'next-redux-wrapper';
import { store } from '../../redux/store';
import UserBox from '../../components/user-box/userBox';
import chroma from 'chroma-js';
import styled, { css } from 'styled-components';
import Header from '../../containers/header/header';
import Button from '../../components/button/button';

const Body = styled.div`
	${({ color = chroma.random() }) =>
	css`
		background-color: ${color};
		color: ${chroma.contrast(color, "black") >= 4 ? "black" : "white"};
	`}
    position:relative;
    width: calc(100% - 20px);
    height: calc(100% - 70px);
	padding: 10px;
`;
const Container = styled.div`
	height: 100%;
`;

const makeStore = () => store;
const madeStore = makeStore();
function UserPage() {
    const router = useRouter()
    function handleChatSelection(user) {
		router.push({
			pathname: '/chat',
			query: { id: user }
		});
    }
    function handleAddFriend() {
		madeStore.dispatch({type: ADD_FRIEND, payload: {
			loggedUser: madeStore.getState().users.loggedUser,
			friend: user
		}});
		setUser(madeStore.getState().users.selectedUser);
		// router.reload();
	}
    madeStore.dispatch({type: SET_USER, payload: router.query.id ? router.query.id :
        router.asPath.replace('/user?id=', '')});
    const state = madeStore.getState();
	const [user, setUser] = useState(state.users.selectedUser);
	const friend = state.users.loggedUser && state.users.loggedUser.friends && state.users.loggedUser.friends.find(friend => friend.user.id === user.id);
	useEffect(() => {
		if (!state.users.loggedUser) {
			router.push('/login')
		}
	});
    return (
		<Container>
			<Header user={state.users.loggedUser}></Header>
			<Body>
				<Button bg={'#FF595E'} text={'Chat'}
					handleAction={() => handleChatSelection(router.query.id)}>
				</Button>
				<div>
				{
					state.users.loggedUser && state.users.loggedUser.friends && friend ?
					<span>{user.name} is added as friend</span> :
					<Button text={'Add as friend'}
						handleAction={() => handleAddFriend()}>
					</Button>
				}
				</div>
				{user ?
					<UserBox complete={true} user={user}></UserBox>
				:
					<span>The user doesn't exist</span>
				}
				<style>{`
					h1 { color: red; }
				`}</style>
			</Body>
		</Container>
	);
}

export default withRedux(makeStore)(UserPage);