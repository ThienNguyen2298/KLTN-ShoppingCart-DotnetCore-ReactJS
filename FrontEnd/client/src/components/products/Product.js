import React, { Component } from 'react';
import './product.css'
import * as parsePriceForSale from '../../helper/parsePriceForSale';
import {descriptionRating} from '../../helper/descriptionRating'
import {Link} from 'react-router-dom';
import {Rate, Button, Tag} from 'antd';
import empty from '../../images/empty.jpg';
import {EyeOutlined} from '@ant-design/icons';

const displayBlock = {
    display: 'block',
}
const displayNone = {
    display: 'none',
}
const displayPriceSale = {
    display: 'inline-block',
    fontSize: 12, 
    textDecoration: 'line-through', 
    color: '#af9a7d'
}

export default class Product extends Component {
    
    handleClickAddToCart(product){
        this.props.addToCart(product);
    }
    render() {
         
        const {product} = this.props;
        
        return (
            <>
                <article className="product">
                    <div className="img-container">
                        <img src={product.images[0] ? product.images[0].urlImage : empty}
                        alt="single product" height='240' width="auto"/>
                        <div className="price-top" style={product.sale === 0 ? displayNone : displayBlock}>
                            <h6>{product.sale}%</h6>
                            <p>sale</p>
                        </div>
                        <div onClick={() => this.handleClickAddToCart(product)} className="btn-primary product-link">
                            giỏ hàng
                        </div>
                    </div>
                    <div className="product-info">
                        <span>
                            <Rate style={{fontSize: 16}} disabled tooltips={descriptionRating} value={product.rating || 5} />
                            { product.viewCount >= 10 ? <>
                            <EyeOutlined style={{marginLeft: 10}} title="Lượt xem"/> (<b>{product.viewCount}</b>)</>
                            : <Tag style={{marginLeft: 10}} color="#389e0d">new</Tag>
                        }
                        </span>
                        <p className="product-name"><Link to={`/product-detail/${product.id}`}>{product.name}</Link></p>
                        <div style={{fontSize: '12px'}}>{product.provider.name || ""}</div>
                        <p>
                            <span style={product.sale === 0 ? displayNone : displayPriceSale}>
                            {parsePriceForSale.parsePrice(product.price) || 0}
                            <b>đ</b> 
                            </span>
                            <span style={{color: '#f5222d', marginLeft: '10px'}}>
                            {parsePriceForSale.parsePriceSale(product.price, product.sale) || 0} <b>đ</b>
                         </span>
                         
                          </p>
                        
                        
                    </div>
                </article>
            </>
        )
    }
}
