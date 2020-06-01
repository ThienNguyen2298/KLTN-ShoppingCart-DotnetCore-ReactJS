import React, { Component } from 'react'
import {Form, Input, Button, Spin} from 'antd';
import FormBuilder from 'antd-form-builder';
import {connect} from 'react-redux';

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
class SignUp extends Component {
    formRegister = FormBuilder.createForm()
    onFinishRegister(values){
        this.props.onSignUp({displayname: values.fullname, email: values.email, password: values.password});
        this.formRegister.resetFields();
    }
    componentWillUnmount(){
      this.formRegister.resetFields();
    }
    render() {
        return (
            <>
            <Spin spinning={this.props.isLoading} tip="ĐĂNG KÝ" size="large">
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
                   
                        <Button type="primary" style={{height: '40px', border: '1px solid #fadb14', backgroundColor: '#fadb14'}} htmlType="submit" block>
                            ĐĂNG KÝ
                        </Button>
                    
               </Form>
               </Spin>
            </>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      isLoading: state.auth.isLoadingRegister,
  }
}
export default connect(mapStateToProps, null)(SignUp);