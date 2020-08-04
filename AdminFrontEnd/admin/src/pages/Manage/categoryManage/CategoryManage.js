import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import { Table, Button, Tag, Input, Row, Col, Spin, message, Popconfirm } from 'antd';
import axiosInstance from '../../../utils/axiosInstance';
import { EditOutlined, DeleteOutlined, ImportOutlined } from '@ant-design/icons';
import ModalCategory from '../../../components/category/modalCategory/ModalCategory';

const { Search } = Input;
const warn = "Bạn có chắc chắn muốn xóa danh mục này?";

export default class CategoryManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            item: {},
            visible: false,
            isLoading: true
        }
    }
    handleClickBtn(record = null) {
        this.setState({
            visible: true,
            item: { ...record }
        })
    }
    handleOk(value) {
        this.setState({
            visible: value
        })
    }
    handleCancel(value) {
        this.setState({
            visible: value
        })
    }
    componentDidMount() {
        axiosInstance("ManageCategory", "GET")
            .then(res => {
                
                
                this.setState({
                    data: [...res.data],
                    isLoading: false
                })
            }
            )
            .catch(err => console.log(err)
            )
    }
    
    handleChangeInput(e) {
        const { item } = this.state;
        this.setState({
            item: { ...item, [e.target.name]: [e.target.value] }
        })
    }
    handleSubmit(value) {
        if (value.id) {
            const {data } = this.state;
            let tempData = [...data].filter(ele => ele.id !== value.id);
            this.setState({ isLoading: true });
            axiosInstance('ManageCategory','PUT',value)
            .then(res => {
                message.success(`${res.data.message}`, 2)
                this.setState({ 
                    data: [...tempData, value],
                    isLoading: false,
                    visible: false,
                });
            }
            ).catch(err => {
                message.warning("Thêm danh mục thất bại!", 2)
                this.setState({ isLoading: false, visible: false, });
            })
            
        }
        else{
            this.setState({ isLoading: true });
            axiosInstance('ManageCategory', 'POST', value)
                .then(res => {
                    //console.log(res.data);
                    message.success("Thêm danh mục thành công!", 2)
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            data: [...prevState.data, res.data],
                            isLoading: false,
                            visible: false
                        }
                    });
                })
        }

    }
    confirmDelete(record){
        const {data } = this.state;
        let tempData = [...data].filter(ele => ele.id !== record.id);
        this.setState({ isLoading: true });
        
        axiosInstance(`ManageCategory/${record.id}`, 'DELETE')
        .then(res => {
            message.success(`${res.data.message}`, 2)
            this.setState({
                data: [...tempData],
                isLoading: false,
            })
        })
        .catch(err => {
            message.warning("Xóa danh mục thất bại!", 2)
            this.setState({ isLoading: false});
        })
    }
    handleSearch(value){
        this.setState({
            isLoading: true,
        })
        if(value.trim() === ''){
            axiosInstance("ManageCategory", "GET")
            .then(res => {
                this.setState({
                    data: [...res.data],
                    isLoading: false
                })
            }
            )
            .catch(err => console.log(err)
            )
        }
        else{
            axiosInstance(`ManageCategory/search/${value}`, 'GET')
            .then(res => {
                console.log(res.data);
                
                this.setState({
                    data: [...res.data],
                    isLoading: false
                })
            }
            )
            .catch(err => console.log(err)
            )
        }
        
    }
    render() {
        const { data, item, visible, isLoading } = this.state;
        // columns
        const columns = [
            {
                title: 'Tên chung',
                dataIndex: 'generalityName',
                width: '20%',
                key: 'generalityName',
                render: text => <span>{text}</span>,
            },
            {
                title: 'Tên chi tiết',
                dataIndex: 'name',
                width: '20%',
                key: 'name',
                render: text => <span>{text}</span>,
            },

            {
                title: 'Trạng thái',
                dataIndex: 'status',
                width: '20%',
                key: 'status',
                render: status => (<span>{
                    <Tag color="green">Hiển thị</Tag>
                }</span>)

            },
            {
                title: 'Số sản phẩm',
                dataIndex: 'products',
                width: '20%',
                key: 'products',
                render: products => <span>{products ? products.length : 0}</span>,
            },
            {
                title: (<Button icon={<ImportOutlined />} onClick={() => this.handleClickBtn()}
                    style={{ background: "#389e0d", borderColor: "#389e0d", color: 'white' }}>Add category</Button>),
                width: '20%',
                key: 'action',
                render: (text, record, index) => (
                    
                    <span>

                        <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 10, marginLeft: 10 }}
                            onClick={() => this.handleClickBtn(record)}>Update</Button>
                        <>
                        <Popconfirm placement="left" title={warn} onConfirm={() => this.confirmDelete(record)} okText="Yes" cancelText="No">
                            <Button icon={<DeleteOutlined />} type="danger">Delete</Button>
                        </Popconfirm>
                        </>
                    </span>
                    
                ),
            },
        ];

        const datas = data.map(ele => {
            return { key: ele.id, ...ele }
        })
        return (
            <>
                <Header></Header>
                <div className="main_container">
                    <Sidebar isActive="4"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Quản lý danh mục"></BreadScrumb>
                        
                            <Spin size="large" spinning={isLoading} tip="Loading data">
                                <div style={{ margin: 10 }}>
                                    <Row>
                                        <Col span={12} offset={6}>
                                            <Search
                                                placeholder="tìm kiếm..."
                                                enterButton="Tìm kiếm"

                                                size="large"
                                                onSearch={value => console.log(value)}
                                            />
                                        </Col>
                                    </Row>
                                </div>

                                <Table style={{ margin: 10 }} width="100%" columns={columns} dataSource={datas} pagination={{
                                    position: ["bottomCenter", "bottomCenter"],
                                    defaultPageSize: 5,
                                }}>

                                </Table>
                                {
                                    visible?<ModalCategory onChangeInput={this.handleChangeInput.bind(this)} 
                                    visible={visible} data={item}
                                    onSubmitForm={this.handleSubmit.bind(this)}
                                    ></ModalCategory>:null
                                }
                        

                         </Spin>
                        
                    </div>
                </div>
            </>
        )
    }
}