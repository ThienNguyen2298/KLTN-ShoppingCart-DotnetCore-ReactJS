import cartsReducer from './cartsReducer';
import productsReducer from './productsReducer';
import authReducer from './authReducer';
import evaluationsReducer from './evaluationsReducer';
import chatReducer from './chatReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    evaluations: evaluationsReducer,
    carts: cartsReducer,
    products: productsReducer,
    auth: authReducer,
    chat: chatReducer,
})
export default rootReducer;
