import React, { Component } from 'react'
import Product from './Product';
import './listProducts.css';
import {connect} from 'react-redux';
import { addToCart} from '../../action/cartsAction';
import {notification, Button} from 'antd';
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
        
        return (<>
            <h3 style={{maxWidth: '1100px', margin: '20px auto'}}>{this.props.title}</h3>
            <div className="listProduct">
                
                {
                    this.props.products.map((ele) => {
                        return <Product key={ele.id} addToCart={this.handleAddToCart.bind(this)} product={{...ele}}></Product>
                    })
                }
            </div>
            <br></br>
            <div style={{textAlign: 'center'}}>
                <Button>View More</Button>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {dispatch(addToCart(item))}
    }
}
export default connect(null,mapDispatchToProps)(ListProducts);
