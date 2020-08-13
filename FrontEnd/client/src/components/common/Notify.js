import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaBell } from 'react-icons/fa';
import {Badge, notification} from 'antd';
import {NotificationOutlined} from '@ant-design/icons';
import NotifyModal from './NotifyModal';
import * as signalR from '@microsoft/signalr';
import {connect} from 'react-redux';

class Notify extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            notifyList: [],
            hub: null,
            count: 0,
        }
    }
    componentDidMount(){
        if(this.props.userId !== null){
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
                    
                    if(notify.status === 0 && notify.receiverId === this.props.userId){
                        console.log("notify", notify);
                        console.log("userID", this.props.userId);
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
        
    }
    
    setNotifyList(notify){
        console.log("notify", notify);
        const newList = [notify, ...this.state.notifyList];
    
        this.setState({
            notifyList: newList,
            count: newList.length,
        })
    }
    handleOpenModal(){
        this.setState({
            visible: true,
        })
    }
    handleCancel(){
        this.setState({
            visible: false,
        })
    }
    componentWillUnmount(){
        this.setState({
            hub: null
        })
    }
    handleChangCount(value){
        this.setState({
            count: value,
        })
    }
    render() {
        const {visible, notifyList} = this.state;
        return (
            <>
            <Link to="#" onClick={this.handleOpenModal.bind(this)}><Badge count={this.state.count } offset={[3, -7]}>
                <FaBell style={{fontSize: 18}}></FaBell></Badge> Thông báo
            </Link>
            {
                visible ? <NotifyModal visible={visible} notifyList={notifyList} onCount={this.handleChangCount.bind(this)}
                 onCancel={this.handleCancel.bind(this)}>
                 </NotifyModal>: null
            }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    }
}

export default withRouter(connect(mapStateToProps, null)(Notify))