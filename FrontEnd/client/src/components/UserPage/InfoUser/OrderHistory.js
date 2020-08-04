import React, { Component } from 'react';
import {Empty} from 'antd';
import axiosInstance from '../../../utils/axiosInstance';
import Order from './Order';

export default class OrderHistory extends Component {
    //
    constructor(props){
        super();
        this.state = {
            orderList: [],
        }
    }
    //
    async componentDidMount(){
        let list = await axiosInstance(`Order/GetOrderListByUserId/${this.props.userId}`, 'GET')
        .then(res => res.data);
        let format = list.map(ele => {
            return {...ele, key: ele.id}
        })
        this.setState({
            orderList: format,
        })
    }
    render() {
        const {orderList} = this.state;
        
        if(orderList.length === 0){
            return (
                <div style={{height: 300}}>
                    <Empty 
                    description={
                        <span>
                            Chưa có lịch sử mua hàng!
                        </span>
                      }>

                    </Empty>
                </div>
            )
        }
        else{
            return <Order list={orderList}></Order>
        }
        
    }
}
