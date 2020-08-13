import React, { Component } from 'react';
import {Empty, message} from 'antd';
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
    callApi = async () => {
        let list = await axiosInstance(`Order/GetOrderListByUserId/${this.props.userId}`, 'GET')
        .then(res => res.data);
        let format = list.map(ele => {
            return {...ele, key: ele.id}
        })
        this.setState({
            orderList: format,
        })
    }
    async componentDidMount(){
        await this.callApi();
    }
    //
    handleCancelOrder(orderId){
        axiosInstance(`ManageOrder/UserCancelOrder/${orderId}`, 'DELETE')
        .then(res => {
            if(res.data){
                const newList = this.state.orderList.filter(e => e.id !== orderId);
                message.success('Hủy đơn hàng thành công!', 4)
                this.setState({
                    orderList: newList,
                })
            }
            else{
                message.warning('Hủy đơn hàng thất bại!', 4)
            }
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
            return <Order list={orderList} onCancel={this.handleCancelOrder.bind(this)}></Order>
        }
        
    }
}
