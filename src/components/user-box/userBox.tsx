import React from'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 40px 0 20px;
    text-align: center;
`;

const UserBox = ({user, loggedUser = null, complete = false}) => {
	return (
        <Container key={user.id}>
            <img src={'/images/user.png'} width={70}></img>
            <h2>{user.name}</h2>
            <h3>Username: <span>{user.username}</span></h3>
            <h3>email: <span>{user.email}</span></h3>
            {loggedUser && user.friends && user.friends.find(friend => friend.user.id === loggedUser.id) ?
                <h3>{user.name} is your friend</h3>: <h3>You're not friends yet</h3>}

            {complete ?
            <div>
                <h3>Address:
                    <span> {user.address.street}</span>,
                    <span> {user.address.suite}</span>,
                    <span> {user.address.city}</span>,
                    <span> {user.address.zipcode}</span>
                </h3>
                <h3>Company:
                    <span> {user.company.name}</span>
                    <span> ({user.company.catchPhrase},</span>
                    <span> {user.company.bs})</span>
                </h3>
                <h3>Phone: <span>{user.phone}</span></h3>
                <h3>Website: <span>{user.website}</span></h3>
            </div>
            : ''
            }
        </Container>
	);
}

export default UserBox;