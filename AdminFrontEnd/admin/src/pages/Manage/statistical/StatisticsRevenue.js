import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';

export default class StatisticsRevenue extends Component {
    render() {
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="8"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Thống kê doanh thu"></BreadScrumb>
                        Thống kê doanh thu
                    </div>
                </div>
            </>
        )
    }
}