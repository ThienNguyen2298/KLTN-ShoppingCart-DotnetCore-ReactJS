import axiosInstance from '../utils/axiosInstance';

const pathLogin = "User/authenticate";
const pathRegister = "User/register";
const pathLoginWithFB = "User/LoginWithFacebook";

export const login = data => {
    return axiosInstance(pathLogin, "POST", data)
};
export const register = data => {
    return axiosInstance(pathRegister, "POST", data)
};
export const loginWithFb = data => {
    return axiosInstance(pathLoginWithFB, "POST", data)
}