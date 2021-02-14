import React from'react';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import withRedux from "next-redux-wrapper";
import { store } from '../redux/store';

// Here you would fetch and return the user
const makeStore = () => store;
const makePersistor = () => store;
console.log(makeStore, makePersistor)

function IndexPage() {
	const state = makeStore().getState();
	const useUser = () => ({ user: state.users.loggedUser, loading: false });
	const { user, loading } = useUser()
	const router = useRouter()
	
	useEffect(() => {
		if (!(user || loading)) {
			router.push('/login')
		} else {
			router.push('/home')
		}
	}, [user, loading])
  
	return (
		<div>
			<p>Redirecting...</p>
		</div>
	);
}

export default withRedux(makeStore)(IndexPage);