import React, { Component } from 'react';
import ListCart from '../components/listCart/ListCart';
import BreadScrumb from '../components/BreadScrumb/BreadScrumb';
import TotalCart from '../components/listCart/TotalCart';
import { Empty } from 'antd';
import EmptyCart from '../images/empty-cart.png';
import {connect} from 'react-redux';

class Cart extends Component {
    state ={
        carts: []
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    render() {
        const {carts} = this.props;
    
       
        if(carts.length === 0)
        {
            return (
                <div style={{background: '#f7f7f7'}}>
                    <div style={{maxWidth: '75%', margin: '0 auto'}}>
                        <BreadScrumb title="Giỏ hàng"></BreadScrumb>
                    </div>
                    <Empty  description={false} image={EmptyCart} 
                    imageStyle={{height: 400}}>

                        </Empty>
                </div>
                
            )
        }
        else{
            return (
                <div style={{background: '#f7f7f7', minHeight: 450}}>
                    <div style={{maxWidth: '75%', margin: '0 auto'}}>
                        <BreadScrumb title="Giỏ hàng"></BreadScrumb>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '75%', margin: '0 auto'}}>
                        <ListCart carts={carts}></ListCart>
                        <TotalCart></TotalCart>
                    </div>
                </div>
            )
        }
        
    }
}
const mapStateToProps = (state) =>{
    return {
        carts: state.carts.carts
    }
}
export default connect(mapStateToProps, null)(Cart);