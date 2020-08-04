//action
import * as types from '../action/action-types/products-actions';
import queryString from 'query-string';

const initState = {
    searchKey: null,
    categoryId: null,
    rating: 5,
    fromPrice: null,
    toPrice: null,
    provider: null,
    products: [],
    categories: [],
    //
    currentPage: 1,
    pageSize: 3,
    totalColumns: 0,
}
const productsReducer = (state = initState, action) => {
    switch(action.type){
        case types.SEARCH_LOADING: {
            const query =  queryString.parse(action.payload);
            console.log("query loading: ", action.payload);
            
            return {
                ...state,
                searchKey: query.searchKey,
                categoryId: query.categoryId,
                rating: query.rating,
                fromPrice: query.fromPrice,
                toPrice: query.toPrice,
                provider: query.provider,
                currentPage: query.currentPage,
                pageSize: 3,
            }
        }
        case types.SEARCH_SUCCESS: {
            console.log("success reducer: ", action.payload);
            return {
                ...state,
                products: action.payload.products,
                categories: action.payload.categories,
                totalColumns: action.payload.products[0].totalColumns,
            }
        }
        case types.SEARCH_ERROR: {
            return {
                ...state,
                products: [],
                categories: [],
            }
        }
        case types.UPDATE_SEARCHKEY: {
            return {
                ...state,
                searchKey: action.payload,
            }
        }
        default:
            return state;
    }
}
export default productsReducer;

