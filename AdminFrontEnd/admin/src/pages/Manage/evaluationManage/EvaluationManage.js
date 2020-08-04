import React, { Component } from 'react';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import '../../../components/common/styleCommon/Content.css';
import BreadScrumb from '../../../components/breadScrumb/BreadScrumb';
import { Row, Col, Table, Button, Popconfirm, Rate, Spin, message} from 'antd';
import { EyeOutlined,RotateLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import axiosInstance from '../../../utils/axiosInstance';
import ModalViewEvaluation from '../../../components/evaluation/modalViewEvaluation/ModalViewEvaluation';


const OK = "Chấp thuận đánh giá này!";

export default class EvaluationManage extends Component {
    //
    constructor(props){
        super();
        this.state = {
            evaluationDeclineList: [],
            isLoading: false,
            pageDefault: 1,
            pageSize: 5,
            viewItem: null,
            visible: false,
        }
    }
    callApi = async () => {
        let data = await axiosInstance('ManageEvaluation/GetEvaluationsDecline', 'GET')
        .then(res => res.data);
        const formatList = data.map(e => {
            return {...e, key: e.id}
        })
        this.setState({
            evaluationDeclineList: formatList,
            isLoading: false,
        })
    }
    //
    async componentDidMount(){
        this.setState({
            isLoading: true,
        })
        await this.callApi();
    }
    //xóa đánh giá
    async confirmDeleteEvaluation(record){
        let check = await axiosInstance('ManageEvaluation/DeleteEvaluation', 'POST', {id: record.id, status: 2})
        .then(res => res.data);
        if(check){
            message.success('Xóa Đánh giá này thành công!', 4);
            await this.callApi();
        }
        else{
            message.warning('Xóa Đánh giá thất bại!', 4);
        }
    }
    //duyệt đánh giá
    async confirmEvaluation(record){
        let check = await axiosInstance('ManageEvaluation/ConfirmEvaluation', 'POST', {id: record.id, status: 0})
        .then(res => res.data);
        if(check){
            message.success('Duyệt Đánh giá này thành công!', 4);
            await this.callApi();
        }
        else{
            message.warning('Duyệt Đánh giá thất bại!', 4);
        }
    }
    //Xem chi tiết
    handleViewDetail(record){
        this.setState({
            visible: true,
            viewItem: record,
        })
    }
    //hide modal
    handleCancelModal(){
        this.setState({
            visible: false,
        })
    }
    render() {
        //
        const {evaluationDeclineList, isLoading, pageDefault, pageSize, visible, viewItem} = this.state;
        
        //
        const columns = [
            {
                title: 'USER',
                key: 'user',
                dataIndex: 'user',
                
                render: text => <span>{text.displayname}</span>,
            },
            
            {
                title: 'TIÊU ĐỀ',
                key: 'title',
                dataIndex: 'title',
                
                render: text => <span style={{fontWeight: 'bold'}}>{text}</span>
            },
            {
                title: 'ĐÁNH GIÁ',
                key: 'rating',
                dataIndex: 'rating',
                
                render: text => <Rate value={text}></Rate>
            },
            {
                title: 'SẢN PHẨM',
                key: 'product',
                dataIndex: 'product',
                
                render: text => <span>{text.name}</span>
            },
            {
                title: 'NGÀY ĐĂNG',
                key: 'createDate',
                dataIndex: 'createDate',
                
                render: text => <span >{moment(text).format('DD/MM/YYYY')}</span>
            },
            
            
            {
                title: 'TÙY CHỌN',
                key: 'action',
                align: 'center',
                width: '28%',
                render: (text, record, index) => (
                  <span>
        
                    <Button type="primary" icon={<EyeOutlined />}
                      onClick={() => this.handleViewDetail(record)}>Chi tiết</Button>
                    <Popconfirm placement="left" title={OK} 
                    onConfirm={() => this.confirmEvaluation(record)} okText="Yes" 
                    cancelText="No">
                      <Button icon={<RotateLeftOutlined />} 
                      style={{ background: "#389e0d", borderColor: "#389e0d", color: 'white', margin: '5px 10px' }}>Duyệt</Button>
                    </Popconfirm>
                    
                    <Button onClick={() => this.confirmDeleteEvaluation(record)} icon={<DeleteOutlined />} 
                      type="danger">Xóa</Button>
                  </span>
                ),
              },
        ]
        return (
            <>
            <Header></Header>   
                <div className="main_container">
                    <Sidebar isActive="8"></Sidebar>
                    <div className="content">
                        <Spin spinning={isLoading} tip="LOADING" size="large">
                        <BreadScrumb title="Quản lý đánh giá"></BreadScrumb>
                        <Row>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table columns={columns} 
                                dataSource={evaluationDeclineList}
                                pagination={{
                                    position: ["bottomCenter", "bottomCenter"],
                                    defaultPageSize: pageSize,
                                    defaultCurrent: pageDefault
                                }}
                                >

                                </Table>
                            </Col>
                        </Row>
                        {
                            visible ? 
                            <ModalViewEvaluation
                                visible={visible}
                                onCancel={this.handleCancelModal.bind(this)}
                                data = {viewItem}
                            ></ModalViewEvaluation>
                            : null
                        }
                        </Spin>
                    </div>
                </div>
            </>
        )
    }
}
