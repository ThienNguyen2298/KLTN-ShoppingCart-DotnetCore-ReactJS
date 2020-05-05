import axiosInstance from '../utils/axiosInstance';

const pathLogin = "User/authenticate";

export const login = data => {
    return axiosInstance(pathLogin, "POST", data)
 };