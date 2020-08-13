import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import Chart from "react-apexcharts";
import axiosInstance from '../../../utils/axiosInstance';
import {Row, Col, Select, Button} from 'antd';

export default class StatisticsProduct extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          //
          isChart: 0,
          //
          status: 0,
          labels: [],
          amountCount: [],
          //
          labelOrder: [],
          amountOrder: [],
        };
    }
    callApi = async(status) => {
        //const {status} = this.state;
        let data = await axiosInstance('Statistics/ProductStatistics', 'POST', {status: status})
        .then(res => {return res.data})
        let labels = data.map(e => e.name);
        let countAmount = data.map(e => e.amount);
        
        
        this.setState({
          labels: labels, 
          amountCount: countAmount,
          status: status,
          isChart: 0,
        })
    }
    callApiOrder = async() => {
        
        let data = await axiosInstance('Statistics/StatusOrderStatistics', 'GET')
        .then(res => {return res.data})
        let labelOrder = data.map(e => e.status);
        let countOrder = data.map(e => e.count);
        
        
        this.setState({
            labelOrder: labelOrder,
          amountOrder: countOrder,
        })
    }
    async componentDidMount(){
        await this.callApi(this.props.status);
    }
    async handleChange(e){
      
        await this.callApi(e);
    }
    //
    async handleClickOrder(){
        this.setState({
            isChart: 1
        })
        await this.callApiOrder();
    }
    render() {
        const {status, labels, amountCount, isChart} = this.state;
        console.log(amountCount);
        //
        const series = [
            {
                name: 'Số lượng',
                type: 'column',
                data: amountCount
              }, 
        ]
        const options = {
            noData: {
              text: undefined,
              align: 'center',
              verticalAlign: 'middle',
              offsetX: 0,
              offsetY: 0,
              style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: undefined
              }
            },
            stroke: {
              width: [0, 4]
            },
            title: {
              text: status === 1 ? "Thống kê Các Mặt Hàng tồn": "Thống kê các mặt hàng sắp hết",
              align: 'center',
              style: {
                  
                  fontSize:  '20px',
                  fontWeight:  'bold',
                  fontFamily:  'sans serif',
                  color:  '#263238'
                }
              
            },
            dataLabels: {
              width: '30px',
              enabled: true,
              enabledOnSeries: [1]
            },
            labels: labels,
            xaxis: {
              title: {text:  `Các sản phẩm` },
              type: 'month',
              
            },
            yaxis: [{
              title: {
                text: 'Số lượng',
              },
              labels: {
                  formatter: (value) => { return value },
              }
            }, ]
        }
      
        const seriesOrder = this.state.amountOrder;
        const optionOrder = {
            
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: this.state.labelOrder,
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
            }]
        }
        //
        
        
        return (
            <><Header></Header>   
            <div className="main_container">
                <Sidebar isActive="10"></Sidebar>
                <div className="content">
                    <BreadScrumb title="Thống kê Sản phẩm"></BreadScrumb>
                    <br/>
                    <Row>
                        <Col span={4} offset={6}>
                            <Select  defaultValue={status} onChange={this.handleChange.bind(this)}>
                                <Select.Option value={0}>Thống kê Hàng sắp hết</Select.Option>
                                <Select.Option value={1}>Thống kê Hàng tồn kho</Select.Option>
                            </Select>
                        </Col>
                        <Col span={4} offset={4}>
                            <Button onClick={this.handleClickOrder.bind(this)}>Thống kê Trạng thái Đơn hàng</Button>
                        </Col>
                        
                    </Row>
                    <br/>
                    {
                        isChart === 0 ?
                        <Chart
                                options={options}
                                series={series}
                                type="line"
                                height="440"
                        />
                        : 
                        <Row>
                            <Col span={10} offset={7}>
                                <h3 style={{textAlign: 'center'}}>Thống kê Trạng thái Đơn hàng</h3>
                            <Chart options={optionOrder} series={seriesOrder} type="pie" width={600} />
                        </Col>
                        </Row>
                        
                    }
                </div>
            </div>
        </>
        )
    }
}
