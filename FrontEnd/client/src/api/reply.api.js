import axiosInstance from '../utils/axiosInstance';

const pathCreateReply = "Reply"

export const createReply = reply => {
    return axiosInstance(pathCreateReply, 'POST', reply)
}
