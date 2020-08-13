import React, { Component } from 'react'

import {Link} from 'react-router-dom';
import {Badge, notification} from 'antd';
import '../NotifyItem/NotifyItem.css';
import * as signalR from '@microsoft/signalr';
import MenuDropdown from './MenuDropdown';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';
import {updateReceiverId} from '../../../actions/chatAction';
import {NotificationOutlined} from '@ant-design/icons'

class ItemNotify extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            count: 0,
            hub: null,
            notifyList: [],
        }
    }
    componentDidMount(){
        const token = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")): "";
        //const notifyList = localStorage.getItem("notify") ? JSON.parse(localStorage.getItem("notify")): [];
        const hub = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chatHub", {accessTokenFactory: () => `${token.value}`})
        .configureLogging(signalR.LogLevel.Information)
        .build();
        this.setState({
            hub
        }, () => {
        hub.start().then(() => {
            hub.on("ReceiveNotify", notify => {
                console.log("notify", notify);
                if(notify.receiverId === this.props.userId){
                    notification.open({
                        message: `${notify.notify}`,
                        duration: 1,
                        icon: <NotificationOutlined style={{ color: '#5cb85c' }} />,
                        placement: 'topLeft'
                    })
                    this.setNotifyList(notify)
                }
            })
                
        }).catch(() => console.log("fail"));
        })
    }
    setNotifyList(notify){
        const newList = [notify, ...this.state.notifyList];
        //localStorage.setItem('notify', JSON.stringify(newList));
        this.setState({
            notifyList: newList,
            count: newList.length,
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
    handleNotifyCount(value){
        console.log("value: ", value);
        this.setState({
            count: 0,
        })
        if(value.status === 0){
            this.props.update_receiverId(value.senderId)
        }
        else{
            this.props.history.push('/admin/order-manage/order-not-confirm')
        }
    }
    componentWillUnmount(){
        this.setState({
            hub: null
        })
    }
    render() {
        const {open} = this.state;
        return (
            <li className="nav-item">
                <Link to="#" className="icon-button" onClick={this.setOpen.bind(this)}>
                    <Badge count={this.state.count } offset={[8, -8]}>
                        {this.props.icon}
                        {open && (<MenuDropdown visible={open}
                        notifyList={this.state.notifyList}
                         changeNotifyCount={this.handleNotifyCount.bind(this)} 
                        onCancel={this.handleCancel.bind(this)}>
                            </MenuDropdown>)}
                    </Badge>
                </Link>
            </li>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update_receiverId: (data) => {dispatch(updateReceiverId(data))},
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemNotify))

