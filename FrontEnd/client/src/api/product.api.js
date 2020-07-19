import axiosInstance from '../utils/axiosInstance';

const pathSearchProducts = "Product/search-products";


export const searchProduct = queryObject => {
    return axiosInstance(`${pathSearchProducts}?${queryObject}`, 'GET');
};
