import cartsReducer from './cartsReducer';
import productsReducer from './productsReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    carts: cartsReducer,
    products: productsReducer,
    auth: authReducer,
})
export default rootReducer;
