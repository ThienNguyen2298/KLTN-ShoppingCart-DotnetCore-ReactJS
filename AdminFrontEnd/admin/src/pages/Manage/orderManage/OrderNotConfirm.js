import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';

export default class OrderNotConfirm extends Component {
    render() {
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="3"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Đơn hàng chưa duyệt"></BreadScrumb>
                        Quản lý đơn hàng chưa xác nhận
                    </div>
                </div>
            </>
        )
    }
}