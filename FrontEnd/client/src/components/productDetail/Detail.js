import React, { Component } from 'react';
import img1 from '../../images/item1.jpg';
import img2 from '../../images/banner/empty_banner.jpg';
import './detail.css';
import {Tag, notification} from 'antd';
import {PlusOutlined, MinusOutlined, CheckCircleOutlined} from '@ant-design/icons';


export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            countItem: 1,
            mainImage: img1
        }
        
    }
    handleClickSubImage(e){
        console.log(e.target.src);
        this.setState({
            mainImage: e.target.src
        })
    }
    handleAddCartBtn(){
        notification.open({
            message: 'Thêm giỏ hàng thành công!',
            duration: 3,
            icon: <CheckCircleOutlined style={{ color: '#5cb85c' }} />,
        })
    }
    handleDecreasingBtn(){
        const tempCountItem = this.state.countItem;
        if(tempCountItem >= 2){
            this.setState({
                countItem: tempCountItem - 1,
            })
        }
    }
    handleIncreasingBtn(){
        const tempCountItem = this.state.countItem;
        this.setState({
            countItem: tempCountItem + 1,
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
                                    <div className="mount-item"  onClick={() => this.handleDecreasingBtn()}
                                    style={{width: '32px', borderRight: '2px solid gray'}}>
                                        <MinusOutlined></MinusOutlined>
                                        </div>
                                    <div className="mount-item" style={{width: '30px'}}><span>{this.state.countItem}</span></div>
                                    <div className="mount-item" onClick={() => this.handleIncreasingBtn()}
                                    style={{width: '32px', borderLeft: '2px solid gray'}}>
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
                
            </article>
        )
    }
}
