import React, { Component } from 'react';
import {Rate, Button, Tag} from 'antd';
import {Link} from 'react-router-dom';
import * as ParsePrice from '../../../helper/parsePriceForSale';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import './cartItem.css';
import emptyImage from '../../../images/empty.jpg'

class CartItem extends Component {
    //xóa
    handleClickRemoveItem(id){
        this.props.removeItem(id)
    }
    //tăng
    handleIncreasingQuantity(item){
        this.props.addQuantity(item.id)
    }
    //giảm
    handleDecreasingQuantity(item){
        //quantity === 1 thì không cho giảm
        if(item.quantity > 1){
            this.props.subQuantity(item.id)
        }
    }
    render() {
        const {item} = this.props;
        
        
        return (
            <div className="container-cart-item">
                <div style={{ padding: '10px'}}>
                    <img src={item.images[0] ? item.images[0].urlImage : emptyImage} width='100' height='100' alt="item cart"></img>
                </div>
                <div className="info-cart-item">
                    <div style={{width: '60%'}}>
                        <Link to={`/product-detail/${item.id}`}><h3>{item.name}</h3></Link>
                        <p><span>Trạng thái: <Tag color="#87d068">còn hàng</Tag></span> | <span>Danh mục: </span><b>Quần áo</b></p>
                        <Rate disabled value={item.rating || 5}></Rate>
                        
                    </div>
                    <div>
                        <strong className="price-info-cart-item">{ParsePrice.parsePriceSale(item.price,item.sale)} đ</strong>
                        <span hidden={item.sale<=0 ? true: false}><span style={{fontWeight: 'bold',textDecoration: 'line-through'}}>{ParsePrice.parsePrice(item.price)} đ</span> | <b >- {item.sale} %</b></span>
                    </div>
                    <div className="remove-inc-dec-cart-item">
                        <div className="inc-dec-cart-item" >
                            <div className="mount-item inc-dec-btn" 
                            onClick={() => this.handleDecreasingQuantity(item)}
                            style={{ width: '32px', borderRight: '2px solid gray'}}>
                                <MinusOutlined></MinusOutlined>
                            </div>
                            <div className="mount-item" style={{width: '30px'}}>
                                <span>{item.quantity}</span>
                            </div>
                            <div className="mount-item inc-dec-btn"
                            onClick={() => this.handleIncreasingQuantity(item)}
                            style={{width: '32px', borderLeft: '2px solid gray'}}>
                                <PlusOutlined></PlusOutlined>
                            </div>
                        </div>
                        <Button onClick={() => this.handleClickRemoveItem(item.id)} style={{marginLeft: '15px'}} type="primary" danger>Xóa</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartItem;