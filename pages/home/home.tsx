import React, { useEffect } from'react';
import Link from'next/link';
import { User } from '../../models/user';
import { getUserList } from '../getUserList';
import { useRouter } from 'next/router';
import withRedux from 'next-redux-wrapper';
import { store } from '../../redux/store';

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
		if (!props.users) {
			router.reload()
		}
	})
	const state = makeStore().getState();
	return (
		<main>
			<div>You're logged as:
				{state.users.loggedUser && state.users.loggedUser.name}
			</div>
			{
				props.users && props.users.filter(user => user.id !== state.users.loggedUser.id)
				.map(user => 
					<div key={user.id} onClick={() => handleUserSelection(user)}>
						<span>{user.name}</span>
						<span>{user.username}</span>
						<span>{user.email}</span>
					</div>
				)
			}
			<div>
				<Link prefetch href='/'>
					<a>Ir a <em>/</em></a>
				</Link>
			</div>
			<div>
				<Link prefetch href='/login'>
					<a>Ir a <em>/login</em></a>
				</Link>
			</div>			
			<style>{`
				h1 { color: blue; }
			`}</style>
		</main>
	);
}
HomePage.getInitialProps = getUserList;

export default withRedux(makeStore)(HomePage);
