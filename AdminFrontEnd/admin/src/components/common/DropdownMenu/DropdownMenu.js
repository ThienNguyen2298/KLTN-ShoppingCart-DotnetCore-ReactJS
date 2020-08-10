import React from "react";
import DropdownItem from '../DropdownItem/DropdownItem';
import {Modal, message, Empty} from 'antd';
import './DropdownMenu.css';
import {connect} from 'react-redux';
import * as signalR from '@microsoft/signalr';
import {updateReceiverId} from '../../../actions/chatAction';

class DropdownMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hub: null,
            userOnlineList: [],
            
        }
    }
    connectServerHub(){
        const token = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")): "";
       
        const hub = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chatHub", {accessTokenFactory: () => `${token.value}`})
        .configureLogging(signalR.LogLevel.Information)
        .build();
        this.setState({
            hub,
            
        }, () => {
        hub.start().then(() => {
            hub.on("UserOnlineList", userOnlineList => {
                console.log("user online1: ", userOnlineList);
                this.setUserOnlineList(userOnlineList);
            })
            
                
        }).catch(() => console.log("fail"));
        })
    }
    
    setUserOnlineList(userList){
        
        this.setState({
            userOnlineList: userList,
        })
    }
    componentDidMount(){
        if(!!this.props.userId){
            this.connectServerHub();
        }
        else {
            message.warning("Vui lòng Đăng nhập để Chat với User!", 4);
        }
    }
    componentWillUnmount(){
        const {hub} = this.state;
        //console.log("hub unmount: ", hub);
        /*hub.disconnected(function () {
            if (hub.lastError) 
                { alert("Disconnected. Reason: " + hub.lastError.message); }
        });*/
        this.setState({
            hub: null,
            userOnlineList: []
        })
    }
    
    handleCancel(){
        this.props.onCancel();
    }
    handleClickItem(userId){
        this.props.update_receiverId(userId);
        //console.log("hub click: ", this.state.hub);
    }
    render() {
        const {userOnlineList, notifyList} = this.state;
        
        const users = (
            
            userOnlineList.length <= 0 ? [] : (
                userOnlineList.map((ele) => {
                    return <DropdownItem key={ele.id} user={ele} type={this.props.type}
                     onClickItem={this.handleClickItem.bind(this)}>

                    </DropdownItem>
                })
            )
            
        )
        
        if(users.length > 1){
            return (
                <Modal
                    title={"USERS ONLINE"}
                    showHeader={false}
                    mask={false}
                    width={400}
                    visible={this.props.visible}
                    
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                >
                    <div className="dropdown">
                        {
                           users
                        }
                    </div>
                </Modal>
            );
        }
        else {
            return <Modal visible={true} footer={null}>
                <Empty description="Không có Dữ liệu"></Empty>
            </Modal>
        }
        
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
export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu)