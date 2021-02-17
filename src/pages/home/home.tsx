import React, { useEffect } from'react';
import Link from'next/link';
import { User } from '../../models/user';
import { getUserList } from '../../getUserList';
import { useRouter } from 'next/router';
import withRedux from 'next-redux-wrapper';
import { store } from '../../redux/store';
import Grid from '../../containers/grid/grid';
import UserBox from '../../components/user-box/userBox';
import Header from '../../containers/header/header';

interface IProps {
	users: User[],
	notFound: boolean
}
const makeStore = () => store;

function HomePage(props: IProps) {
	const router = useRouter()
	function handleUserSelection(user) {
		router.push({
			pathname: '/user',
			query: { id: user.id }
		});
	}
	    
	useEffect(() => {
		if (!state.users.loggedUser) {
			router.push('/login')
		}
		if (!props.users || props.users.length === 0) {
			router.reload()
		}
	});
	const state = makeStore().getState();
	const users = props.users && props.users.length > 0 && state.users.loggedUser &&
		props.users.filter(user => user.id !== state.users.loggedUser.id);

	return (
		<div>
			<Header user={state.users.loggedUser}></Header>
			{state.users.loggedUser ?
				<UserBox user={state.users.loggedUser}></UserBox> :
				''
			}
			{state.users.loggedUser ?
				<Grid loggedUser={state.users.loggedUser} users={users} handleUserSelection={handleUserSelection}></Grid> :
				''
			}
		</div>
	);
}
HomePage.getInitialProps = getUserList;

export default withRedux(makeStore)(HomePage);
