import React, { Component } from 'react';
import { Row, Col, Form, Input, Upload, message, Button, DatePicker, Radio } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment';


const config = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },

}
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
class InfoUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //avatar: null,
            loading: false,
            imageList: [],
            
        }
    }
    async componentDidMount() {
        
        if (this.props.isAuthenticated) {
            
            this.setState({
                //avatar: this.props.user.avatar,
                imageList: this.props.user.avatar ? [{uid: 1, url: this.props.user.avatar}] : [],
            })
        }
        else {
            this.props.history.push('/');
        }
    }
    handleRemoveImage = file => {
        

    }
    handleChange({ fileList }) {


        this.setState({ imageList: fileList })

    }
    
    handleUpload = file => {
        //fake api
        const upload = `https://localhost:5001/api/ManageProduct/image`;
        return (
            upload
        )
    }
    handleSubmitForm(values) {

        this.props.onSubmitUserForm(
            {
                avatar: this.state.imageList,
                birthDay: values.birthDay._i?values.birthDay._i:moment(new Date(values.birthDay._d)).format("DD/MM/YYYY"),
                address: values.address,
                displayname: values.displayname,
                gender: values.gender,
                phone: values.phone,
            })
    }
    render() {
        const { avatar } = this.state;
        const { user } = this.props;

        
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Form onFinish={this.handleSubmitForm.bind(this)} {...config}
                    initialValues={{
                        displayname: user.displayname,
                        phone: user.phone,
                        address: user.address,
                        birthDay: moment(moment(new Date(user.birthDay)).format("DD/MM/YYYY"), dateFormatList[0]),
                        gender: user.gender,
                    }}
                    hideRequiredMark
                >
                    <Row>
                        <Col lg={{ span: 4, offset: 10 }} xs={{ span: 10, offset: 7 }} md={{ span: 4, offset: 10 }}>
                            <Upload onChange={this.handleChange.bind(this)} listType="picture-card"
                                fileList={this.state.imageList}
                                action={this.handleUpload.bind(this)}
                                onRemove={this.handleRemoveImage.bind(this)}
                                disabled={this.props.disabledUpdate}
                            >
                                {this.state.imageList.length >= 1 ? null : uploadButton}
                            </Upload>


                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" lg={{ span: 20, offset: 2 }} sm={{ span: 18, offset: 3 }}>
                            <Form.Item name="displayname" label="Họ và tên">
                                <Input type="text" placeholder="Họ và tên" disabled={this.props.disabledUpdate}></Input>
                            </Form.Item>
                            <Form.Item name="phone" label="Số điện thoại" >
                                <Input type="text" placeholder="Số điện thoại" disabled={this.props.disabledUpdate}></Input>
                            </Form.Item>
                            <Form.Item name="address" label="Địa chỉ" >
                                <Input type="text" placeholder="Địa chỉ" disabled={this.props.disabledUpdate}></Input>
                            </Form.Item>
                            <Form.Item name="birthDay" label="Ngày sinh">
                                <DatePicker style={{ width: '100%' }} format={dateFormatList} disabled={this.props.disabledUpdate} />
                            </Form.Item>
                            <Form.Item name="gender" label="Giới tính" >
                                <Radio.Group disabled={this.props.disabledUpdate}>
                                    <Radio value={false}>Nam</Radio>
                                    <Radio value={true}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'center' }}>
                        <Button htmlType="submit" disabled={this.props.disabledUpdate}>Cập nhập</Button>

                    </div>
                    <br></br>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}
export default withRouter(connect(mapStateToProps, null)(InfoUser));