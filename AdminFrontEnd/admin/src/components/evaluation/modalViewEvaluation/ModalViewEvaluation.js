import React, { Component } from 'react';
import {Modal, Row, Col, Avatar, Rate, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';


export default class ModalViewEvaluation extends Component {
    handleCancel(){
        this.props.onCancel();
    }
    render() {
        const {visible, data} = this.props;
        console.log(data);
        return (
            <Modal
                visible={visible}
                width={500}
                title="XEM CHI TIẾT ĐÁNH GIÁ"
                onCancel={this.handleCancel.bind(this)}
                footer={null}
            >
                <Row>
                    <Col span={7}>
                        <div style={alignRight}>
                            <Avatar src={data.user.avatar} size={76} icon={<UserOutlined />} />
                        </div>
                    </Col>
                    <Col span={15} offset={2}>
                        <div>
                            <h2>{data.user.displayname}</h2>
                            <Rate value={data.rating}></Rate>
                        </div>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col span={24}>
                        <label>Tiêu đề:</label>
                        <Input style={text_bold} disabled="disabled" value={data.title}></Input>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <label>Nội dung:</label>
                        <TextArea rows={5} style={text_bold} disabled="disabled" value={data.content}></TextArea>
                    </Col>
                </Row>
                
            </Modal>
        )
    }
}

//
const text_bold = {
    fontWeight: 'bold',
    color: 'black',
    background: 'white'
}
const alignRight = {
    textAlign: 'right'
}


