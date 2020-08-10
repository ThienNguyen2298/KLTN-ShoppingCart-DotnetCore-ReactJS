import React, { Component } from 'react';
import {Row, Col, Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';


export default class NotifyItem extends Component {
    
    handleClickItem(){
        this.props.onClickItem(true);
    }
    render() {
        const {notify} = this.props;
        return (
            <Row className="dropdown-item" onClick={this.handleClickItem.bind(this)}>
            <Col span={6}>
                    <Avatar
                    icon={<UserOutlined />}></Avatar>
            </Col>
            <Col span={18}>
                <span>{notify.notify}</span>
            </Col>
            
        </Row>
        )
    }
}
