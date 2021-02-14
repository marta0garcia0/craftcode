import counterReducer from './counterReducer';
import userListReducer from './userListReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    counter: counterReducer,
    users: userListReducer
});

export default rootReducer;