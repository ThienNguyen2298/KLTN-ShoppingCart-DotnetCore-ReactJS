import React, { Component } from 'react';
import './totalCart.css';
import { connect } from 'react-redux';
import * as ParsePrice from '../../helper/parsePriceForSale';
import ModalCheckout from '../listCart/modalCheckout/ModalCheckout';
import axios from 'axios';
import {handle_checkout_cart} from '../../action/cartsAction';


class TotalCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibleModal: false,
            
            
        }
    }
    componentDidMount(){
        axios({url: 'https://dc.tintoc.net/app/api-customer/public/provinces/?size=64', method:'GET'})
        .then(res => console.log(res.data)
        )
    }
    handleCheckout(){
        this.setState({
            visibleModal: true,
        })
    }
    handleCancelModalCheckout(){
        this.setState({
            visibleModal: false,
        })
    }
    handleCreateOrder = (order) => {
        this.props.create_order(order);
    }
    render() {
        
        
        
        return (
            <>
                <div className="container-total-cart">
                    <div className="container-total">
                        <div className="price-total price-temp">
                            <strong>Tạm tính: </strong>
                            <b>{ParsePrice.parsePrice(this.props.total)} đ</b>

                        </div>
                        <div className="price-total">
                            <strong>Thành tiền: </strong>
                            <b style={{ fontSize: '20px', color: '#f5222d' }}>{ParsePrice.parsePrice(this.props.total)} đ</b>

                        </div>
                        <div style={{ padding: '15px', textAlign: 'end' }}>
                            <p>(Đã bao gồm VAT nếu có)</p>
                        </div>

                    </div>
                    <div>
                        <button className="book-cart-btn" onClick={this.handleCheckout.bind(this)}>
                            Tiến hành đặt hàng
                        </button>
                    </div>
                    {
                        this.state.visibleModal ? <ModalCheckout 
                        
                        onCreateOrder={this.handleCreateOrder.bind(this)}
                        total={this.props.total} userId={this.props.userId}
                        onCancel={this.handleCancelModalCheckout.bind(this)} 
                        visible={this.state.visibleModal}>

                        </ModalCheckout>:""
                    }
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        total: state.carts.total,
        carts: state.carts.carts,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        create_order: (order) => {dispatch(handle_checkout_cart(order))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalCart);