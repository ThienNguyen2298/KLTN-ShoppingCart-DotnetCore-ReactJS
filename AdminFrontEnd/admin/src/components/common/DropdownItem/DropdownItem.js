import React from "react";
import {Avatar, Row, Col, Badge} from 'antd';
import {UserOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import './DropdownItem.css';


export default class DropdownItem extends React.Component {
    handleClickUserItem(value){
        this.props.onClickItem(value);
    }
    render() {
    const {user} = this.props;
    return (
        <Row className="dropdown-item" onClick={(value) => this.handleClickUserItem(user.id)}>
            <Col span={6}>
                    <Avatar src={user.avatar} 
                    icon={<UserOutlined />}></Avatar>
            </Col>
            <Col span={16}>
                <span>{user.displayname}</span>
            </Col>
            <Col span={2}>
                <Badge status="processing" color="#52c41a" />
            </Col>
        </Row>
        
    );
  }
}