import {LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS,LOGOUT} from './action-types/auth-action';
import * as authApis from '../apis/authApi';

// thêm giỏ hàng
export const fetch_auth = (data)=>{
    return dispatch => {
        dispatch(login_loading());
        authApis.login(data).then(res => {
            const {token} = res.data;
            dispatch(login_success(token))
        })
        .catch(err => {
            
            dispatch(login_error(err));
        })

        
    }
}
//xóa cart item
export const login_loading = ()=>{
    return{
        type: LOGIN_LOADING,
        
    }
}
//giảm quantity cart item
export const login_success = (token)=>{
    return{
        type: LOGIN_SUCCESS,
        payload: token
    }
}
//tăng quantity cart item
export const login_error = (err)=>{
    //console.log("err action: ", err.response.data);
    
    return{
        type: LOGIN_ERROR,
        payload: err.response.data
    }
}
export const logout = ()=>{
    return{
        type: LOGOUT,
        
    }
}