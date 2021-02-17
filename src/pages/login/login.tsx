import React, { Component, useEffect } from'react';
import Link from'next/link';
import { User } from '../../models/user';
import { getUserList } from '../../getUserList';
import { useRouter } from 'next/router';
import withRedux from "next-redux-wrapper";
import { persistor, store } from '../../redux/store';
import { SET_LOGGED_USER } from '../../redux/actions/userLIstActions';
import Grid from '../../containers/grid/grid';
import Header from '../../containers/header/header';

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
		router.push('/home');
	}
	  
	useEffect(() => {
		if (!props.users) {
			router.reload()
		}
	})
	return (
		<main>
			<Header></Header>
			<Grid users={props.users} handleUserSelection={handleUserSelection}></Grid>
			<style>{`
				.user-container: {background-color: red}
				h1 { color: blue; }
			`}</style>
		</main>
	);
}
LoginPage.getInitialProps = getUserList;

export default withRedux(makeStore)(LoginPage);