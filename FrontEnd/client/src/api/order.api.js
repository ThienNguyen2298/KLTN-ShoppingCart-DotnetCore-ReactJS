import axiosInstance from '../utils/axiosInstance';

const pathCreateOrder = "Order";


export const createOrder = order => {
    return axiosInstance(pathCreateOrder, 'POST', order)
}