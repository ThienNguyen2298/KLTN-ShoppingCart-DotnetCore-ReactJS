import React, { Component } from 'react';
import {Row, Col, Form, Input, Button, message} from 'antd';
import queryString from 'query-string';
import {Redirect} from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        }
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const containerStyle = {
    border: '1px solid #f0f0f0',
    padding: 20,
    borderRadius: 5,
    background: '#f0f0f0'
}
const titleStyle = {
    textAlign: 'center',
    padding: 15,
}

export default class ResetPassword extends Component {
    constructor(props){
        super();
        this.state = {
            token: null,
            email: null,
            isSuccess: false,
        }
    }
    componentDidMount(){
        var query = queryString.parse(this.props.location.search);
        this.setState({
            token: query.token,
            email: query.email,
            isSuccess: false,
        })
    }
    async handleSubmit(values) {
        const {token, email} = this.state;
        if(!!token && !!email){
            const body = {
                token: token.split(' ').join('+'),
                email: email,
                newPassword: values.password,
            }
            console.log(body);
            await axiosInstance('User/ResetPassword', 'POST', body)
            .then(res => {
                if(res.data){
                    message.success('Reset Password thành công!', 3);
                    return <Redirect to="/"></Redirect>
                }
                else{
                    message.warning('Reset Password thất bại!', 3);
                    return <Redirect to="/"></Redirect>
                }
                
            })
            
        }
        else{
            return <Redirect to="/"></Redirect>
        }
        
    }
    render() {
        if(this.state.isSuccess === false){
        return (
            
            <Row>
                <Col lg={{span: 8, offset: 8}} style={{padding: 10}}>
                    <div style={containerStyle}>
                        <h3 style={titleStyle}>QUÊN MẬT KHẨU</h3>
                        <hr/>
                        <br></br>
                        <br></br>
                        <Form
                        onFinish={this.handleSubmit.bind(this)}
                        {...formItemLayout}
                        >
                            
                            <Form.Item
                            
                            name="password"
                            label="Mật khẩu mới"
                            rules={[
                            {
                            required: true,
                            message: 'Xin vui lòng nhập mật khẩu!',
                            },
                            {
                                min: 10,
                                message: 'Mật khẩu phải có tối thiểu 10 ký tự!'
                            }
                            ]}
                            hasFeedback
                            >
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item
                            name="confirm"
                            label="Nhập lại mật khẩu"
                            dependencies={['password']}
                            rules={[
                            {
                            required: true,
                            message: 'Xin vui lòng nhập lại mật khẩu!',
                            },
                            {
                                min: 8,
                                message: 'Mật khẩu phải có tối thiểu 8 ký tự!'
                            },
                            ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                
                              return Promise.reject('Nhập lại mật khẩu chưa khớp với mật khẩu ở trên!');
                            },
                            })
                                ]}
                                hasFeedback
                            >
                                <Input.Password/>
                            </Form.Item>
                            <br></br>
                            <div style={{textAlign: 'center'}}>
                                <Button htmlType="submit" type="primary">Xác nhận</Button>
                            </div>
                            <br></br>
                        </Form>
                    </div>
                </Col>
                    
            </Row>
            
        )
        }
        else{
            return <Redirect to="/"></Redirect>
        }
    }
}
