import React from'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';
import UserBox from '../../components/user-box/userBox';

const Item = styled.div`
    display: flex;
    justify-content: center;
    padding: .5rem;
    height: max-content;
    max-width: 300px;
    cursor: pointer;

    ${({ color = chroma.random() }) =>
        css`
            background-color: ${color};
            color: ${chroma.contrast(color, "black") >= 4 ? "black" : "white"};
            font-size: 12px;
            font-weight: bold;
    `}
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 5px;
    @media (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;
const Grid = ({loggedUser = null, users, handleUserSelection}) => {
	return (
        <Container>
            {users.sort((userA, userB) => {
                    if (loggedUser && userA.friends && userA.friends.find((friend) => friend.user.id === loggedUser.id)) {
                        return -1;
                    }
                    return 1;
                })
                .map(user => <Item className='user-item' key={user.id} onClick={() => handleUserSelection(user)}>
                <UserBox loggedUser={loggedUser} user={user}></UserBox>
            </Item>)}
        </Container>
	);
}

export default Grid;