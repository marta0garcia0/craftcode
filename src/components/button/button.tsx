import React from'react';
import styled from 'styled-components';

const Container = styled.button`
    background: ${props => (props.bg ? props.bg : "orange")};
    color: white;
    font-size: 15px;
    padding: 10px 30px;
    border: none;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
`;

const Button = ({bg = '', text = '', handleAction}) => 
    <Container bg={bg} onClick={handleAction}>
        {text}
    </Container>

export default Button;