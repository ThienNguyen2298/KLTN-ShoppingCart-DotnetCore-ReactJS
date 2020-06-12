import React, { Component } from 'react';
import {Empty} from 'antd';

export default class OrderHistory extends Component {
    render() {
        console.log(this.props.orders)
        if(this.props.orders.length === 0){
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
            return null
        }
        
    }
}
