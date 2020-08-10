import React, { Component } from 'react';
import NotifyItem from '../NotifyItem/NotifyItem';
import { MessageOutlined, BellOutlined } from "@ant-design/icons";
import './NotifyMenu.css';
import ItemNotify from '../Notify/ItemNotify';



export default class NotifyMenu extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul className="navbar-nav">
                    <ItemNotify icon={<BellOutlined/>}></ItemNotify>
                    <NotifyItem icon={<MessageOutlined />}>  
                    </NotifyItem>
                    
                </ul>
            </nav>
        )
    }
}
