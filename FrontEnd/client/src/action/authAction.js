import {REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, 
    LOGOUT, CHANGE_VISIBLE_BUTTON, UPDATE_USER, LOGIN_FB_LOADING, LOGIN_FB_SUCCESS, LOGIN_FB_ERROR} from './action-types/auth-action';
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
//login with fb
export const login_with_fb = (data) => {
    return dispatch => {
        dispatch(login_fb_loading());
        authApis.loginWithFb(data)
        .then(res => {
            const {token} = res.data;
            dispatch(login_fb_success(token))
        })
        .catch(err => {
            dispatch(login_fb_error(err));
        })
    }
}
export const login_fb_loading = () => {
    return {
        type: LOGIN_FB_LOADING
    }
}
export const login_fb_success = (token) => {
    return {
        type: LOGIN_FB_SUCCESS,
        payload: token,
    }
}
export const login_fb_error = (err) => {
    return {
        type: LOGIN_FB_ERROR,
        payload: err,
    }
}
