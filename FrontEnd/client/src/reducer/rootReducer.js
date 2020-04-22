import cartsReducer from './cartsReducer';
import productsReducer from './productsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    carts: cartsReducer,
    products: productsReducer
})
export default rootReducer;
