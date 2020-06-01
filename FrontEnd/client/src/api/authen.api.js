import axiosInstance from '../utils/axiosInstance';

const pathLogin = "User/authenticate";
const pathRegister = "User/register"

export const login = data => {
    return axiosInstance(pathLogin, "POST", data)
};
export const register = data => {
    return axiosInstance(pathRegister, "POST", data)
};