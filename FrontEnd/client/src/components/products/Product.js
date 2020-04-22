import React, { Component } from 'react';
import './product.css'
import * as parsePriceForSale from '../../helper/parsePriceForSale';
import {descriptionRating} from '../../helper/descriptionRating'
import {Link} from 'react-router-dom';
import {Rate} from 'antd';


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
                        <img src={product.images[0] || '#'}
                        alt="single product" height='250'/>
                        <div className="price-top">
                            <h6>-{product.sale}%</h6>
                            <p>sale</p>
                        </div>
                        <Link to='#' onClick={() => this.handleClickAddToCart(product)} className="btn-primary product-link">
                            giỏ hàng
                        </Link>
                    </div>
                    <div className="product-info">
                        <p className="product-name"><Link to={`/product-detail/${product.id}`}>{product.name}</Link></p>
                        <p><span style={{color: '#f5222d'}}>{parsePriceForSale.parsePriceSale(product.realPrice, product.sale)} <b>đ</b>
                         </span><span style={{textDecoration: 'line-through', color: '#af9a7d'}}>{parsePriceForSale.parsePrice(product.realPrice)}
                          <b>đ</b> </span></p>
                        <span>
                            <Rate disabled tooltips={descriptionRating} value={product.rating} />
                        </span>
                    </div>
                </article>
            </>
        )
    }
}
