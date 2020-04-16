import React, { Component } from 'react';
import img1 from '../../images/item1.jpg';
import img2 from '../../images/banner/empty_banner.jpg';
import './detail.css';

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
                <div className="info-detail-product" style={{border: '1px solid red', width: '55%'}}>
                    <div className="body-info-detail-product" style={{border: '1px solid green'}}>
                        <h3>Quần tây</h3>
                        <span>Thương hiệu: Yame</span>
                        <hr/>
                        <h4>Giá: 100,000 <b>đ</b></h4>
                        <h4>Giá thị trường: 150,000 <b>đ</b></h4>
                        <h5>Màu: Trắng</h5>
                        <h5>Số lượng: </h5>
                    </div>
                </div>
            </article>
        )
    }
}
