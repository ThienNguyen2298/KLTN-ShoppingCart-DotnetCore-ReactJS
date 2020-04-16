import React, { Component } from 'react';
import img1 from '../../images/item1.jpg';
import img2 from '../../images/banner/empty_banner.jpg';
import './detail.css';
import {Tag, Alert, notification} from 'antd';
import {PlusOutlined, MinusOutlined, CheckCircleOutlined} from '@ant-design/icons';


export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            mainImage: img1
        }
        
    }
    handleClickSubImage(e){
        console.log(e.target.src);
        this.setState({
            mainImage: e.target.src
        })
        notification.open({
            message: 'Notification Title',
            duration: 5,
            icon: <CheckCircleOutlined style={{ color: '#5cb85c' }} />,
        })
    }
    render() {
        return (
            <article className="detail-product">
                <div className="img-detail-product">
                    <div className="sub-img-product" >
                        <img onClick={(e) => this.handleClickSubImage(e)} 
                        src={img1} className="sub-img-detail-product"  alt="sub img"></img>

                        <img onClick={(e) => this.handleClickSubImage(e)}
                        src={img2} className="sub-img-detail-product"  alt="sub img"></img>

                        <img onClick={(e) => this.handleClickSubImage(e)}
                        src={img1} className="sub-img-detail-product"  alt="sub img"></img>

                        <img onClick={(e) => this.handleClickSubImage(e)}
                        src={img2} className="sub-img-detail-product"  alt="sub img"></img>

                        <img onClick={(e) => this.handleClickSubImage(e)}
                        src={img1} className="sub-img-detail-product"  alt="sub img"></img>
                        
                    </div>
                    <div className="main-img-product">
                        <img src={this.state.mainImage || '#'} className="main-img-detail-product" alt="main img"/>
                    </div>
                    
                </div>
                <div className="info-detail-product">
                    <div className="body-info-detail-product">
                        <div>
                            <h2 style={{color: '#af9a7d'}}>Quần tây</h2>
                        </div>
                        <div className="title-detail-item">
                            <span className="title-detail"><b>Danh mục:</b></span><span>Yame</span>
                            
                        </div>
                        <hr/>
                        
                        <div className="title-detail-item">
                            <span className="title-detail"><b>Giá:</b></span> 
                            <span style={{color: '#f5222d', fontSize: '18px'}}><b>99,000 đ</b></span>
                        </div>
                        <div className="title-detail-item">
                            <span className="title-detail"><b>Giá thị trường:</b></span><span style={{fontSize: '18px', textDecoration: 'line-through'}}>150,000<b> đ</b></span>
                        </div>
                        <div className="title-detail-item">
                            <span className="title-detail"><b>Trạng thái:</b></span><Tag color="green"><b>active</b></Tag>
                        </div>
                        <div className="title-detail-item">
                            <span className="title-detail"><b>Màu sắc:</b></span><Tag color="red"><b>red</b></Tag>
                        </div>
                        <div className="title-detail-item">
                            <span className="title-detail"><b>Số lượng:</b></span> 
                            <div style={{border: '2px solid gray', display: 'flex', fontWeight: 'bold'}}>
                                    <div className="mount-item" style={{width: '32px', borderRight: '2px solid gray'}}>
                                        <MinusOutlined></MinusOutlined>
                                        </div>
                                    <div className="mount-item" style={{width: '30px'}}>0</div>
                                    <div className="mount-item" style={{width: '32px', borderLeft: '2px solid gray'}}>
                                        <PlusOutlined></PlusOutlined>
                                    </div>
                                </div>
                        </div>
                        <div className="add-cart-detail-page">
                            <button className="add-cart-btn-detail-page" onClick={() => this.handleAddCartBtn()}>
                                Thêm giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
                <div className="info-description-detail-product">
                    <h6 style={{color: 'red'}}>Liên hệ: 84 33 697 0895 - (7:30-22:00)</h6>
                    <Alert className="alert-description-item" message="Hàng chất lượng chính hãng" type="success" showIcon />
                    <Alert className="alert-description-item" message="Kiểm tra kỹ trước khi nhận hàng" type="success" showIcon />
                    <Alert className="alert-description-item" message="30 ngày đổi trả dễ dàng" type="success" showIcon />
                    
                </div>
            </article>
        )
    }
}
