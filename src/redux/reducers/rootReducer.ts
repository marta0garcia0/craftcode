import userListReducer from './userListReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    users: userListReducer
});

export default rootReducer;