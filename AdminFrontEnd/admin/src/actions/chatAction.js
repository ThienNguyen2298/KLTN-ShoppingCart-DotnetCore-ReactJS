import {UPDATE_RECEIVERID, UPDATE_OPEN_MAXIMIZE} from './action-types/chat-action';
//import * as authApis from '../apis/authApi';

// thêm giỏ hàng
export const updateReceiverId = (userId)=>{
    return {
        type: UPDATE_RECEIVERID,
        payload: userId,
    }
}
export const update_open_maximize = (openMaximize) => {
    return {
        type: UPDATE_OPEN_MAXIMIZE,
        payload: openMaximize,
    }
}