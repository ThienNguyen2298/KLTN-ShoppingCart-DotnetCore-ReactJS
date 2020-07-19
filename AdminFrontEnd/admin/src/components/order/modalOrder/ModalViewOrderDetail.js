import React, { Component } from 'react';
import {Modal,Table, Row, Col} from 'antd';

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
        const {visible, data, customer, total} = this.props;
        console.log(data);
        const column = [
            {
                title: 'SẢN PHẨM',
                dataIndex: 'product',
                width: '20%',
                render: pro => <span>{pro}</span>
            },
            {
                title: 'HÌNH ẢNH',
                dataIndex: 'picture',
                width: '20%',
                render: url => <img src={url} width="80" height="80" alt="product"></img>
            },
            {
                title: 'GIẢM GIÁ',
                dataIndex: 'sale',
                width: '20%',
                render: sale => <span>{sale} %</span>
            },
            {
                title: 'ĐƠN GIÁ',
                dataIndex: 'unitPrice',
                width: '20%',
                render: uP => <span>{uP} đ</span>
            },
            {
                title: 'SỐ LƯỢNG',
                dataIndex: 'quantity',
                width: '20%',
                render: q => <span>{q}</span>
            }
        ]
        return (
            <Modal
                visible={visible}
                width={1000}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                title="CHI TIẾT ĐƠN HÀNG"
            >
                <Row>
                    
                    <Col span={16} offset={4}>
                        <Row>
                            <Col span={12}>

                            <h3>KHÁCH HÀNG: {customer}</h3>
                            </Col>
                            <Col span={12} style={{textAlign: 'right'}}>
                            <h3>TỔNG HÓA ĐƠN: {(total).toLocaleString('vi-VN')} đ</h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
                <br/>
                <Table columns={column} dataSource={data}
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
