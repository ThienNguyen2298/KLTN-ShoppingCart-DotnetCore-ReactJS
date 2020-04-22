import React, { Component } from 'react';
import './totalCart.css';
import {connect} from 'react-redux';
import * as ParsePrice from '../../helper/parsePriceForSale'


class TotalCart extends Component {
    render() {
        const total = (
            <div className="container-total-cart">
                <div className="container-total">
                    <div className="price-total price-temp">
                        <strong>Tạm tính: </strong>
                        <b>{ParsePrice.parsePrice(this.props.total)} đ</b>
                        
                    </div>
                    <div className="price-total">
                        <strong>Thành tiền: </strong>
                        <b style={{fontSize: '20px', color: '#f5222d'}}>{ParsePrice.parsePrice(this.props.total)} đ</b>
                        
                    </div>
                    <div style={{padding: '15px', textAlign: 'end'}}>
                        <p>(Đã bao gồm VAT nếu có)</p> 
                    </div>
                    
                </div>
                <div>
                    <button className="book-cart-btn">
                        Tiến hành đặt hàng
                    </button>
                </div>
            </div>
        )
        return (
            <>
            {
                this.props.carts.length === 0 ? "": total
            }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        total: state.carts.total,
        carts: state.carts.carts,
    }
}
export default connect(mapStateToProps)(TotalCart);