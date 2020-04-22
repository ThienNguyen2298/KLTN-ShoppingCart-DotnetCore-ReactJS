import {ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY} from './action-types/carts-actions'

// thêm giỏ hàng
export const addToCart = (item)=>{
    return{
        type: ADD_TO_CART,
        payload: item}
    }
//xóa cart item
export const removeItem = (id)=>{
    return{
        type: REMOVE_ITEM,
        payload: id
    }
}
//giảm quantity cart item
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        payload: id
    }
}
//tăng quantity cart item
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        payload: id
    }
}