import React from 'react';
import {Breadcrumb} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

export default function BreadScrumb({}) {
    return (
        <div style={{background: '#f7f7f7', padding: '.5rem'}}>
            <Breadcrumb >
                <Breadcrumb.Item href="/" style={{color: '#1890ff'}}>
                <HomeOutlined />
                <span><b>Trang chủ</b></span>
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{color: '#af9a7d'}}>
                <UserOutlined />
                <span><b>Chi tiết sản phẩm</b></span>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}
