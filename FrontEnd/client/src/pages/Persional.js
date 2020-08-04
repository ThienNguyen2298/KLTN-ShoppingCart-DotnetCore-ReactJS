import React, { Component } from 'react';
import BreadScrumb from '../components/BreadScrumb/BreadScrumb';
import { Row, Col, Avatar, Button, Tooltip, Tabs, Form, Input, message } from 'antd';
import { UserOutlined, SettingOutlined, GoogleOutlined, PhoneOutlined, SolutionOutlined } from '@ant-design/icons';
import UserInfo from '../components/UserPage/InfoUser/InfoUser';
import axiosInstance from '../utils/axiosInstance';
import {connect} from 'react-redux';
import {update_user} from '../action/authAction';
import OrderHistory from '../components/UserPage/InfoUser/OrderHistory';

const { TabPane } = Tabs;

const style = { background: 'rgb(247, 247, 247)', padding: '8px 0' };
class Persional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            disabledUpdate: true,
            user: {},
            isMounted: false,
        }
    }
    async componentDidMount(){
        const data = await axiosInstance(`User/get-user-by-id/${this.props.match.params.userId}`).then(res => res.data);
        this.setState({
            user: {...data},
            isMounted: true,
        })
    }
    callbackChangTab(key){
        this.setState({
            activeTab: key,
        })
    }
    async handleSubmitUserForm(values){
        
            const userAvatarNotChange = new FormData();
            if(values.avatar.length === 0 || values.avatar[0].url)
            {
                userAvatarNotChange.set("avatar", this.state.user.avatar === null?'':this.state.user.avatar);
            }
            else{
                userAvatarNotChange.append("file", values.avatar[0].originFileObj);
            }
            userAvatarNotChange.set("id", this.props.match.params.userId);
            
            userAvatarNotChange.set("birthDay", values.birthDay);
            userAvatarNotChange.set("address", values.address);
            userAvatarNotChange.set("phone", values.phone);
            userAvatarNotChange.set("gender", values.gender);
            userAvatarNotChange.set("displayname", values.displayname);
            
            await axiosInstance('User', 'PUT', userAvatarNotChange)
            .then(res => {
                message.success(`${res.data.message}`, 2)
                this.props.update_user({displayname: res.data.user.displayname, avatar: res.data.user.avatar})
                this.setState({
                    user: res.data.user,
                    disabledUpdate: !this.state.disabledUpdate,
                })
            }
            )
            .catch(err => console.log(err+'')
            )
    }
    handleUpdateUser(){
        this.setState({
            disabledUpdate: !this.state.disabledUpdate,
        })
    }
    render() {
        const {isMounted} = this.state;
        
        if(isMounted)
        {
            return (
                <div style={{ width: '75%', margin: '10px auto' }}>
                    <BreadScrumb title="Thông tin cá nhân"></BreadScrumb>
                    <br></br>
                    <Row gutter={{ xs: 32, sm: 16, md: 24, lg: 32 }} justify="space-around">
                        <Col className="gutter-row" lg={10} md={24} xs={24}>
                            <div style={{ ...style }}>
                                <div style={{ textAlign: 'end', margin: '0 8px' }}>
                                    <Tooltip placement="top" title={"Chỉnh sửa thông tin"}>
                                        <Button type="link" onClick={this.handleUpdateUser.bind(this)} icon={<SettingOutlined />} danger></Button>
                                    </Tooltip>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Avatar size={120} icon={<UserOutlined />} src={this.state.user.avatar} />
                                    <br></br>
                                    <h4>{this.state.user.displayname}</h4>
                                </div>
                                <br></br>
                                <div>
                                    <Row>
                                        <Col span={18} offset={3}>
                                            <span style={{fontWeight: 'bold'}}><GoogleOutlined style={{color: 'red'}}/> - {this.state.user.email}</span>
                                            <br></br>
                                            <span style={{fontWeight: 'bold'}}><PhoneOutlined style={{color: 'red'}}/> - {this.state.user.phone || '000 000 00 00'}</span>
                                        </Col>
                                    </Row>
    
                                </div>
                                <br></br>
                            </div>
                        </Col>
                        <Col className="gutter-row" lg={14} md={24} xs={24}>
                            <div style={{ ...style }}>
                                <Tabs defaultActiveKey={this.state.activeTab}  style={{outline: 'none'}}
                                onChange={this.callbackChangTab.bind(this)}>
                                    <TabPane
                                        tab={
                                            <span>
                                                <UserOutlined />
                                                THÔNG TIN CÁ NHÂN
                                            </span>
                                        }
                                        key="1"
                                    >
                                        <UserInfo user={this.state.user} disabledUpdate={this.state.disabledUpdate}
                                         onSubmitUserForm={this.handleSubmitUserForm.bind(this)}></UserInfo>
                                    
                                        
                                     </TabPane>
                                     
                                    <TabPane
                                        tab={
                                            <span>
                                                <SolutionOutlined />
                                                LỊCH SỬ MUA HÀNG
                                            </span>
                                        }
                                        key="2"
                                    >
                                        <OrderHistory userId={this.state.user.id}></OrderHistory>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }
        return null
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update_user: (data) => {dispatch(update_user(data))}
    }
}
export default connect(null,mapDispatchToProps)(Persional);