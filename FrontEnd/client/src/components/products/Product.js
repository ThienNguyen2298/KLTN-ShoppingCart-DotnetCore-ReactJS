import React, { Component } from 'react';

import image1 from '../../images/item1.jpg';
import './product.css'

import {Link} from 'react-router-dom';
import {Rate} from 'antd';

const desc = ['Khủng khiếp', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];
function parsePrice(price){
    return (price).toLocaleString(undefined);
}
function parsePriceSale(price, sale){
    return ((price*(100-sale))/100).toLocaleString(undefined);
}
export default class Product extends Component {
    
    
    render() {
         
        const {id, name, images, realPrice, rating, sale} = this.props.product;
        
        return (
            <>
                <article className="product">
                    <div className="img-container">
                        <img src={images[0] || '#'}
                        alt="single product" height='250'/>
                        <div className="price-top">
                            <h6>-{sale}%</h6>
                            <p>sale</p>
                        </div>
                        <Link to='#' className="btn-primary product-link">
                            giỏ hàng
                        </Link>
                    </div>
                    <div className="product-info">
                        <p className="product-name"><Link to={`/product-detail/${id}`}>{name}</Link></p>
                        <p><span style={{color: '#f5222d'}}>{parsePriceSale(realPrice, sale)} <b>đ</b> </span><span style={{textDecoration: 'line-through', color: '#af9a7d'}}>{parsePrice(realPrice)} <b>đ</b> </span></p>
                        <span>
                            <Rate disabled tooltips={desc} value={rating} />
                        </span>
                    </div>
                </article>
            </>
        )
    }
}
