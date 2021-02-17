import React from'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';
import UserBox from '../../components/user-box/userBox';

const Container = styled.button`
    background: ${props => (props.bg ? props.bg : "orange")};
    color: white;
    font-size: 15px;
    padding: 10px 30px;
    border: none;
    border-radius: 3px;
    font-weight: 500;
`;

const Button = ({bg = null, text, handleAction}) => {
	return (
        <Container bg={bg} onClick={handleAction}>
            {text}
        </Container>
	);
}

export default Button;