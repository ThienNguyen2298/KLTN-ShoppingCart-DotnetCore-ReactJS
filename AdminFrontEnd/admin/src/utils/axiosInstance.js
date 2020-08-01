import axios from 'axios';
import * as rootApi from '../apis/rootApi';
import { Redirect } from 'react-router-dom';

export default function axiosInstance (endpoint, method = 'GET', body){
    const token = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")): "";
    
    return axios({
        method: method,
        url: `${rootApi.API_URL}/${endpoint}`,
        data: body,
        headers: {
            
            Authorization: `Bearer ${token.value}` 
        }
    })
    
}