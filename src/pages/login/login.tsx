import React, { useEffect } from'react';
import { User } from '../../models/user';
import { useRouter } from 'next/router';
import { store } from '../../redux/store';
import { SET_LOGGED_USER } from '../../redux/actions/userLIstActions';
import Grid from '../../containers/grid/grid';
import Header from '../../containers/header/header';
import HOC from '../hoc';

interface IProps {
	users: User[],
}

function LoginPage(props: IProps) {
	const router = useRouter()
	  
	useEffect(() => {
		if (!props.users || props.users.length === 0) {
			router.reload();
		}
	});

	const handleUserProfileSelection = (user) => {
		store.dispatch({type: SET_LOGGED_USER, payload: user});
		router.push('/home');
	};
	return (
		<main>
			<Header></Header>
			<Grid users={props.users} handleUserSelection={handleUserProfileSelection}></Grid>
		</main>
	);
}
LoginPage.getInitialProps = HOC.getUserList;

export default (LoginPage);