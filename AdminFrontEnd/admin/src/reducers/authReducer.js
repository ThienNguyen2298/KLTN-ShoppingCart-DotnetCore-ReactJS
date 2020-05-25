import * as types from '../actions/action-types/auth-action';
import jwtDecode from 'jwt-decode';
import {message} from 'antd';

function getUserIfTokenExisted(){
    const token =localStorage.getItem("access_token")? JSON.parse(localStorage.getItem("access_token")): null;
    if(token === null){
      return {
        userId:'',
        role:'',
        nameUser:'',
        avatar: '',
        isAuthenticated: false,
        isLoading: false
      }
    }
    else
    {
        let token_decode = jwtDecode(token.value);
        let now = Date.now()
        //console.log("time now: ", now);
        //console.log("tiem token: ",token.expire);
        
        if( now < token.expire){
            
            
            return {
                userId:token_decode.userId,
                role:token_decode.role,
                nameUser:token_decode.fullname,
                avatar: token_decode.avatar,
                isAuthenticated: true,
                isLoading: false
              }
        }
        else{
            
            return {
                userId:'',
                role:'',
                nameUser:'',
                avatar: '',
                isAuthenticated: false,
                isLoading: false
              }
        }
    }
}
const initialState = {
    userId: getUserIfTokenExisted().userId,
    role: getUserIfTokenExisted().role,
    nameUser: getUserIfTokenExisted().nameUser,
    avatar: getUserIfTokenExisted().avatar,
    isAuthenticated: getUserIfTokenExisted().isAuthenticated,
    isLoading: getUserIfTokenExisted().isLoading
}
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LOGIN_LOADING:{
            return {
                ...state,
                isLoading: true
            }
        }
        case types.LOGIN_SUCCESS: {
            let token = action.payload;
            let userInfo = jwtDecode(token);
            if(userInfo.role === "Admin")
            {
                //console.log(userInfo);
                //let now = new Date().getTime();
                const item = {
                    value: token,
                    expire:  userInfo.exp*1000
                }
                localStorage.setItem("access_token", JSON.stringify(item));
                return {
                    userId: userInfo.userId,
                    nameUser: userInfo.fullname,
                    role: userInfo.role,
                    avatar: userInfo.avatar,
                    isLoading: false,
                    isAuthenticated: true
                }
            }
            else{
                message.warning("Bạn không có quyền hạn Admin", 5)
                console.log("Bạn không có quyền hạn Admin");
                //let now = new Date().getTime();
                
                return {
                    ...state,
                    isLoading: false,
                    isAuthenticated: false
                }
            }
            
            
        }
        case types.LOGIN_ERROR:{
            console.log(action.payload);
            message.warning(`${action.payload}`, 5)
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false
            }
        }
        case types.LOGOUT:{
            return {
                userId:'',
                role:'',
                nameUser:'',
                avatar: '',
                isAuthenticated: false,
                isLoading: false
            }
        }
        default:
            return {...state}
    }
}
export default authReducer;