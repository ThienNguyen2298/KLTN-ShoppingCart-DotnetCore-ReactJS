import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import {Table, Button, Tag} from 'antd';
import axiosInstance from '../../../utils/axiosInstance';
import {EditOutlined, DeleteOutlined, ImportOutlined} from '@ant-design/icons';
import ModalCategory from '../../../components/category/modalCategory/ModalCategory';


export default class CategoryManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            item: {},
            visible: false
        }
    }
    handleClickBtn(record = null){
        this.setState({
            visible: true,
            item: {...record}
          })
    }
    handleOk(value){
        this.setState({
          visible: value
        })
      }
      handleCancel(value){
        this.setState({
          visible: value
        })
      }
    componentDidMount(){
        axiosInstance("ManageCategory", "GET")
        .then(res => {
            console.log(res.data)
            
            this.setState({
                data: [...res.data]
            }) }
        )
        .catch(err => console.log(err)
        )
    }
    render() {
        const {data, item, visible} = this.state;
        // colums
        const columns = [
            {
                title: 'Tên chi tiết',
                dataIndex: 'name',
                width: '20%',
                key: 'name',
                render: text => <span>{text}</span>,
            },
            {
                title: 'Tên chung',
                dataIndex: 'generalityName',
                width: '20%',
                key: 'generalityName',
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
                render: products => <span>{products.length}</span>,
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
                    <Button  icon={<DeleteOutlined /> } type="danger">Delete</Button>
                  </span>
                ),
              },
        ];
        
        const datas = data.map(ele => {
            return { key: ele.id, ...ele}
        })
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="4"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Quản lý danh mục"></BreadScrumb>
                        Quản lý danh mục
                        <Table style={{margin: 10}}  width="100%" columns={columns} dataSource={datas} pagination={{
                            position: ["bottomCenter", "bottomCenter"],
                            defaultPageSize: 10
                        }}>

                        </Table>
                        {
                            visible ? <ModalCategory visible={visible} data={item} onOk={this.handleCancel.bind(this)} 
                            onCancel={this.handleCancel.bind(this)}></ModalCategory>:''
                        }
                        
                    </div>
                </div>
            </>
        )
    }
}