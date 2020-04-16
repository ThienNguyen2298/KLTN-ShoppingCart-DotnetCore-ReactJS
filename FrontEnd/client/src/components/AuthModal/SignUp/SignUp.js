import React, { Component } from 'react'
import {Form, Input, Button} from 'antd';
import FormBuilder from 'antd-form-builder';

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
export default class SignUp extends Component {
    formRegister = FormBuilder.createForm()
    onFinishRegister(values){
        console.log("Các giá trị: ", values);
        
    }
    render() {
        return (
            <>
               <Form
               name="register"
               form={this.formRegister}
               onFinish={(vals) => this.onFinishRegister(vals)}
               {...formItemLayout}
               >
                   <Form.Item
                    name="fullname"
                    label="Họ và tên"
                    rules={[
                        {
                          required: true,
                          message: 'Xin vui lòng nhập họ tên!',
                        },
                        
                      ]}
                      hasFeedback
                   >
                       <Input/>
                   </Form.Item>
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
                       <Input/>
                   </Form.Item>
                   <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                          required: true,
                          message: 'Xin vui lòng nhập mật khẩu!',
                        },
                        {
                            min: 8,
                            message: 'Mật khẩu phải có tối thiểu 8 ký tự!'
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
                   <Form.Item>
                        <Button type="primary" style={{height: '40px', border: '1px solid #fadb14', backgroundColor: '#fadb14'}} htmlType="submit" className="login-form-button">
                            Đăng ký
                        </Button>
                    </Form.Item>
               </Form>
            </>
        )
    }
}
