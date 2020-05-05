import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb'



export default class OrderedManage extends Component {
    
    render() {
        const {history} = this.props;
        
        
        return (
            <>
            <Header history={history} {...this.props}></Header>   
                <div className="main_container">
                    <Sidebar isActive="1"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Đơn hàng thành công"></BreadScrumb>
                        Quản lý đơn hàng thành công
                    </div>
                </div>
            </>
        )
    }
}
