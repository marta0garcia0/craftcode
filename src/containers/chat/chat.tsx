import React, { useEffect } from'react';
import styled, { css } from 'styled-components';
import Button from '../../components/button/button';

const Container = styled.div`
    height: calc(100% - 70px);
    background-color: lightgrey;
    color: #333;
    font-size: 15px;
    padding: 10px 30px;
    border: none;
    border-radius: 3px;
    font-weight: 500;
`;
const ChatContainer = styled.div`
    @media (min-width: 480px) {
        width: 400px;
        height: 423px;
        .chat-list {
            height: 280px;
        }
    }
    @media (min-width: 768px) {
        width: 600px;
        height: 486px;
        .chat-list {
            height: 380px;
        }
    }
    @media (min-width: 1024px) {
        width: 700px;
        height: 386px;
        .chat-list {
            height: 280px;
        }
    }
    @media (min-width: 1400px) {
        width: 700px;
        height: 586px;
        .chat-list {
            height: 480px;
        }
    }
    width: 700px;
    max-height: 586px;
    border: 1px solid blue;
    border-radius: 10px;
    background-color: lightblue;
    margin: 0 auto;
    .chat-list {
        padding: 10px;
        overflow: hidden;
        overflow-y: scroll;
        ::-webkit-scrollbar {
            width: 5px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #888; 
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    }
    .separator {
        padding: 10px;
        background-color: lightpink;
        margin-top: 10px;
        bottom: 0px;
    }
    .sender {
        float: right;    
        width: 300px;
        background-color: lightgreen;
        margin: 5px 10px 5px calc(100% - 300px);
    }
    .bubble {
        position: relative;
        width: 300px;
        padding: 5px;
        border-radius: 5px;
    }
    .receiver {
        margin: 5px calc(100% - 300px) 5px 10px;
        float: left;
        background-color: lightyellow;
    }
    .sb1:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 5px solid lightgreen;
        border-right: 5px solid transparent;
        border-top: 5px solid lightgreen;
        border-bottom: 5px solid transparent;
        right: -10px;
        top: 6px;
    }
    .sb2:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid lightyellow;
        border-top: 5px solid transparent;
        border-bottom: 5px solid lightyellow;
        left: -10px;
        top: 6px;
    }
    .tooltip {
        position: absolute;
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        z-index: 1;
    }
    .sender:hover .tooltip {
        visibility: visible;
    }
    .receiver:hover .tooltip {
        visibility: visible;
    }
`;
const Input = styled.input`
  font-size: 14px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;
const messagesEndRef = React.createRef<HTMLDivElement>()

const Chat = ({user, loggedUser, text, friend, chat, handleSubmit, handleAddFriend, handleBackSelection, setText}) => {
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current['scrollTop'] = messagesEndRef.current['scrollHeight'];
        }
	});
    const handleEnter = (e?) => {
        if (!e || e.keyCode === 13 || (e.nativeEvent && e.nativeEvent.keyCode === 13 || e.nativeEvent && e.nativeEvent.code === 'Enter')) {
            messagesEndRef.current['scrollTop'] = messagesEndRef.current['scrollHeight'];
            return handleSubmit();
        }
    };
	return (
        <Container>
            <Button bg={'#FF595E'} text={'Back'} handleAction={() => handleBackSelection()} />
            {user ?
			    <h2>Chat with {user && user.name}</h2>
            :
                <span>The user doesn't exist</span>
            }
			{
				loggedUser && loggedUser.friends && friend ?
					<div>
                        <ChatContainer>
                            <div className='chat-list' ref={messagesEndRef}>
                                {chat.length > 0 ?
                                    chat.map((message) => {
                                        if (message.sender.id === loggedUser.id) {
                                            return (
                                                <div className='bubble sender sb1' key={message.date}>
                                                    <span style={{fontWeight: 'bold'}}>{message.sender.username}</span>
                                                    <span style={{fontSize: '12px'}}>, {new Date(message.date).toLocaleString()}</span>
                                                    <div><span>{message.text}</span></div>
                                                    <div className='tooltip'>
                                                        <span>{message.sender.name}</span>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className='bubble receiver sb2' key={message.date}>
                                                    <span style={{fontWeight: 'bold'}}>{message.sender.username}</span>
                                                    <span style={{fontSize: '12px'}}>, {new Date(message.date).toLocaleString()}</span>
                                                    <div><span>{message.text}</span></div>
                                                    <div className='tooltip'>
                                                        <span>{message.sender.name}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                    :
                                    <div className='bubble-container'>
                                        <div className='bubble sender sb1'>
                                            <div><span>{'This is the very first time you chat'}</span></div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='separator'>
                                <label>
                                    Write a message:
                                    <Input type="text" value={text} name="name"
                                        onKeyDown={handleEnter}
                                        onChange={e => setText(e.target.value)}/>
                                </label>
                                <Button text={'send'} handleAction={() => handleEnter()} />
                            </div>
                        </ChatContainer>
    				</div>
				:
				<Button handleAction={() => handleAddFriend()} text={'Add as friend'}></Button>
			}
        </Container>
	);
}

export default Chat;
