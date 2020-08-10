import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Badge} from 'antd';
import './NotifyItem.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import * as signalR from '@microsoft/signalr';

export default class NotifyItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            count: 0,
            
        }
    }
    componentDidMount(){
        const token = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")): "";
        const hub = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chatHub", {accessTokenFactory: () => `${token.value}`})
        .configureLogging(signalR.LogLevel.Information)
        .build();
        this.setState({

        }, () => {
        hub.start().then(() => {
            hub.on("UserOnlineList", userOnlineList => {
                console.log("user online1: ", userOnlineList);
                this.setState({
                    count: userOnlineList.length === 1 ? 0 : userOnlineList.length
                })
            })
                
        }).catch(() => console.log("fail"));
        })
    }
    setOpen(){
        this.setState({
            open: !this.state.open,
        })
    }
    handleCancel(){
        this.setState({
            open: false,
        })
    }
    handleChangUserCount(value){
        this.setState({
            count: value,
        })
    }
    render() {
        const {open} = this.state;
        return (
            <li className="nav-item">
                <Link to="#" className="icon-button" onClick={this.setOpen.bind(this)}>
                    <Badge count={this.state.count } offset={[8, -8]}>
                        {this.props.icon}
                        {open && (<DropdownMenu type = {this.props.type} visible={open} changeUserCount={this.handleChangUserCount.bind(this)} 
                        onCancel={this.handleCancel.bind(this)}>
                            </DropdownMenu>)}
                    </Badge>
                </Link>
            </li>
        )
    }
}
