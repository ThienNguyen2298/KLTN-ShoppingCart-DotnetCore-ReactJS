import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb'

export default class OrderDelivering extends Component {
    render() {
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="2"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Đơn hàng đang vận chuyển"></BreadScrumb>
                        Quản lý đơn hàng đang vận chuyển
                    </div>
                </div>
            </>
        )
    }
}