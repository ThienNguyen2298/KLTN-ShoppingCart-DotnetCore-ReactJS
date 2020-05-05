import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';

export default class ProviderManage extends Component {
    render() {
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="5"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Quản lý nguồn cung"></BreadScrumb>
                        Quản lý nhà cung cấp
                    </div>
                </div>
            </>
        )
    }
}