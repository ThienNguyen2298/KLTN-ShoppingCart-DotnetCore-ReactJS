import React, { Component } from 'react';
import {Modal,Table, Row, Col, Input, Button, message} from 'antd';
import {EditOutlined, DeleteOutlined, SaveOutlined, SyncOutlined} from '@ant-design/icons'
import '../../../pages/Manage/orderManage/css/OrderNotConfirm.css';
import axiosInstance from '../../../utils/axiosInstance';
import queryString from 'querystring';

const {TextArea} = Input;
function CalcTotal(data, feeShip){
    
    
    return [...data].reduce((sum, ele) => {
        return sum += ele.quantity * ele.unitPrice * (100 - ele.sale) / 100;
    }, feeShip);
    
}
//
function getPictureDetail(array){
    const temp = array.filter((ele) => ele.status === 0);
    if(temp.length <= 0){
        return null;
    }
    return temp[0].urlImage;
}

export default class ModalViewOrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageDefault: 1,
            pageSize: 3,
            
            data: [],
            total: 0,
        }
    }
    componentDidMount(){
        localStorage.setItem("storage_data", JSON.stringify(this.props.data));
        
        this.setState({
            
            data: this.props.data,
            total: CalcTotal(this.props.data, this.props.feeShip),
        })
    }
    componentWillUnmount(){
        this.setState({
            pageDefault: 1,
            pageSize: 3,
            
            data: [],
            total: 0,
        })
    }
    handleCancel(){
        this.props.onCancel(false);
    }
    //
    handleEditOrderDetail(id){
        
        const tempData = [...this.props.data];
        tempData.map(ele => {
            if(ele.id === id){
                ele.updated = !ele.updated;
            }
            return ele;
        });
        this.setState({
            
            data: tempData,
        })
    }
    //
    handleDeleteOrderDetail(record){
        if(this.state.data.length <= 1){
            message.warning('Vui lòng Hủy đơn hàng, thay vì xóa sản phẩm duy nhất này!', 4);
        }
        else {
            axiosInstance(`ManageOrder/${record.id}`, 'DELETE')
            .then((res) => {
                if(res.data.isSuccess){
                    const newData = [...this.state.data].filter((ele) => ele.id !== res.data.orderDetailId);
                    this.setState({
                        data: newData,
                        total: CalcTotal(newData, this.props.feeShip),
                    })
                }
                else{
                    message.warning('Xóa item thất bại!', 4);
                }
            })
        }
        
    }
    //
    handleSaveOrderDetail(record){
        const body = {
            ...record, 
            quantity: +record.quantity,
            unitPrice: +record.unitPrice,
            sale: +record.sale,
        };
        if(body.quantity > 0){
            axiosInstance('ManageOrder/UpdateOrderDetail', 'PUT', body)
            .then(res => {
                if(res.data.isSuccess){
                    localStorage.setItem("storage_data", JSON.stringify(this.props.data));
                    this.setState({
                        total: res.data.total,
                        
                    });
                    this.handleEditOrderDetail(res.data.orderDetailId);
                }
                else {
                    message.warning('Cập nhật chi tiết đơn hàng Thất bại!', 4);
                    
                }
                
            })
        }else{
            message.warning('Không được gắn giá trị 0 quantity, bạn nên xóa item này!', 4);
        }
        
    }
    //
    handleChangeInput(e, id){
        console.log("id: ",id);
        const temp = [...this.state.data];
        temp.map((ele) => {
            if(ele.id === id){
                ele[e.target.name] = e.target.value;
            }
            return {...ele, key: ele.id};
        })
        this.setState({
            data: temp, 
        })
    }
    //
    handleReset = async() => {
        let list = await axiosInstance(`ManageOrder/GetOrderDetailByOrderId?${queryString.stringify({
            orderId: this.props.data[0].orderId,
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
            data: orderDetails,
            total: CalcTotal(orderDetails, this.props.feeShip),
        })
    }
    render() {
        console.log("data: ", this.state.data);
        const {visible, customer, note, status} = this.props;
        const {data, total} = this.state;
        
        const column = [
            {
                title: 'SẢN PHẨM',
                dataIndex: 'product',
                width: '200',
                render: pro => <span>{pro}</span>
            },
            {
                title: 'HÌNH ẢNH',
                dataIndex: 'picture',
                width: '200',
                render: url => <img src={url} width="80" height="80" alt="product"></img>
            },
            {
                title: 'GIẢM GIÁ',
                dataIndex: 'sale',
                width: '200',
                render: (sale, record) => <><Input name="sale" style={{width: 50, color: 'black'}} disabled={record.updated ? null : "disabled"}
                onChange={(e) => this.handleChangeInput(e, record.id)} value={sale} type="input"></Input>{' %'}</>
            },
            {
                title: 'ĐƠN GIÁ',
                dataIndex: 'unitPrice',
                width: '200',
                render: (uP, record) => <><Input name="unitPrice" style={{width: 100, color: 'black'}} disabled={record.updated ? null : "disabled"}
                onChange={(e) => this.handleChangeInput(e, record.id)} value={uP} type="input"></Input>{' đ'}</>
            },
            {
                title: 'SỐ LƯỢNG',
                dataIndex: 'quantity',
                width: 200,
                render: (q, record) => <Input name="quantity" style={{width: 50, color: 'black'}} disabled={record.updated ? null : "disabled"}
                onChange={(e) => this.handleChangeInput(e, record.id)} value={q} type="input"></Input>
            },
            {
                title: 'TRONG KHO',
                dataIndex: 'amount',
                width: '200',
                render: q => <span>{q}</span>
            }
        ];
        const actionButton = {
            title: <Button icon={<SyncOutlined />} onClick={this.handleReset.bind(this)}>Reset</Button>,
            align: 'center',
            render: (text, record, index)  =>  <Row><Col span={ record.updated ? 0 : 12}>
                            <Button type="primary" icon={<EditOutlined />} hidden={record.updated ? true : false}
                            onClick={() => this.handleEditOrderDetail(record.id)}></Button></Col>
                            <Col span={12}>
                            <Button icon={<DeleteOutlined />} 
                            onClick={() => this.handleDeleteOrderDetail(record)}
                                type="danger"></Button></Col>
                            <Col span={record.updated ? 12 : 0}>
                                <Button hidden={record.updated ? false : true} 
                                style={{background: '#389e0d', borderColor: '#389e0d', color: 'white'}}
                                onClick={() => this.handleSaveOrderDetail(record)} icon={<SaveOutlined />}></Button>
                            </Col>
                            </Row>
        }
        if(status === 0){
            column.push(actionButton)
        }
        return (
            <Modal
                visible={visible}
                width={1200}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                title={<strong>CHI TIẾT ĐƠN HÀNG</strong>}
            >
                <Row>
                    
                    <Col span={20} offset={2}>
                        <Row>
                            <Col span={12}>
                            <Row>
                                <Col span={8}><strong>Khách Hàng:</strong></Col>
                                <Col span={16}><strong>{customer}</strong></Col>
                            </Row>
                            <Row>
                            <Col span={8}><strong>Tổng Hóa Đơn:</strong></Col>
                            <Col span={16}><strong>{(total).toLocaleString('vi-VN')} đ 
                            (Ship: {(this.props.feeShip).toLocaleString('vi-VN')} đ)</strong></Col>
                             
                            </Row>
                            </Col>
                            <Col span={12} >
                                <Row>
                                    <Col span={4}>
                                        <strong>Ghi Chú: </strong>
                                    </Col>
                                    <Col span={20}>
                                    <TextArea rows={2} style={{color: 'black'}} disabled="disabled" value={!!note ? note.split(';').join('\n') : 'Không có ghi chú'}></TextArea>
                                    </Col>
                                </Row>
                                
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                
                <br/>
                <Table columns={column} dataSource={data}
                rowClassName={(record, index) => (record.quantity > record.amount ? "red" : "green")}
                    pagination={{
                        position: ["bottomCenter", "bottomCenter"],
                        defaultPageSize: this.state.pageSize,
                        defaultCurrent: this.state.pageDefault
                    }}
                >
                </Table>
                
            </Modal>
        )
    }
}
