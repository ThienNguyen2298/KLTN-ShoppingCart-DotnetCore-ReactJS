import React, { Component } from 'react';
import './product.css'
import * as parsePriceForSale from '../../helper/parsePriceForSale';
import {descriptionRating} from '../../helper/descriptionRating'
import {Link} from 'react-router-dom';
import {Rate, Button} from 'antd';
import empty from '../../images/empty.jpg'


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
                        alt="single product" height='200' width="auto"/>
                        <div className="price-top">
                            <h6>{product.sale}%</h6>
                            <p>sale</p>
                        </div>
                        <div onClick={() => this.handleClickAddToCart(product)} className="btn-primary product-link">
                            giỏ hàng
                        </div>
                    </div>
                    <div className="product-info">
                        <p className="product-name"><Link to={`/product-detail/${product.id}`}>{product.name}</Link></p>
                        <p><span style={{color: '#f5222d', marginRight: '10px'}}>{parsePriceForSale.parsePriceSale(product.price, product.sale) || 0} <b>đ</b>
                         </span><span style={{textDecoration: 'line-through', color: '#af9a7d'}}>{parsePriceForSale.parsePrice(product.price) || 0}
                          <b>đ</b> </span></p>
                        <div style={{fontSize: '12px'}}>{product.provider.name || ""}</div>
                        <span>
                            <Rate disabled tooltips={descriptionRating} value={product.rating || 5} />
                        </span>
                    </div>
                </article>
            </>
        )
    }
}
