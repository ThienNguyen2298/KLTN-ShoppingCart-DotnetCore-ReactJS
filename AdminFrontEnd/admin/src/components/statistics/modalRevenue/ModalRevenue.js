import React, { Component } from 'react';
import {Row, Col, Modal, Table} from 'antd';

export default class ModalRevenue extends Component {
    handleCancel() {
        this.props.onCancel(false)
    }
    //
    sortDate = (a, b) => {
        if(a.date.includes('Tháng')){
          let tempA = +a.date.split(' ')[1];
          let tempB = +b.date.split(' ')[1];
          return tempA - tempB;
        }
        else{
          let tempA = +a.date.split('/')[0];
          let tempB = +b.date.split('/')[0];
          return tempA - tempB;
        }
      }
    render() {
        const {tables, visible, pageSize, pageDefault} = this.props;
        const columns = [
            {
              title: 'Thời gian',
              dataIndex: 'date',
              key: 'date',
              width: '33%',
              sorter: (a, b) => this.sortDate(a, b),
              render: text => <span>{text}</span>,
            },
            {
              title: 'Số lượng đơn hàng bán ra',
              dataIndex: 'countOrder',
              key: 'countOrder',
              
              width: '33%',
              sorter: (a, b) => a - b,
              render: text => <span>{text}</span>,
            },
            {
              title: 'Doanh thu tương đương',
              dataIndex: 'sumRevenue',
              key: 'sumRevenue',
              width: '33%',
              sorter: (a, b) => a.sumRevenue - b.sumRevenue,
              render: text => <span>{text}</span>,
            },
          ]
        return (
            <div>
                <Modal
                width={800}
                title="CHI TIẾT"
                visible={visible}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                >
                <Row>
                          <Col span={24} >
                          <Table columns={columns} dataSource={tables}
                            pagination={{
                              position: ["bottomCenter", "bottomCenter"],
                              defaultPageSize: pageSize,
                              defaultCurrent: pageDefault
                            }}
                          >

                          </Table>
                          </Col>
                          
                        </Row>
                        </Modal>
            </div>
        )
    }
}
