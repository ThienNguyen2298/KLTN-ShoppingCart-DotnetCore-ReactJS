import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import Chart from "react-apexcharts";
import axiosInstance from '../../../utils/axiosInstance';
import {Row, Col, Select, Button, Table, Input, DatePicker, Tabs } from 'antd';

const { RangePicker } = DatePicker;
const {TabPane} = Tabs;

export default class StatisticsGeneral extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: true,
            products: [],
            productOrders: [],
            //
            fromAmount: null,
            toAmount: null,
            fromDate: null,
            toDate: null,
            isIncrease: null,
        }
    }
    callApi = async(body) => {
        let listProduct = await axiosInstance('Statistics/GetListProductStatistic', 'POST', body)
        .then(res => res.data);
        this.setState({
            products: listProduct,
        })
    }
    callApiOrder = async(body) => {
        let listProduct = await axiosInstance('Statistics/GetListProductOrderStatistic', 'POST', body)
        .then(res => res.data);
        this.setState({
            productOrders: listProduct,
        })
    }
    //
    async componentDidMount(){
        await this.callApi({});
        await this.callApiOrder({});
    }
    //
    handleChangeStatus(){
        this.setState({status: !this.state.status})
    }
    //
    handleChangeInput(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    //
    async handleStatistic(){
        const {status , fromAmount, toAmount, fromDate, toDate, isIncrease} = this.state;
        if(status){
            //console.log(fromAmount, toAmount);
            this.callApi({fromAmount, toAmount});
        }
    }
    render() {
        //
        const columnsProduct = [
            {
                title: 'SẢN PHẨM',
                key: 'name',
                dataIndex: 'name',
                width: '25%',
                
                render: text => <span >{text}</span>
            },
            {
                title: 'GIÁ BÁN',
                key: 'price',
                dataIndex: 'price',
                width: '25%',
                
                render: text => <span >{(text).toLocaleString('vi-VN')} đ</span>
            },
            {
                title: 'GIẢM GIÁ',
                key: 'sale',
                dataIndex: 'sale',
                width: '25%',
                
                render: text => <span >{text} %</span>
            },
            {
                title: 'SỐ LƯỢNG CÒN',
                key: 'amount',
                dataIndex: 'amount',
                width: '25%',
                
                render: text => <span >{text}</span>
            },
        ];
        //
        const columnsOrder = [
            {
                title: 'SẢN PHẨM',
                key: 'name',
                dataIndex: 'name',
                width: '25%',
                render: text => <span >{text}</span>
            },
            {
                title: 'GIÁ BÁN',
                key: 'price',
                dataIndex: 'price',
                width: '25%',
                render: text => <span >{(text).toLocaleString('vi-VN')} đ</span>
            },
            {
                title: 'GIẢM GIÁ',
                key: 'sale',
                dataIndex: 'sale',
                width: '25%',
                render: text => <span >{text} %</span>
            },
            {
                title: 'SỐ LƯỢNG ĐÃ BÁN',
                key: 'saledAmount',
                dataIndex: 'saledAmount',
                width: '25%',
                render: text => <span >{text}</span>
            }
        ];
        return (
            <><Header></Header>   
            <div className="main_container">
                <Sidebar isActive="11"></Sidebar>
                <div className="content">
                    <BreadScrumb title="Thống kê Sản phẩm"></BreadScrumb>
                    <br/>
                    <Row>
                    <Col span={22} offset={1}>
                    
                    <Row>
                        <Col span={5}>
                            
                            <Row >
                                
                                <Col span={12}>
                                    <Input disabled={this.state.status ? null : 'disabled'} placeholder="From Amount"
                                    value={this.state.fromAmount} onChange={(e) => this.handleChangeInput(e)} 
                                    name="fromAmount" type="number">

                                    </Input>
                                </Col>
                                <Col span={11} offset={1}>
                                    <Input disabled={this.state.status ? null : 'disabled'} placeholder="To Amount"
                                    value={this.state.toAmount} onChange={(e) => this.handleChangeInput(e)} 
                                    name="toAmount" type="number">

                                    </Input>
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col span={5} offset={1}>
                            
                            <RangePicker disabled={this.state.status ? 'disabled': null} format={'DD/MM/YYYY'} 
                                />
                        </Col>
                        <Col span={3} offset = {1}>
                            
                            <Select defaultValue={this.state.isIncrease} disabled={this.state.status ? 'disabled': null}>
                                <Select.Option value={null}>Tất cả SP</Select.Option>
                                <Select.Option value={true}>SP Bán chạy</Select.Option>
                                <Select.Option value={false}>SP Bán chậm</Select.Option>
                            </Select>
                        </Col>
                        <Col span={2} offset={1}>
                        
                            <Button onClick={this.handleStatistic.bind(this)}>Thống kê</Button>
                        </Col>
                        <Col span={2}>
                            
                            <Button>Xuất Excel</Button>
                        </Col>
                        <Col span={2} offset={1}>
                            <Button onClick={this.handleChangeStatus.bind(this)}>
                                {this.state.status?"Search By Order":"Search By Product"}
                                
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col span={24}>
                            
                            <Table columns={
                                this.state.status ? columnsProduct : columnsOrder
                            }
                            dataSource={this.state.status ? this.state.products : this.state.productOrders}
                            pagination={{
                                position: ["bottomCenter", "bottomCenter"],
                                defaultPageSize: 5,
                                defaultCurrent: 1
                            }}
                            >

                            </Table>
                                
                        </Col>
                    </Row>
                    
                    </Col>
                    </Row>
                </div>
            </div>
        </>
        )
    }
}
