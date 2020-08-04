import React, { Component } from 'react';
import {Modal,Table, Row, Col, Input} from 'antd';
import '../../../pages/Manage/orderManage/css/OrderNotConfirm.css';

const {TextArea} = Input;
export default class ModalViewOrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageDefault: 1,
            pageSize: 3,
        }
    }
    handleCancel(){
        this.props.onCancel(false);
    }
    render() {
        const {visible, data, customer, total, note} = this.props;
        console.log(note);
        console.log(data);
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
                render: sale => <span>{sale} %</span>
            },
            {
                title: 'ĐƠN GIÁ',
                dataIndex: 'unitPrice',
                width: '200',
                render: uP => <span>{uP} đ</span>
            },
            {
                title: 'SỐ LƯỢNG',
                dataIndex: 'quantity',
                width: '200',
                render: q => <span>{q}</span>
            },
            {
                title: 'TRONG KHO',
                dataIndex: 'amount',
                width: '200',
                render: q => <span>{q}</span>
            }
        ]
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
                            <Col span={16}><strong>{(total).toLocaleString('vi-VN')} đ</strong></Col>
                             
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
