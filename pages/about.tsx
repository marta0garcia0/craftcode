import React, { Component } from'react';
import Link from'next/link';
import { usersData } from '../constants';
import { User } from '../models/user';
import { getStaticProps } from './getStaticProps';

interface IProps {
	users: User[],
	notFound: boolean
}

function AboutPage(props: IProps) {
	return (
		<main>
			{
				props.users && props.users.map(user => 
					<div>
						<span>{user.name}</span>
						<span>{user.username}</span>
						<span>{user.email}</span>
					</div>
				)
			}
			<Link prefetch href="/">
				<a>Ir a <em>/</em></a>
			</Link>
			<style>{`
				h1 { color: blue; }
			`}</style>
		</main>
	);
}
AboutPage.getInitialProps = getStaticProps;

export default AboutPage;