import React, { Component } from 'react'
import Product from './Product';
import './listProducts.css';
import {connect} from 'react-redux';
import { addToCart} from '../../action/cartsAction';
import {notification} from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons';


//data


class ListProducts extends Component {
    handleAddToCart(item){
        //console.log(item);
        notification.open({
            message: 'Thêm giỏ hàng thành công!',
            duration: 1,
            icon: <CheckCircleOutlined style={{ color: '#5cb85c' }} />,
            placement: 'topLeft'
        })
        this.props.addToCart(item);
    }
    render() {
        
        return (
            <div className="listProduct">
                {
                    this.props.products.map((ele) => {
                        return <Product key={ele.id} addToCart={this.handleAddToCart.bind(this)} product={{...ele}}></Product>
                    })
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.items
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {dispatch(addToCart(item))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListProducts);
