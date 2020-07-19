import {SEARCH_LOADING, SEARCH_SUCCESS, SEARCH_ERROR, UPDATE_SEARCHKEY} 
from './action-types/products-actions';
import * as productApis from '../api/product.api';

//search product by keyword, category, price
export const fetch_search_product = (queryParams) => {
    return dispatch => {
        dispatch(search_product_loading(queryParams));
        productApis.searchProduct(queryParams)
        .then(res => dispatch(search_product_success(res.data)))
        .catch(err => dispatch(search_product_error(err)));
    }
}
export const search_product_loading = (queryParams) => {
    return {
        type: SEARCH_LOADING,
        payload: queryParams,
    }
}
export const search_product_success = (listProduct) => {
    return {
        type: SEARCH_SUCCESS,
        payload: listProduct,
    }
}
export const search_product_error = (err) => {
    return {
        type: SEARCH_ERROR,
        payload: err,
    }
}
//update search key
export const update_search_key = (searchKey) => {
    return {
        type: UPDATE_SEARCHKEY,
        payload: searchKey,
    }
}