import React, { Component } from 'react';
import {Row, Col, Form, Input, Button, Spin} from 'antd';
import FormBuilder from 'antd-form-builder';
import { UserOutlined} from '@ant-design/icons';

export default class ForgetPassword extends Component {
   
    formForget = FormBuilder.createForm(this);
    onFinish(values){
        this.props.onForgot(values.email);
        this.formForget.resetFields();
    }
    
    render() {
        return (
            <div>
                
                <Form
                form={this.formForget}
                className="login-form"
                    initialValues={{
                        email: '',
                    }}
                    onFinish={this.onFinish.bind(this)}
                >
                    <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                          type: 'email',
                          message: 'Nhập email không hợp lệ!',
                        },
                        {
                          required: true,
                          message: 'Xin vui lòng nhập email',
                        },
                        ]}
                        hasFeedback
                        
                   >
                       <Input placeholder="Nhập Email"/>
                   </Form.Item>
                   <Row>
                        <Col lg={{span: 4, offset: 10}}>
                            <Button htmlType="submit" type="primary">Xác nhận</Button>
                        </Col>
                   </Row>
                </Form>
                
            </div>
        )
    }
}
