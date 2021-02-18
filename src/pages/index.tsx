import React from'react';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { store } from '../redux/store';

function IndexPage() {
	const state = store.getState();
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

export default (IndexPage);