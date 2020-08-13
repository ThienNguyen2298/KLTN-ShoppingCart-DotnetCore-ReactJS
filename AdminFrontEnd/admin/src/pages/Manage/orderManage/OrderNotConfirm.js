import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import ModalViewOrderDetail from '../../../components/order/modalOrder/ModalViewOrderDetail';
import ModalCancelOrder from '../../../components/order/modalOrder/ModalCancelOrder';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import { Table, Button, Row, Col, Input,  Popconfirm, Spin, message, DatePicker, Form } from 'antd';
import {RotateLeftOutlined, EditOutlined, DeleteOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import axiosInstance from '../../../utils/axiosInstance';
import queryString from 'querystring';
import moment from 'moment';
import './css/OrderNotConfirm.css';




const {Search} = Input;
const { RangePicker } = DatePicker;

const OK = "Xác nhận chuyển trạng thái Đang Vận Chuyển cho đơn hàng này!";
const Cancel = "Xác nhận Hủy Đơn Hàng!";
//
function getPictureDetail(array){
    const temp = array.filter((ele) => ele.status === 0);
    if(temp.length <= 0){
        return null;
    }
    return temp[0].urlImage;
}
//expect: two > one.
function compareDates(one, two) {
    
    var dateOne = new Date(one); //Year, Month, Date
    var dateTwo = new Date(two); //Year, Month, Date
    
    if (dateOne <= dateTwo) {    
        return false;    
    }else {    
        return true;   
    } 
}
//
function formatMomentArray(arrayMoment) {
    let result = arrayMoment.map((ele) => {
        return moment(ele._d).format('YYYY/MM/DD');
    })
    return result;
}
export default class OrderNotConfirm extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderNotConfirm: [],
            orderDetailList: [],
            pageDefault: 1,
            pageSize: 4,
            visible: false,
            visibleCancel: false,
            isLoading: true,
            feeShip: 0,
            customerItem: '',
            orderId: 0,
            note: null,
            //
            rangePicker: [],
            keyWord: null,
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
                feeShip: ele.feeShip,
                userId: ele.userId,
                enableOrder: ele.enableOrder,
                key: ele.id
            }
        })
        
        this.setState({
            orderNotConfirm: formatList,
            isLoading: false,
        })
    }
    //
    async componentDidMount(){
        await this.callApi();
    }
    //chuyển hàng
    async confirmShipping(record) {
        let check = compareDates(moment(record.deliveryDate).format('YYYY/MM/DD'), moment(new Date()).format('YYYY/MM/DD'));
        console.log(check);
        if(check)
        {
            this.setState({
                isLoading: true,
            })
            let list = await axiosInstance(`ManageOrder/ConfirmShippingAndSendMailBillOrder`,'POST', {orderId: record.id, status: 2})
            .then(res => res.data);
            if(list === true){
                message.success('Đã gửi Hóa đơn cho khách hàng qua Email và chuyển sang trạng thái Giao hàng!', 4)
                this.callApi();
            }else{
                message.warning('Chuyển trạng thái Giao hàng thất bại!', 4)
                this.setState({
                    isLoading: false,
                })
            }
        }
        else{
            message.warning('Đơn hàng đã quá hạn vận chuyển!', 4);
        }
        
    }
    //xem chi tiết
    handleViewDetail = async(record) => {
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
                picture: !!ele.product ? getPictureDetail(ele.product[0].images) : null,
                sale: ele.sale,
                unitPrice: ele.unitPrice,
                amount: !!ele.product ? ele.product[0].amount : 0,
                updated: false,
                key: ele.id,
            }
        });
        this.setState({
            visible: true,
            orderDetailList: orderDetails,
            feeShip: record.feeShip,
            customerItem: record.customer,
            note: record.note,
        })
    }
    //hủy đơn hàng
    confirmCancelOrder = (record) => {
        
        this.setState({
            isLoading: true,
            visibleCancel: true,
            orderId: record.id,
        })
    }
    //hide modal detail
    handleCancel(value){
        this.setState({
            visible: value,
        })
        this.callApi();
    }
    //hide modal cancel
    handleCancelModal(){
        this.setState({
            visibleCancel: false,
            isLoading: false,
        })
    }
    //handle cancel order
    async handleCancelOrder(note, orderId){
        this.setState({
            isLoading: true,
            visibleCancel: false,
        })
        let list = await axiosInstance(`ManageOrder/CancelOrder`,'POST', 
        {orderId: orderId, status: 1, statusRollBack: 0, note: note})
        .then(res => res.data);
        if(list === true){
            message.success('Đã hủy Đơn hàng thành công!', 4)
            this.callApi();
        }else{
            message.warning('Hủy Đơn hàng thất bại!', 4);
            this.setState({
                
                isLoading: false,
            })
        }
        
    }
    //
    handleChangePicker(momentDate, stringDate){
        this.setState({
            rangePicker: momentDate,
        })
    }
    //
    handleChangeInput(e){
        this.setState({
            keyWord: e.target.value,
        })
    }
    //
    async handleReset(){
        await this.callApi();
    }
    //
    async handleSearch() {
        this.setState({
            isLoading: true
        });
        const {keyWord, rangePicker} = this.state;
        const dates = formatMomentArray(rangePicker);
        let list = await axiosInstance('ManageOrder/SearchProduct', 'POST', 
        {keyWord: keyWord, startDate: dates[0], endDate: dates[1], status: 0})
        .then(res => res.data).catch(err => {
            message.error('Tìm kiếm thất bại!', 4);
            this.setState({
                isLoading: false,
            });
        });
        const formatList = [...list].map((ele) => {
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
                enableOrder: ele.enableOrder,
                key: ele.id
            }
        })
        
        this.setState({
            orderNotConfirm: formatList,
            isLoading: false,
        })
    }
    render() {
        //
        const {orderNotConfirm, isLoading, visible, visibleCancel, orderDetailList, customerItem, 
            note ,feeShip, orderId} = this.state;
        
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
                    <Popconfirm disabled={record.enableOrder ? null : 'disabled'} placement="left" title={OK} 
                    onConfirm={() => this.confirmShipping(record)} okText="Yes" 
                    cancelText="No">
                      <Button disabled={record.enableOrder ? null : 'disabled'} icon={<RotateLeftOutlined />} 
                      style={{ background: "#389e0d", borderColor: "#389e0d", color: 'white', margin: '5px 10px' }}>Duyệt</Button>
                    </Popconfirm>
                    {/*
                    <Popconfirm placement="left" title={Cancel} onConfirm={() => this.confirmCancelOrder(record)} okText="Yes" 
                    cancelText="No">
                      <Button onClick={() => this.confirmCancelOrder(record)} icon={<DeleteOutlined />} 
                      type="danger">Hủy</Button>
                    </Popconfirm>
                    */}
                    <Button onClick={() => this.confirmCancelOrder(record)} icon={<DeleteOutlined />} 
                      type="danger">Hủy</Button>
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
                        <Spin spinning={isLoading} tip="LOADING...">
                        <BreadScrumb title="Đơn hàng chưa duyệt"></BreadScrumb>
                        <br/>
                        <Row style={{marginTop: 10}}>
                            
                            <Col span={8}>
                                <Col span={16} offset={6}>
                                <Input
                                    
                                    placeholder="Search..."
                                    value={this.state.keyWord}
                                    allowClear={true}
                                    onChange={this.handleChangeInput.bind(this)}
                                />
                                </Col>
                                
                            </Col>
                            <Col span={7}>
                                
                                <RangePicker 
                                value={this.state.rangePicker}
                                onChange={this.handleChangePicker.bind(this)}/>
                            </Col>
                            <Col span={2}>
                                <Button style={{borderColor: '#0050b3', color: '#0050b3'}} icon={<SearchOutlined />}
                                onClick={this.handleSearch.bind(this)}
                                >
                                    Search
                                </Button>
                            
                            </Col>
                            <Col span={7}>
                                
                                <Button onClick={this.handleReset.bind(this)} icon={<SyncOutlined />}>Reset</Button>
                                
                            </Col>
                            
                        </Row>
                        <br/>
                        <Row>
                            <Col span={24}>
                            <Table style={{ margin: '10px' }} columns={columns} dataSource={orderNotConfirm}
                            scroll={true}
                            rowClassName={(record, index) => (record.enableOrder ? "green" : "red")}
                            pagination={{
                                position: ["bottomCenter", "bottomCenter"],
                                defaultPageSize: this.state.pageSize,
                                defaultCurrent: this.state.pageDefault
                              }}>

                            </Table>
                            </Col>
                        </Row>
                        {/*Modal Detail */}
                        {
                            visible ?
                            <ModalViewOrderDetail 
                            visible={visible} 
                            onCancel={this.handleCancel.bind(this)}
                            data={orderDetailList}
                            feeShip={feeShip}
                            customer={customerItem}
                            note={note}
                            status={0}
                            >
                            </ModalViewOrderDetail> : null
                        }
                        {/*Modal Cancel */}
                        {
                            visibleCancel ?
                            <ModalCancelOrder 
                            visible={visibleCancel}
                            onOk={this.handleCancelOrder.bind(this)}
                            onCancel={this.handleCancelModal.bind(this)}
                            orderId={orderId}
                            >
                            </ModalCancelOrder> : null
                        }
                        </Spin>
                    </div>
                </div>
            </>
        )
    }
}