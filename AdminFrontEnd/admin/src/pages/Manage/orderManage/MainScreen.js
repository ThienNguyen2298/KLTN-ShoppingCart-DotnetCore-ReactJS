import React, { Component } from 'react';
import {Row, Col, Statistic, Button, Card} from 'antd';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import {EditOutlined, LikeOutlined, ArrowUpOutlined, ArrowDownOutlined, SyncOutlined} from '@ant-design/icons';
import moment from 'moment';
import axiosInstance from '../../../utils/axiosInstance';
import queryString from 'querystring';

export default class MainScreen extends Component {
    render() {
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="13"></Sidebar>
                    <div className="content">
                        <BreadScrumb title="Home"></BreadScrumb>
                        <br></br>
                        
                        <Row>
                            <Col span={22} offset={1}>
                            <div className="site-statistic-demo-card">
                            <Row gutter={16}>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="Active"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card>
                                <Statistic
                                    title="Idle"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                                </Card>
                            </Col>
                            </Row>
                        </div>
                        <br></br>
                            <Row >
                            <Col span={12}>
                            <Statistic title="Active Users" value={112893} />
                            </Col>
                            <Col span={12}>
                            <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                            <Button style={{ marginTop: 16 }} type="primary">
                                Recharge
                            </Button>
                            </Col>
                        </Row>
                        <br></br>
                        <Row >
                            <Col span={12}>
                            <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                            </Col>
                            <Col span={12}>
                            <Statistic title="Unmerged" value={93} suffix="/ 100" />
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
