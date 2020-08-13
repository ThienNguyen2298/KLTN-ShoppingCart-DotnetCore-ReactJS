import React from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

export default function BreadScrumb({title, props}) {
    
    return (
        <div style={{background: '#f7f7f7', padding: '.5rem'}}>
            <Breadcrumb >
                <Breadcrumb.Item style={{color: '#1890ff'}}>
                <HomeOutlined />
                <Link to="/admin"><b>Trang chủ</b></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{color: '#af9a7d'}}>
                <UserOutlined />
                    <span><b>{title}</b></span>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}