import React, { Component } from 'react';
import ListCart from '../components/listCart/ListCart';
import BreadScrumb from '../components/BreadScrumb/BreadScrumb';
import TotalCart from '../components/listCart/TotalCart';

export default class Cart extends Component {
    state ={
        carts: []
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    render() {
        const {carts} = this.state;
    
       
        
        return (
            <div>
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
