import React, { useEffect } from'react';
import { User } from '../../models/user';
import { useRouter } from 'next/router';
import { store } from '../../redux/store';
import Grid from '../../containers/grid/grid';
import UserBox from '../../components/user-box/userBox';
import Header from '../../containers/header/header';
import { getUserList } from '../../getUserList';

interface IProps {
	users: User[],
}

function HomePage(props: IProps) {
	const router = useRouter();
	function handleUserSelection(user) {
		router.push({
			pathname: '/user',
			query: { id: user.id }
		});
	}
	const state = store.getState();
	const users = props.users && props.users.length > 0 && state.users.loggedUser &&
		props.users.filter(user => user.id !== state.users.loggedUser.id);
    
	useEffect(() => {
		if (!state.users.loggedUser) {
			router.push('/login');
		} else if (!props.users || props.users.length === 0) {
			router.reload();
		}
	});
	
	return (
		<div>
			<Header user={state.users.loggedUser}></Header>
			{state.users.loggedUser ?
				<UserBox user={state.users.loggedUser}></UserBox> :
				''
			}
			{state.users.loggedUser && users ?
				<Grid loggedUser={state.users.loggedUser} users={users} handleUserSelection={handleUserSelection}></Grid> :
				''
			}
		</div>
	);
}

HomePage.getInitialProps = getUserList;

export default (HomePage);
