//action
import * as types from '../action/action-types/auth-action';
import {message} from 'antd';
import jwtDecode from 'jwt-decode';
//xử lý thô
function getUserIfTokenExisted(){
    const token =localStorage.getItem("access_token")? JSON.parse(localStorage.getItem("access_token")): null;
    if(token === null){
      return {
        userId:'',
        role:'',
        nameUser:'',
        avatar: '',
        isAuthenticated: false,
        isVisible: false,
        isLoadingRegister: false,
        isLoadingLogin: false,
      }
    }
    else
    {
        let token_decode = jwtDecode(token.value);
        let now = Date.now()
        
        if( now < token.expire){
            return {
                userId:token_decode.userId,
                role:token_decode.role,
                nameUser:token_decode.fullname,
                avatar: token_decode.avatar,
                isAuthenticated: true,
                isVisible: false,
                isLoadingRegister: false,
                isLoadingLogin: false,
              }
        }
        else{
            
            return {
                userId:'',
                role:'',
                nameUser:'',
                avatar: '',
                isAuthenticated: false,
                isVisible: false,
                isLoadingRegister: false,
                isLoadingLogin: false,
              }
        }
    }
}
//
const initState = {
    userId: getUserIfTokenExisted().userId,
    role: getUserIfTokenExisted().role,
    nameUser: getUserIfTokenExisted().nameUser,
    avatar: getUserIfTokenExisted().avatar,
    isAuthenticated: getUserIfTokenExisted().isAuthenticated,
    isVisible: getUserIfTokenExisted().isVisible,
    isLoadingRegister: getUserIfTokenExisted().isLoadingRegister,
    isLoadingLogin: getUserIfTokenExisted().isLoadingLogin,
}
const authReducer = (state = initState, action) => {
    switch(action.type){
        case types.CHANGE_VISIBLE_BUTTON: {
            return {
                ...state,
                isVisible: action.payload
            }
        }
        case types.LOGOUT: {
            message.loading(`Đã đăng xuất ${state.nameUser}`, 1)
            return {
                userId:'',
                role:'',
                nameUser:'',
                avatar: '',
                isAuthenticated: false,
                isVisible: false,
                isLoadingRegister: false,
                isLoadingLogin: false,
            }
        }
        case types.REGISTER_LOADING: {
            return {
                ...state,
                isLoadingRegister: true
            }
        }
        case types.REGISTER_SUCCESS: {
            message.success(`${action.payload}`, 5)
            
                return {
                    ...state,
                    isLoadingRegister: false,
                }
        }
        case types.REGISTER_ERROR:{
            console.log(action.payload);
            message.warning(`${action.payload}`, 5)
            return {
                ...state,
                isLoadingRegister: false,
            }
        }
        case types.LOGIN_FB_LOADING : {
            return {
                ...state,
                isLoadingLogin: true
            }
        }
        case types.LOGIN_FB_SUCCESS : {
            let token = action.payload;
            console.log("token fb: ", token);
            let userInfo = jwtDecode(token);
            const item = {
                value: token,
                expire:  userInfo.exp*1000,
            }
            localStorage.setItem("access_token", JSON.stringify(item));
            message.success(`Đăng nhập thành công!`, 3)
            
                return {
                    ...state,
                    userId: userInfo.userId,
                    nameUser: userInfo.fullname,
                    role: userInfo.role,
                    avatar: userInfo.avatar,
                    isVisible: false,
                    isAuthenticated: true,
                    isLoadingLogin: false,
                }
        }
        case types.LOGIN_FB_ERROR : {
            console.log(action.payload);
            //message.warning(`${action.payload}`, 3);
            return {
                ...state,
                isLoadingLogin: false,
            }
        }
        case types.LOGIN_LOADING: {
            return {
                ...state,
                isLoadingLogin: true
            }
        }
        case types.LOGIN_SUCCESS: {
            let token = action.payload;
            let userInfo = jwtDecode(token);
            const item = {
                value: token,
                expire:  userInfo.exp*1000,
            }
            localStorage.setItem("access_token", JSON.stringify(item));
            message.success(`Đăng nhập thành công!`, 3)
            
                return {
                    ...state,
                    userId: userInfo.userId,
                    nameUser: userInfo.fullname,
                    role: userInfo.role,
                    avatar: userInfo.avatar,
                    isVisible: false,
                    isAuthenticated: true,
                    isLoadingLogin: false,
                }
        }
        case types.LOGIN_ERROR:{
            console.log(action.payload);
            message.warning(`${action.payload}`, 3)
            return {
                ...state,
                isLoadingLogin: false,
            }
        }
        case types.UPDATE_USER: {
            
            return {
                ...state,
                nameUser: action.payload.displayname,
                avatar: action.payload.avatar,
            }
        }
        default:
            return state;
    }
}
export default authReducer;