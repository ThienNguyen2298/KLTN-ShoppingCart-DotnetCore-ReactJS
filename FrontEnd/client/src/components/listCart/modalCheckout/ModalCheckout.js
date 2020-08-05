import React, { Component, Fragment } from 'react';
import {Modal, Row, Col, Form, Input, Select, Button, Spin, Timeline} from 'antd';
import {ShoppingOutlined, CarOutlined, DollarCircleOutlined} from '@ant-design/icons';
import {StripeProvider, Elements} from 'react-stripe-elements';
import FormStripe from '../formStripe/FormStripe';
import * as ParsePrice from '../../../helper/parsePriceForSale';
import axiosInstance from '../../../utils/axiosInstance';
import {connect} from 'react-redux';


const {Option} = Select;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 18
    },
  };
class ModalCheckout extends Component {
    constructor(props){
        super(props);
        this.state = {
            onlinePayment: false,
            user: {},
            isMounted: false,
            feeShip: 40000,
        }
    }
    async componentDidMount() {
        if(this.props.userId === '')
        {
            this.setState({
                user: {},
                isMounted: true,
            })
        }
        else{
            const data = await axiosInstance(`User/get-user-by-id/${this.props.userId}`).then(res => res.data);
            this.setState({
                user: {...data},
                isMounted: true,
            })
        }
        
    }
    handleCancel(){
        this.props.onCancel();
    }
    handleStripePayment = (token) => {
        console.log(token);
    }
    handleSubmitCheckout = (values) => {
        
        //this.props.onCreateOrder();
        const carts = JSON.parse(localStorage.getItem('carts'));
        //format orderdetail
        const orderDetail = carts.map((ele) => {
            return {quantity: ele.quantity, unitPrice: ele.price, sale: ele.sale, productId: ele.id}
        })
        //console.log(values.note.split('\n'));
        if(this.props.userId){
            this.props.onCreateOrder({
                userId: this.props.userId,
                phone: values.phone,
                email: values.email,
                total: this.props.total + values.feeShip,
                feeShip: values.feeShip,
                address: values.address,
                street: values.street,
                note: values.note.split('\n').join(';'),
                OrderDetails: orderDetail
            })
        }
        else{
            this.props.onCreateOrder({
                guess: values.displayname,
                phone: values.phone,
                email: values.email,
                total: this.props.total + values.feeShip,
                feeShip: values.feeShip,
                address: values.address,
                street: values.street,
                note: values.note.split('\n').join(';'),
                OrderDetails: orderDetail
            })
        }
        
        //this.props.onCreateOrder({})
    }
    handleChangePayment(value){
        console.log(value)
        if(value === 2){
            this.setState({
                onlinePayment: true
            })
        }
        else{
            this.setState({
                onlinePayment: false
            })
        }
    }
    handleChangeFeeShip(value){
        this.setState({
            feeShip: value,
        })
    }
    render() {
        
        const {user, isMounted} = this.state;
        console.log(user)
        if(isMounted){
            return (
                
                <Modal visible={this.props.visible} footer={false} title="THỦ TỤC THANH TOÁN" 
                onCancel={this.handleCancel.bind(this)} width={800}
                >
                    <Spin spinning={this.props.isLoading} size="large">
                    <Form onFinish={this.handleSubmitCheckout.bind(this)}
                initialValues={{
                    displayname: user.displayname,
                    email: user.email,
                    phone: user.phone,
                    feeShip: this.state.feeShip,
                    payment: 1
                }}
            >       
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item required name="displayname" label="Họ tên" {...formItemLayout} labelAlign="left">
                                <Input type="text" placeholder="Họ tên"></Input>
                            </Form.Item>
                            <Form.Item required name="email" label="Email" {...formItemLayout} labelAlign="left">
                                <Input type="text" placeholder="Email"></Input>
                            </Form.Item>
                            <Form.Item required name="phone" label="SĐT" {...formItemLayout} labelAlign="left">
                                <Input type="text" placeholder="Số điện thoại"></Input>
                            </Form.Item>
                            <Form.Item required name="address" label="Địa chỉ" {...formItemLayout} labelAlign="left">
                                <Input type="text" placeholder="Địa chỉ"></Input>
                            </Form.Item>
                            <Form.Item required name="street" label="Đường" {...formItemLayout} labelAlign="left">
                                <Input type="text" placeholder="Đường"></Input>
                            </Form.Item>
                            <Form.Item name="note" label="Ghi chú" {...formItemLayout} labelAlign="left">
                                <TextArea placeholder="Ghi chú"></TextArea>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item required name="payment" label="Thanh toán" labelAlign="left" {...formItemLayout}>
                                <Select onChange={this.handleChangePayment.bind(this)}>
                                    <Option value={1}>Thanh toán khi nhận hàng</Option>
                                    <Option value={2}>Thanh toán online</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item required name="feeShip" label="Vận chuyển" labelAlign="left" {...formItemLayout}>
                                <Select onChange={this.handleChangeFeeShip.bind(this)}>
                                    <Option value={40000}>Trong ngày mai (40.000 đ)</Option>
                                    <Option value={20000}>Sau ngày mai (20.000 đ)</Option>
                                </Select>
                            </Form.Item>
                            {this.state.onlinePayment === true?
                            (
                                <StripeProvider apiKey="pk_test_51GsBkmDTOM2rV4A05njQTy9r2RSBuhuds67TGQsYmnDZcoP8qLkKTPbFEqlR8zQYOCKFvsrosssEdQoN1uTv3ILq00DL52AhHp">
                                    <Elements>
                                        <FormStripe total={this.props.total}></FormStripe>
                                    </Elements>
                                </StripeProvider>
                            ):(<Fragment>
                                <Row>
                                    <Col span={20} offset={2}>
                                        <Timeline>
                                            <Timeline.Item dot={<ShoppingOutlined 
                                            
                                            style={f_size_25}/>}>
                                                <h4><Row>
                                                    <Col span={10}>Tiền mua: </Col>
                                                    <Col span={14}>{ParsePrice.parsePrice(this.props.total)} - VND</Col></Row></h4>
                                                </Timeline.Item>
                                            <Timeline.Item dot={<CarOutlined style={f_size_25}/>}>
                                                <h4><Row>
                                                    <Col span={10}>
                                                    Vận chuyển: </Col>
                                                    <Col span={14}>{ParsePrice.parsePrice(this.state.feeShip)} - VND</Col>
                                                    </Row></h4>
                                                </Timeline.Item>
                                            <br></br>
                                            <Timeline.Item dot={<DollarCircleOutlined style={f_size_25}/>}>
                                                <h3><Row>
                                                    <Col span={10}>
                                                    Tổng tiền: </Col>
                                                    <Col span={14}>{ParsePrice.parsePrice(this.props.total + this.state.feeShip)} - VND
                                                    </Col>
                                                    </Row>
                                                    </h3>
                                                </Timeline.Item>
                                        </Timeline>
                                        {/*
                                        <h4>Tiền mua: {ParsePrice.parsePrice(this.props.total)} - VND</h4>
                                        <h4>Vận chuyển: {ParsePrice.parsePrice(this.state.feeShip)} - VND</h4>
                                        <br></br>
                                        <h3>Tổng tiền: {ParsePrice.parsePrice(this.props.total + this.state.feeShip)} - VND</h3>
                                        */}
                                    </Col>
                                </Row>
                                
                                </Fragment>)
                            }

                                
                            
                        </Col>
                        
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={12} style={{textAlign: 'end'}}>
                            <Button type="primary" onClick={this.handleCancel.bind(this)} danger>Hủy bỏ</Button>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Xác nhận</Button>
                            </Form.Item>
                            
                        </Col>
                    </Row>
                    </Form>
                    </Spin>
                </Modal>
                
        )
        }
        else{
            return null;
        }
        
    }
}
const f_size_25 = {
    fontSize: 22,
    color: '#237804'
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.carts.isLoading
    }
}
export default connect(mapStateToProps, null)(ModalCheckout);