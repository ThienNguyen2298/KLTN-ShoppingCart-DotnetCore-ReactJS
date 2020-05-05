import {combineReducers} from 'redux';
//members reducer
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});
export default rootReducer;