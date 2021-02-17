import React, { useEffect } from'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';
import UserBox from '../../components/user-box/userBox';
import Button from '../../components/button/button';

const Container = styled.div`
    background-color: #f2f2f2;
    color: #333;
    font-size: 15px;
    padding: 10px 30px;
    border: none;
    border-radius: 3px;
    font-weight: 500;
`;
const ChatContainer = styled.div`
    max-height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    .separator {
        height: 10px;
    }
`;

const messagesEndRef = React.createRef()

const Chat = ({user, loggedUser, text, friend, chat, handleSubmit, handleAddFriend, setText}) => {
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
	});
    function handleEnter() {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        return handleSubmit();
    }
	return (
        <Container>
            
            {user ?
			    <h1>You're talking to {user && user.name}</h1>
            :
                <span>The user doesn't exist</span>
            }
			{
				loggedUser && loggedUser.friends && friend ?
					<div>
						<div>
							CHAT
							<ChatContainer ref={messagesEndRef}>
                                {chat.map((message) => {
                                return <div key={message.date}>
                                        <span>{message.sender.name}</span>
                                        <span>, {new Date(message.date).toLocaleString()}</span>
                                        <div><span>{message.text}</span></div>
                                    </div>
                                })}
                                <div className='separator' />
							</ChatContainer>
	    				</div>
                        <label>
							Write a message:
							<input type="text" value={text} name="name"
								onKeyDown={(e) => {if (e.code === 'Enter') {handleEnter()}}}
								onChange={e => setText(e.target.value)}/>
						</label>
						<Button text={'send'} handleAction={() => handleEnter()}>
							Send
						</Button>

    				</div>
				:
				<Button handleAction={() => handleAddFriend()} text={'Add as friend'}></Button>
			}
        </Container>
	);
}

export default Chat;
