//Action Types
export const SET_USER_LIST = 'SET_USER_LIST';
export const ADD_USER_LIST = 'ADD_USER_LIST';
export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const SET_USER = 'SET_USER';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const ADD_FRIEND = 'ADD_FRIEND';

export const setUser = () => ({
    type: SET_USER
});

export const addUserList = () => ({
    type: ADD_USER_LIST
});

export const setUserList = () => ({
    type: SET_USER_LIST
});

export const setLoggedUser = () => ({
    type: SET_LOGGED_USER
});

export const sendMessage = () => ({
    type: SEND_MESSAGE
});

export const addFriend = () => ({
    type: ADD_FRIEND
});