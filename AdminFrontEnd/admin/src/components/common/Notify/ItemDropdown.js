import React, { Component } from 'react';
import {Avatar, Row, Col, Badge} from 'antd';
import {ShoppingCartOutlined, MessageOutlined} from '@ant-design/icons';
import '../DropdownItem/DropdownItem.css';

export default class ItemDropdown extends Component {
    handleClickNotifyItem(value){
        this.props.onClickItem(value);
    }
    render() {
    const {notify} = this.props;
    return (
        <Row className="dropdown-item" onClick={(value) => this.handleClickNotifyItem(notify)}>
            <Col span={6}>
                    <Avatar 
                    icon={notify.status === 1 ? <ShoppingCartOutlined /> : <MessageOutlined />}></Avatar>
            </Col>
            <Col span={18}>
                <span>{notify.notify}</span>
            </Col>
           
        </Row>
        
        );
    }
}
