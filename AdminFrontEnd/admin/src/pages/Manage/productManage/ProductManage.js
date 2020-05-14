import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import axiosInstance from '../../../utils/axiosInstance';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import { Table, Tag, Button} from 'antd';
import {colors} from '../../../utils/colors';
import {sizes} from '../../../utils/sizes';
import {EditOutlined, DeleteOutlined, EyeOutlined, ImportOutlined} from '@ant-design/icons';
import ModalProduct from '../../../components/product/modalProduct/ModalProduct';

export default class ProductManage extends Component {
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
    componentDidMount(){
        axiosInstance(`ManageProduct`,"GET")
        .then(res => {
          console.log(res.data)
          
            this.setState({
                data: res.data
            }
            )
          }
            );
        
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
    render() {
        const {data, visible, item} = this.state;
        const columns = [
            {
              title: 'Tên sản phẩm',
              dataIndex: 'name',
              key: 'name',
              render: text => <span>{text}</span>,
            },
            {
              title: 'Giá nhập ( vnđ )',
              dataIndex: 'importPrice',
              key: 'importPrice',
              render: text => <span >{text}</span>
            },
            {
              title: 'Giá bán ( vnđ )',
              dataIndex: 'price',
              key: 'price',
              render: text => <span  style={{color: 'green'}}>{text}</span>
            },
            {
              title: 'Màu sắc',
              key: 'color',
              dataIndex: 'color',
              render: color => (
                <span>
                    {
                        color === 0 ? <Tag color={colors[color]} key={color}>
                        {"White".toUpperCase()}
                      </Tag> :
                      <Tag color={colors[color]} key={color}>
                        {colors[color].toUpperCase()}
                      </Tag>
                    }
                </span>
              ),
            },
            {
              title: 'Size',
              key: 'size',
              dataIndex: 'size',
              render: size => (
                <span>
                    {
                        
                      <Tag color="default" key={size}>
                        {sizes[size]}
                      </Tag>
                    }
                </span>
              ),
            },
            {
              title: 'Sale ( % )',
              dataIndex: 'sale',
              key: 'sale',
              render: text => <span style={{color: 'red'}}>{text}</span>
            },
            {
              title: 'Nhà cung ứng',
              dataIndex: 'provider',
              key: 'provider',
              render: prov => <span style={{}}>{prov.name}</span>
            },
            {
              title: (<Button icon={<ImportOutlined />} onClick={() => this.handleClickBtn()} style={{ background: "#389e0d", borderColor: "#389e0d", color: 'white' }}>Add product</Button>),
              key: 'action',
              width: '30%',
              render: (text, record, index) => (
                <span>
                  <Button icon={<EyeOutlined />} style={{ background: "#fadb14", borderColor: "#fadb14", color: 'white' }}>View</Button>
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
                    <Sidebar isActive="6"></Sidebar>
                    <div className="content">
                        
                        <BreadScrumb title="Quản lý sản phẩm"></BreadScrumb>
                        
                        <Table style={{margin: '10px'}} columns={columns} dataSource={datas}
                        pagination={{ position: ["bottomCenter", "bottomCenter"],
                      defaultPageSize: 5 }} 
                        >
                        </Table>
                        {/* ---modal add or update */}
                        <ModalProduct visible={visible} data={item} onOk={this.handleCancel.bind(this)} 
                        onCancel={this.handleCancel.bind(this)}></ModalProduct>
                        {/* ---modal add or update */} 
                        
                    </div>
                </div>
            </>
        )
    }
}