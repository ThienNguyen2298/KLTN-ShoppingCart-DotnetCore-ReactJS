import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import {Row, Col, Table, Popconfirm, Button, Avatar, Tag, message, Spin, Input, Select} from 'antd';
import axiosInstance from '../../../utils/axiosInstance';
import queryString from 'querystring';
import moment from 'moment';
import {RotateLeftOutlined, UserOutlined, DeleteOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';

const OK = "Khôi phục trạng thái Hiển thị cho User này!";
const Cancel = "Xác nhận Xóa User này!";

export default class UserManage extends Component {
    //
    constructor(props){
        super(props);
        this.state = {
            userList: [],
            isLoading: false,
            keyWord: null,
            status: null,
        }
    }
    callApi = async() => {
        let list = await axiosInstance('ManageUser/GetUserDisplayList', 'GET')
        .then(res => res.data);
        let format = list.map(e => {
            return {...e, key: e.id}
        })
        this.setState({
            userList: format,
            isLoading: false,
        })
    }
    componentDidMount() {
        this.setState({
            isLoading: true,
        })
        this.callApi();
    }
    //
    async confirm(record){
        this.setState({
            isLoading: true,
        })
        let check = await axiosInstance('ManageUser/DisplayUser', 'POST', {id: record.id, status: 0})
        .then(res => res.data);
        if(check){
            message.success('Đổi trạng thái Hiển thị cho User này Thành công!', 4)
            await this.callApi();
        }
        else{
            message.warning('Đổi trạng thái Hiển thị thất bại!', 4)
            await this.callApi();
        }
    }
    //
    async confirmCancel(record){
        this.setState({
            isLoading: true,
        })
        let check = await axiosInstance('ManageUser/DeleteUser', 'POST', {id: record.id, status: 1})
        .then(res => res.data);
        if(check){
            message.success('Xóa User này Thành công!', 4)
            await this.callApi();
        }
        else{
            message.warning('Xóa User thất bại!', 4)
            await this.callApi();
        }
    }
    //
    async handleSearch(){
        this.setState({
           
            isLoading: true,
        })
        const {keyWord, status} = this.state;
        let list = await axiosInstance('ManageUser/SearchUser', 'POST', {keyWord, status})
        .then(res => res.data);
        let format = list.map(e => {
            return {...e, key: e.id}
        })
        this.setState({
            userList: format,
            isLoading: false,
        })
    }
    //
    async handleReset(){
        await this.callApi();
    }
    //
    handleChangeInput(e){
        this.setState({
            keyWord: e.target.value,
        })
    }
    //
    handleChangeStatus(e){
        this.setState({
            status: e,
        })
    }
    render() {
        //
        const {userList, isLoading} = this.state;
        //
        const columns = [
            {
                title: 'KHÁCH HÀNG',
                key: 'displayname',
                dataIndex: 'displayname',
                
                render: text => <span>{text}</span>,
            },
            
            {
                title: 'AVATAR',
                key: 'avatar',
                dataIndex: 'avatar',
                
                render: text => <Avatar shape="square" src={text} size={64} icon={<UserOutlined />} />
            },
            {
                title: 'USER TYPE',
                key: 'userType',
                dataIndex: 'userType',
                
                render: text => text === "User" ? <span style={{color: '#52c41a'}}>{text}</span> :
                 <span style={{color: '#1890ff'}}>{text}</span>
            },
            {
                title: 'SĐT',
                key: 'phone',
                dataIndex: 'phone',
                
                render: text => <span >{text}</span>
            },
            {
                title: 'TRẠNG THÁI',
                key: 'status',
                dataIndex: 'status',
                
                render: text => text === 0 ? <Tag color="#87d068">Active</Tag> : <Tag color="error">InActive</Tag>
            },
            {
                title: 'NGÀY SINH',
               
                key: 'birthDay',
                dataIndex: 'birthDay',
                render: text => <span >{moment(text).format('DD/MM/YYYY')}</span>
            },
            
            {
                title: 'TÙY CHỌN',
                key: 'action',
                align: 'center',
                
                render: (text, record, index) => (
                  <span>
                    {
                        text.status === 0 ? 
                        <Popconfirm placement="left" title={Cancel} onConfirm={() => this.confirmCancel(record)} okText="Yes" 
                    cancelText="No">
                        <Button  icon={<DeleteOutlined />} 
                        type="danger">Xóa</Button>
                    </Popconfirm>
                        :
                        <Popconfirm  placement="left" title={OK} 
                    onConfirm={() => this.confirm(record)} okText="Yes" 
                    cancelText="No">
                        <Button icon={<RotateLeftOutlined />} 
                        style={{background: "#389e0d", borderColor: "#389e0d", color: 'white'}}
                        >Hiển thị</Button>
                    </Popconfirm>
                    }
                                      
                  </span>
                ),
              },
        ];
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="7"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Quản lý user"></BreadScrumb>
                        <Spin spinning={isLoading} tip="LOADING" size="large">
                            <br/>
                            <Row>
                                
                                <Col span={6} offset={2}>
                                    <Input
                                    placeholder="Key word"
                                    value={this.state.keyWord}
                                    allowClear={true}
                                    onChange={this.handleChangeInput.bind(this)}
                                    ></Input>
                                </Col>
                                <Col span={7} offset={1}>
                                    <Select placeholder="Status" style={{width: 250}}
                                    onChange={(e) => this.handleChangeStatus(e)}
                                    >
                                        <Select.Option value={0}>Active</Select.Option>
                                        <Select.Option value={1}>InActive</Select.Option>
                                    </Select>
                                </Col>
                                <Col span={8}>
                                    <Button style={{borderColor: '#0050b3', color: '#0050b3', marginRight: '10px'}} 
                                    icon={<SearchOutlined />}
                                    onClick={this.handleSearch.bind(this)}
                                    >
                                        Search
                                    </Button>
                                    <Button onClick={this.handleReset.bind(this)} icon={<SyncOutlined />}>Reset</Button>
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col span={24}>
                                    <Table columns={columns}
                                    dataSource={userList}
                                    pagination={{
                                        position: ["bottomCenter", "bottomCenter"],
                                        defaultPageSize: 4,
                                        defaultCurrent: 1
                                    }}
                                    >

                                    </Table>
                                </Col>
                            </Row>
                        </Spin>
                    </div>
                </div>
            </>
        )
    }
}

