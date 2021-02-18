import React, { useEffect } from'react';
import { User } from '../../models/user';
import { useRouter } from 'next/router';
import { store } from '../../redux/store';
import Grid from '../../containers/grid/grid';
import UserBox from '../../components/user-box/userBox';
import Header from '../../containers/header/header';
import HOC from '../hoc';

interface IProps {
	users: User[],
}

function HomePage(props: IProps) {
	const router = useRouter();
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

	const handleUserSelection = (user) => {
		router.push({
			pathname: '/user',
			query: { id: user.id }
		});
	};
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

HomePage.getInitialProps = HOC.getUserList;

export default (HomePage);
