import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import ModalViewOrderDetail from '../../../components/order/modalOrder/ModalViewOrderDetail';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import { Table, Button, Row, Col, Input, Select, Popconfirm, Spin, message } from 'antd';
import {RotateLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../../utils/axiosInstance';
import queryString from 'querystring';
import moment from 'moment';


const {Search} = Input;
const {Option} = Select;
const OK = "Xác nhận chuyển trạng thái Đang Vận Chuyển cho đơn hàng này!";
const Cancel = "Xác nhận Hủy Đơn Hàng!"

export default class OrderNotConfirm extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderNotConfirm: [],
            orderDetailList: [],
            pageDefault: 1,
            pageSize: 5,
            visible: false,
            isLoading: true,
            totalItem: 0,
            customerItem: '',
        }
    }
    //call api
    callApi = async() => {
        this.setState({
            isLoading: true
        })
        let order = await axiosInstance(`ManageOrder/GetAllOrderNotConfirm`, 'GET')
        .then(res => res.data);
        const formatList = [...order].map((ele) => {
            return {id: ele.id,
                address: ele.address,
                createDate: ele.createDate,
                //email: ele.email,
                customer: !!ele.guess? ele.guess:ele.user.displayname,
                note: ele.note,
                contact: [ele.email, ele.phone],
                //phone: ele.phone,
                deliveryDate: ele.deliveryDate,
                status: ele.status,
                street: ele.street,
                total: ele.total,
                userId: ele.userId,
                key: ele.id
            }
        })
       
        this.setState({
            orderNotConfirm: formatList,
            isLoading: false,
        })
    }
    //
    componentDidMount(){
        this.callApi();
    }
    //chuyển hàng
    async confirmShipping(record) {
        let list = await axiosInstance(`ManageOrder/ConfirmShippingAndSendMailBillOrder`,'POST', {orderId: record.id, status: 2})
        .then(res => res.data);
        if(list === true){
            message.success('Đã gửi Hóa đơn cho khách hàng qua Email và chuyển sang trạng thái Giao hàng!', 4)
            this.callApi();
        }else{
            message.warning('Chuyển trạng thái Giao hàng thất bại!', 4)
        }
    }
    //xem chi tiết
    handleViewDetail = async(record) => {
        console.log(record)
        let list = await axiosInstance(`ManageOrder/GetOrderDetailByOrderId?${queryString.stringify({
            orderId: record.id
        })}`,'GET')
        .then(res => res.data);
        const orderDetails = list.map((ele) => {
            return {
                id: ele.id,
                orderId: ele.orderId,
                order: ele.order,
                quantity: ele.quantity,
                productId: ele.productId,
                product: !!ele.product ? ele.product[0].name : null,
                picture: !!ele.product ? ele.product[0].images[0].urlImage : null,
                sale: ele.sale,
                unitPrice: ele.unitPrice,
                key: ele.id,
            }
        });
        this.setState({
            visible: true,
            orderDetailList: orderDetails,
            totalItem: record.total,
            customerItem: record.customer
        })
    }
    //hủy đơn hàng
    confirmCancelOrder = async(record) => {
        let list = await axiosInstance(`ManageOrder/ConfirmShippingAndSendMailBillOrder`,'POST', {orderId: record.id, status: 1})
        .then(res => res.data);
        if(list === true){
            message.success('Đã hủy Đơn hàng thành công!', 4)
            this.callApi();
        }else{
            message.warning('Hủy Đơn hàng thất bại!', 4)
        }
    }
    //hide modal
    handleCancel(value){
        this.setState({
            visible: value,
        })
    }
    render() {
        //
        const {orderNotConfirm, isLoading, visible, orderDetailList, customerItem, totalItem} = this.state;
        console.log(orderNotConfirm)
        
        //headers
        const columns = [
            {
                title: 'KHÁCH HÀNG',
                key: 'customer',
                dataIndex: 'customer',
                width: '12%',
                render: text => <span>{text}</span>,
            },
            
            {
                title: 'LIÊN HỆ',
                key: 'contact',
                dataIndex: 'contact',
                width: '12%',
                render: text => text.map((e, i) => {return <div key={i}>{e}</div>})
            },
            {
                title: 'ĐỊA CHỈ',
                key: 'address',
                dataIndex: 'address',
                width: '12%',
                render: text => <span >{text}</span>
            },
            {
                title: 'ĐƯỜNG',
                key: 'street',
                dataIndex: 'street',
                width: '12%',
                render: text => <span >{text}</span>
            },
            {
                title: 'NGÀY ĐẶT',
                key: 'createDate',
                dataIndex: 'createDate',
                width: '12%',
                render: text => <span >{moment(text).format('DD/MM/YYYY')}</span>
            },
            {
                title: 'NGÀY GIAO',
                width: '12%',
                key: 'deliveryDate',
                dataIndex: 'deliveryDate',
                render: text => <span >{moment(text).format('DD/MM/YYYY')}</span>
            },
            
            {
                title: 'TÙY CHỌN',
                key: 'action',
                align: 'center',
                width: '28%',
                render: (text, record, index) => (
                  <span>
        
                    <Button type="primary" icon={<EditOutlined />}
                      onClick={() => this.handleViewDetail(record)}>Chi tiết</Button>
                    <Popconfirm placement="left" title={OK} onConfirm={() => this.confirmShipping(record)} okText="Yes" 
                    cancelText="No">
                      <Button icon={<RotateLeftOutlined />} 
                      style={{ background: "#389e0d", borderColor: "#389e0d", color: 'white', margin: '5px 10px' }}>Duyệt</Button>
                    </Popconfirm>
                    <Popconfirm placement="left" title={Cancel} onConfirm={() => this.confirmCancelOrder(record)} okText="Yes" 
                    cancelText="No">
                      <Button icon={<DeleteOutlined />} 
                      type="danger">Hủy</Button>
                    </Popconfirm>
                  </span>
                ),
              },
        ];
        
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="3"></Sidebar>
                    <div className="content">
                        <Spin spinning={isLoading}>
                        <BreadScrumb title="Đơn hàng chưa duyệt"></BreadScrumb>
                        
                        <Row style={{marginTop: 10}}>
                            <Col span={12} offset={6}>
                            <Search
                                placeholder="tìm kiếm..."
                                enterButton="tìm kiếm"

                                size="large"
                                //onSearch={this.handleSearchInput.bind(this)}
                            />
                            
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                            <Table style={{ margin: '10px' }} columns={columns} dataSource={orderNotConfirm}
                            scroll={true}
                            pagination={{
                                position: ["bottomCenter", "bottomCenter"],
                                defaultPageSize: this.state.pageSize,
                                defaultCurrent: this.state.pageDefault
                              }}>

                            </Table>
                            </Col>
                        </Row>
                        {
                        visible ?
                        <ModalViewOrderDetail 
                        visible={visible} 
                        onCancel={this.handleCancel.bind(this)}
                        data={orderDetailList}
                        total={totalItem}
                        customer={customerItem}
                        >

                        </ModalViewOrderDetail> : ''
                }
                        </Spin>
                    </div>
                </div>
            </>
        )
    }
}