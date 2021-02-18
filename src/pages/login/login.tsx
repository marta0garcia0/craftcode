import React, { useEffect } from'react';
import { User } from '../../models/user';
import { getUserList } from '../../getUserList';
import { useRouter } from 'next/router';
import { store } from '../../redux/store';
import { SET_LOGGED_USER } from '../../redux/actions/userLIstActions';
import Grid from '../../containers/grid/grid';
import Header from '../../containers/header/header';

interface IProps {
	users: User[],
}

function LoginPage(props: IProps) {
	const router = useRouter()
	function handleUserSelection(user) {
		store.dispatch({type: SET_LOGGED_USER, payload: user});
		router.push('/home');
	}
	  
	useEffect(() => {
		if (!props.users || props.users.length === 0) {
			router.reload();
		}
	});

	return (
		<main>
			<Header></Header>
			<Grid users={props.users} handleUserSelection={handleUserSelection}></Grid>
		</main>
	);
}
LoginPage.getInitialProps = getUserList;

export default (LoginPage);