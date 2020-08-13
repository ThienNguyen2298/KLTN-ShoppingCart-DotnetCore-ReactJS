import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import {Row, Col, Table, Button, Popconfirm, Spin, message, DatePicker, Input} from 'antd';
import {EditOutlined, RotateLeftOutlined, DeleteOutlined, SearchOutlined, SyncOutlined} from '@ant-design/icons';
import moment from 'moment';
import axiosInstance from '../../../utils/axiosInstance';
import queryString from 'querystring';
import ModalViewOrderDetail from '../../../components/order/modalOrder/ModalViewOrderDetail';
import TextArea from 'antd/lib/input/TextArea';

const { RangePicker } = DatePicker;

const OK = "Xác nhận chuyển trạng thái Thành công cho đơn hàng này!";
const Cancel = "Xác nhận Hủy Đơn Hàng!";

//
function formatMomentArray(arrayMoment) {
    let result = arrayMoment.map((ele) => {
        return moment(ele._d).format('YYYY/MM/DD');
    })
    return result;
}

export default class OrderCanceled extends Component {
    constructor(props){
        super(props);
        this.state = {
            orderCanceledList: [],
            orderDetailList: [],
            pageDefault: 1,
            pageSize: 5,
            visible: false,
            isLoading: true,
            visibleCancel: false,
            feeShip: 0,
            customerItem: '',
            orderId: 0,
            note: null,
            //
            keyWord: null,
            rangePicker: [],
        }
    }
    //load api
    callApi = async() => {
        this.setState({
            isLoading: true
        })
        let order = await axiosInstance(`ManageOrder/GetAllOrderCancelled`, 'GET')
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
                feeShip: ele.feeShip,
                status: ele.status,
                street: ele.street,
                total: ele.total,
                userId: ele.userId,
                enableOrder: true,
                key: ele.id
            }
        })
       
        this.setState({
            orderCanceledList: formatList,
            isLoading: false,
            keyWord: null,
            rangePicker: [],
        })
    }
    //
    async componentDidMount(){
        await this.callApi();
    }
    //xem chi tiết
    handleViewDetail = async(record) => {
        console.log(record.note);
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
                amount: !!ele.product ? ele.product[0].amount : 0,
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
    //hide modal detail
    handleCancel(value){
        this.setState({
            visible: value,
        })
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
        {keyWord: keyWord, startDate: dates[0], endDate: dates[1], status: 3})
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
            orderCanceledList: formatList,
            isLoading: false,
        })
    }
    render() {
        //
        //
        const {orderCanceledList, visible, orderDetailList, isLoading, customerItem, feeShip, 
            visibleCancel , orderId , note} = this.state;
        
        //
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
                title: 'NGUYÊN NHÂN',
                
                key: 'note',
                dataIndex: 'note',
                render: text => <span>{text}</span>
            },
            
            {
                title: 'TÙY CHỌN',
                key: 'action',
                align: 'center',
                
                render: (text, record, index) => (
                  <span>
        
                    <Button type="primary" icon={<EditOutlined />}
                      onClick={() => this.handleViewDetail(record)}>Chi tiết</Button>
                    
                  </span>
                ),
              },
        ];
        
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="12"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Đơn hàng Đã hủy"></BreadScrumb>
                        <br></br>
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
                        <br></br>
                        <Row>
                            <Col span={24}>
                                <Table style={{ margin: '10px' }} 
                                columns={columns}
                                dataSource={orderCanceledList}
                                pagination={{
                                    position: ["bottomCenter", "bottomCenter"],
                                    defaultPageSize: this.state.pageSize,
                                    defaultCurrent: this.state.pageDefault
                                }}
                                >

                                </Table>
                            </Col>
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
                            >
                            </ModalViewOrderDetail> : null
                        }
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}
