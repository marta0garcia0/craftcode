import React, { Component, useEffect } from'react';
import Link from'next/link';
import { User } from '../../models/user';
import { getUserList } from '../getUserList';
import { useRouter } from 'next/router';
import withRedux from "next-redux-wrapper";
import { persistor, store } from '../../redux/store';
import { SET_LOGGED_USER } from '../../redux/actions/userLIstActions';

interface IProps {
	users: User[],
	notFound: boolean
}

const makeStore = () => store;

function LoginPage(props: IProps) {
	const makeStore = () => store;
	const router = useRouter()
	function handleUserSelection(user) {
		makeStore().dispatch({type: SET_LOGGED_USER, payload: user});
	}
	  
	useEffect(() => {
		if (!props.users) {
			router.reload()
		}
	})
	return (
		<main>
			<span>Choose your user:</span>
			{
				props.users && props.users.map(user => 
					<div key={user.id}>
						<div className='user-container' onClick={() => handleUserSelection(user)}>
							<span>{user.name}</span>
							<span>{user.username}</span>
							<span>{user.email}</span>
						</div>
					</div>
				)
			}
			<Link prefetch href="/home">
				<a>Ir a <em>/home</em></a>
			</Link>
			<style>{`
				.user-container: {background-color: red}
				h1 { color: blue; }
			`}</style>
		</main>
	);
}
LoginPage.getInitialProps = getUserList;

export default withRedux(makeStore)(LoginPage);