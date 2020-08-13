import React, { Component } from 'react';
import {TitleBar, AgentBar, Row, Column, Title, Subtitle, Avatar, 
    IconButton, RateGoodIcon, RateBadIcon, CloseIcon, MessageList,
    MessageGroup, Message, Bubble,  MessageText,MessageButtons,
    TextComposer, Fill, TextInput, SendButton, Fit} from '@livechat/ui-kit';
import * as signalR from '@microsoft/signalr';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { message, Badge } from 'antd';
import {connect} from 'react-redux';
import {update_open_maximize} from '../../actions/chatAction';

class Maximized extends Component {
    constructor(props){
        super(props);
        this.state = {
            hub: null,
            list: [],
            connectionId: null,
            receiverId: this.props.receiverId ? this.props.receiverId : null,
        }
    }
    componentDidMount(){
        this.connectServerHub();
        if(this.props.receiverId != null){
            axiosInstance('Chat/GetMessages', 'POST', {senderId: this.props.userId,
                receiverId: this.props.receiverId,
            }).then(res => {
                if(res.data.length > 0){
                    this.setState({
                        receiverId: this.props.receiverId,
                        list: res.data,
                    })
                }
            })
        }
    }
    connectServerHub(){
        const token = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")): "";
        const hub = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chatHub", {accessTokenFactory: () => `${token.value}`})
        .configureLogging(signalR.LogLevel.Information)
        .build();
        this.setState({
            hub
        }, () => {
            hub.start().then(() => {
                console.log("Success");
                hub.invoke("GetConnectionId")
                .then((connectionId) => {
                    this.setState({connectionId})
                })
                //hub.invoke("UserOnlineList");
                //
                hub.on("ReceiveMessage", message => {
                    //console.log("Mount: ", message);
                    this.setNewValue(message);
                })
                hub.on("UpdateUserList", _connections => {
                    console.log("connection: ", _connections);
                })
                hub.on("UserOnlineList", userOnlineList => {
                    console.log("user online: ", userOnlineList);
                    
                })
                
            }).catch(() => console.log("fail"));
        })
    }
    callApi(senderId, receiverId){
        axiosInstance('Chat/GetMessages', 'POST', {senderId: senderId,
            receiverId: receiverId,
        }).then(res => {
            if(res.data.length > 0){
                this.setState({
                    receiverId: receiverId,
                    list: res.data,
                })
            }
            else {
                this.setState({
                    receiverId: receiverId,
                    list: [],
                })
            }
        })
    }
    componentDidUpdate(prevProps){
        if(this.props.userId === null || this.props.userId === ''){ 
            this.props.minimize();
        }
        if(this.props.receiverId !== prevProps.receiverId && this.props.receiverId !== null){
            this.callApi(this.props.userId, this.props.receiverId);
            
        }
    }
    componentWillUnmount(){
        this.setState({
            hub: null,
        })
        
    }
    setNewValue(message){
        const newList = [...this.state.list, message];
                    this.setState({
                        list: newList,
                    })
    }
    onMessageSend(value){
        
        if(!!this.props.userId){
            //let receiverId = null;
            if((this.props.role === 'Admin' && this.state.receiverId === null) 
            || this.props.userId === this.state.receiverId){
                message.warning("Vui lòng chọn đối tượng để chat!", 4);
                return ;
            }
            
            console.log(" có xún đây");
            const {hub, connectionId} = this.state;
            hub.invoke("SendMessage", {content: value, 
                senderId: this.props.userId,
                connectionId: connectionId,
                receiverId: this.state.receiverId,
            })
            .then((message) => console.log("res: ", message));
            
        }
        else{
            console.log("click");
            message.warning("Vui lòng Đăng nhập để Chat với Admin!", 4);
        }
        
    }
    clickReplyUser(user){
        //console.log(user.id);
        this.callApi(this.props.userId, user.id);
        //this.setState({
        //    receiverId: user.id,
        //});
    }
    handleMinimize(){
        this.props.update_open_maximize(false);
        this.props.minimize();
    }
    render() {
        //
        const {list} = this.state;
        const {userId} = this.props;
        console.log(list, userId);
        //
        const renderMessageList = ( list.length <= 0 ? null :
            ( list.map((ele) => {
                //if(ele.senderId === userId || ele.receiverId === userId)
                //{
                return (
                    <MessageGroup
                        avatar={ele.receiverId === userId ? ele.sender.avatar || 
                            "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg": null} key={ele.id}
                    onlyFirstWithMeta>
                        <Message style={{padding: 0}} date={moment(ele.createDate).format('hh:mm DD/MM/YYYY')} 
                        authorName={userId !== ele.senderId ? ele.sender.displayname +" - ": "Me - "}
                            
                            isOwn={
                                ele.senderId === userId ? true : false
                            }
                            
                        >
                            <Bubble isOwn={ele.senderId === userId ? true : false}>
                                
                                <MessageText style={{padding: '0.5em', minWidth: 100}}>{ele.content}</MessageText>	
                            </Bubble>
                        </Message>
                        <MessageButtons
                        onClick={() => this.clickReplyUser(ele.sender)}
                         style={(ele.senderId === userId && ele.receiver.displayname === 'Admin' )
                        || userId === ele.senderId
                        ? {display: 'none'} : {display: 'inline-block', textAlign: 'center', fontWeight: 'bold',
                            border: '1px solid #91d5ff', fontSize: 10, borderRadius: '5', width: '50', color: '#91d5ff',
                            cursor: 'pointer', 
                        }}>
                            Reply
                        </MessageButtons>
                    </MessageGroup>
                )
                //}
                //return null;
            })
            )
        )
        return (
            <div style={{
				display: 'flex',
				flexDirection: 'column',
                height: '100%',
                //background: 'gray'
			}}>
                <TitleBar
                    style={{paddingLeft: '20px'}}
                    key={1}
                    leftIcons={
                        [
                            
                            <Badge key="active" color="green" status="processing" />
                        ]
                    }
                    rightIcons={[
                        
                        <IconButton key="close" onClick={this.handleMinimize.bind(this)}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                    title="WELCOME TO ONLINE SHOP"
                >
                
                </TitleBar>
                <div
				style={{
					flexGrow: 1,
					minHeight: 0,
					height: '100%',
				}}
			    >
                    <MessageList active containScrollInSubtree>
                        
                                { !!userId && renderMessageList === null ?
								<Message date={moment(new Date().now).format('hh:mm DD/MM/YYYY')} authorName="BOT"
                                    authorOpened = {true}
									isOwn={false}
									key={1}
								>
									<Bubble isOwn={false}>
										
										<MessageText style={{padding: '0.5em'}}>{"Can I help you ?"}</MessageText>
                                        
									</Bubble>
								</Message>:null}
                                {
                                    renderMessageList
                                }
						
					
				    </MessageList>
                   
                </div>
                <TextComposer onSend={this.onMessageSend.bind(this)}>
                        <Row align="center">
                            <Fill>
                                <TextInput />
                            </Fill>
                            <Fit>
                                <SendButton fit />
                            </Fit>
                        </Row>
                    </TextComposer>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '.6em',
                            padding: '.4em',
                            background: '#fff',
                            color: '#888',
                        }}
                    >
                        {'Powered by Online Shop'}
                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        role: state.auth.role,
        receiverId: state.chat.receiverId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update_open_maximize: (data) => {dispatch(update_open_maximize(data))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Maximized)