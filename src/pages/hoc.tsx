import React from'react';
import { usersData } from '../constants';
import { SET_USER_LIST, SET_LOGGED_USER } from '../redux/actions/userLIstActions';


function HOC() {
}
async function getUserList(ctx) {
    const state = ctx.store.getState();
    const userList = state.users.users;
    if (userList && userList.length > 0) {
        return {users: userList};
    } else {
        try {
            const res: Response = await fetch(usersData);
            const data = await res.json();
            if (!data) {
                return {users: []};
            }
            ctx.store.dispatch({type: SET_USER_LIST, payload: data});
            return {users: data};
        } catch (error) {
            return {users: []};
        };
    }
}
HOC.getUserList = getUserList;

export default (HOC);