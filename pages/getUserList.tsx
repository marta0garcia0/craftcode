import { usersData } from '../constants';
import { SET_USER_LIST } from '../redux/actions/userLIstActions';

export async function getUserList(ctx) {
    const state = ctx.store.getState();
    const userList = state.users.users;
    // only fetch one time, rest get from store
    if (userList && userList.length > 0) {
        return {
            notFound: false,
            users: userList
        }
    } else {
        try {
            const res: Response = await fetch(usersData);
            const data = await res.json();
            if (!data) {
                return {
                    notFound: true,
                };
            }
            ctx.store.dispatch({type: SET_USER_LIST, payload: data});
            return {
                notFound: false,
                users: data
            }
        } catch (error) {
            return {
                notFound: true,
                users: []
            }
        };
    }
}
