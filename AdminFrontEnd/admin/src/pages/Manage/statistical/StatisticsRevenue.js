import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import Chart from "react-apexcharts";

export default class StatisticsRevenue extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            options: {
                
                stroke: {
                    width: [0, 4]
                  },
                  title: {
                    text: 'Doanh thu và số Đơn hàng',
                    align: 'center',
                    style: {
                        
                        fontSize:  '20px',
                        fontWeight:  'bold',
                        fontFamily:  'sans serif',
                        color:  '#263238'
                      }
                    
                  },
                  dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                  },
                  labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                  xaxis: {
                    title: {text: 'Các ngày trong tháng 7 / 2020'},
                    type: 'month',
                    
                  },
                  yaxis: [{
                    title: {
                      text: 'Doanh thu',
                    },
                    labels: {
                        formatter: (value) => { return value + " M" },
                    }
                  }, {
                    opposite: true,
                    title: {
                      text: 'Số đơn hàng'
                    }
                  }]

            },
            series: [
                {
                    name: 'Doanh thu',
                    type: 'column',
                    data: [ 201, 352, 752, 320, 257, 160,440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160,440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
                  }, {
                    name: 'Số đơn hàng',
                    type: 'line',
                    data: [ 17, 31, 22, 22, 12, 16, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
                  }
            ]
        };
      }
    render() {
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="8"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Thống kê doanh thu"></BreadScrumb>
                        Thống kê doanh thu
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            height="350"
                            
                        />
                    </div>
                </div>
            </>
        )
    }
}