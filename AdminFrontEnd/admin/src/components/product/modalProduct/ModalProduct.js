import React, { Component } from 'react';
import { Modal, Input, Form, Upload, Select, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axiosInstance from '../../../utils/axiosInstance';
import { colors } from '../../../utils/colors';
import { sizes } from '../../../utils/sizes';
const { TextArea } = Input;
const { Option } = Select;

const config = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },

}

export default class ModalProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            providers: [],
            imageList: [],
            colors: [],
            sizes: [],
        }
    }
    componentDidMount() {
        const { images } = this.props.data;

        this.setState({
            imageList: images ? images.map(ele => {
                return { uid: ele.id, url: ele.urlImage, status: ele.status, productId: ele.productId }
            }) : [],
        })


        const tempColors = Object.keys(colors).map(function (key) {
            return { id: Number(key), value: colors[key] };
        });
        this.setState({
            colors: [...tempColors]
        })


        const tempSizes = Object.keys(sizes).map(function (key) {
            return { id: Number(key), value: sizes[key] };
        });

        this.setState({
            sizes: [...tempSizes]
        })


        axiosInstance('ManageCategory', 'GET')
            .then(res => {


                this.setState({
                    categories: [...res.data]
                })
            });
        axiosInstance('ManageProvider', 'GET')
            .then(res => {


                this.setState({
                    providers: [...res.data]
                })
            })
    }
    componentWillUnmount() {
        this.setState({
            categories: [],
            providers: [],
            imageList: [],
            colors: [],
            sizes: [],
        })
    }
    handleCancel() {
        this.props.onCancel(false)
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
        const { imageList } = this.state;
        const { data } = this.props;
        console.log(values);
        this.props.onSubmitForm({ id: data.id, ...values, images: [...imageList] })


    }
    handleRemoveImage = file => {
        console.log(file);

    }
    render() {
        const { categories, providers, colors, sizes } = this.state;
        const { data, visible } = this.props;


        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (

            <Modal

                width={800}
                title={data.id ? "Cập nhập sản phẩm" : "Thêm sản phẩm"}
                visible={visible}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
            >
                <div>
                    <Form onFinish={this.handleSubmitForm.bind(this)} initialValues={
                        {
                            name: data.name,
                            importPrice: data.importPrice,
                            price: data.price,
                            sale: data.sale,
                            color: data.color,
                            size: data.size,
                            categoryId: data.categoryId,
                            providerId: data.providerId,
                            description: !!data.description ? data.description.split(';').join('\n') : null,
                            amount: data.amount,
                            viewCount: data.viewCount,
                        }
                    }>
                        <Row>
                            <Col span={18} offset={3}>
                                <Form.Item>
                                    <Upload onChange={this.handleChange.bind(this)} listType="picture-card"
                                        fileList={this.state.imageList}
                                        action={this.handleUpload.bind(this)}
                                        onRemove={this.handleRemoveImage.bind(this)}
                                    >
                                        {this.state.imageList.length >= 5 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col className="gutter-row" span={12}>
                                <Form.Item name="name" label="Tên sản phẩm" {...config}>
                                    <Input type="text" placeholder="Tên sản phẩm"></Input>
                                </Form.Item>
                                <Form.Item name="importPrice" label="Giá nhập (VNĐ)" {...config}>
                                    <Input type="text" placeholder="Giá nhập" ></Input>
                                </Form.Item>
                                <Form.Item name="price" label="Giá bán (VNĐ)" {...config}>
                                    <Input type="text" placeholder="Giá bán"></Input>
                                </Form.Item>
                                <Form.Item name="sale" label="Giảm giá (%)" {...config}>
                                    <Input type="text" placeholder="Giảm giá"></Input>
                                </Form.Item>
                                <Form.Item name="viewCount" label="Lượng xem" {...config}>
                                    <Input disabled type="text" placeholder="lượng xem"></Input>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Form.Item name="amount" label="Số lượng" {...config}>
                                    <Input type="text" placeholder="số lượng"></Input>
                                </Form.Item>
                                <Form.Item name="categoryId" label="Danh mục" {...config}>
                                    <Select
                                    //defaultValue={data.categoryId}
                                    placeholder="danh mục"
                                    >
                                        {
                                            categories.map((ele) => {
                                                return <Option key={ele.id} value={ele.id}>{ele.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name="providerId" label="Nhà cung cấp" {...config}>
                                    <Select
                                    //defaultValue={data.providerId}
                                    placeholder="nhà cung cấp"
                                    >
                                        {
                                            providers.map((ele) => {
                                                return <Option key={ele.id} value={ele.id}>{ele.name}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name="size" label="Size" {...config}>
                                    <Select
                                    //defaultValue={data.size}
                                    placeholder="size"
                                    >
                                        {
                                            sizes.map((ele) => {
                                                return <Option key={ele.id} value={ele.id}>{ele.value}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name="color" label="Color" {...config}>
                                    <Select
                                    //defaultValue={data.color}
                                    placeholder="màu sắc"
                                    >
                                        {
                                            colors.map((ele) => {
                                                return <Option style={{ color: `${ele.value}` }} key={ele.id} value={ele.id}>{ele.value}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>

                            </Col>
                        </Row>

                        <Form.Item name="description" label="Mô tả" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                            <TextArea placeholder="Mô tả" />
                        </Form.Item>
                        <Row>
                            <Col span={12} offset={6}>
                                <Form.Item>
                                    <Button htmlType="submit" size="large" type="primary" block>Submit</Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </Modal>

        )
    }
}
