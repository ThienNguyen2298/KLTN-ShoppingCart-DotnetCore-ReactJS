import {REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, 
    LOGOUT, CHANGE_VISIBLE_BUTTON, UPDATE_USER} from './action-types/auth-action';
import * as authApis from '../api/authen.api';
// Đăng ký 
export const fetch_register = (value) => {
    return dispatch => {
        dispatch(register_loading());
        authApis.register(value).then(res => {
            
            //console.log(res)
            dispatch(register_success(res.data))
        })
        .catch(err => {
            //console.log(err.response.data)
            dispatch(register_error(err));
        })
    }
}
//gửi request
export const register_loading = ()=>{
    return{
        type: REGISTER_LOADING, 
    }
}
//nhận response
export const register_success = (data)=>{
    return{
        type: REGISTER_SUCCESS,
        payload: data
    }
}
//nhận error
export const register_error = (err)=>{
    return{
        type: REGISTER_ERROR,
        payload: err.response ? err.response.data :'Server chưa hoạt động!'
    }
}
// Đăng nhập
export const fetch_login = (data)=>{
    //console.log(data)
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
//gửi request
export const login_loading = ()=>{
    return{
        type: LOGIN_LOADING, 
    }
}
//nhận response
export const login_success = (token)=>{
    return{
        type: LOGIN_SUCCESS,
        payload: token
    }
}
//nhận error
export const login_error = (err)=>{
    //console.log("err action: ", err.response.data);
    
    return{
        type: LOGIN_ERROR,
        payload: err.response ? err.response.data :'Server chưa hoạt động!'
    }
}
export const logout = ()=>{
    return{
        type: LOGOUT,
    }
}
//change visible button
export const change_visible_button = (data) => {
    return {
        type: CHANGE_VISIBLE_BUTTON,
        payload: data,
    }
}
//update user
export const update_user = (data) => {
    return {
        type: UPDATE_USER,
        payload: data,
    }
}
