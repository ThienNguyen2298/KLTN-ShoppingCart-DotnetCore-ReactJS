import React, { Component } from 'react'
import Banner from '../components/banner/Banner';


import axiosInstance from '../utils/axiosInstance';
import ListProducts from '../components/products/ListProducts';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            topViewProducts: [],
            mainProducts: [],
            itemCount: 8,
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        axiosInstance('Product/products-top-view-count/false')
        .then(res => this.setState({
            topViewProducts: [...res.data],
        }))
        .catch(err => console.log(err + ''));
        axiosInstance(`Product/get-all-products/${this.state.itemCount}`)
        .then(res => this.setState({
            mainProducts: [...res.data],
        }))
        .catch(err => console.log(err + ''))
    }
    //{/*style={{background: '#ebebeb'}}*/}
    render(){
        return (
            
            <div>
                <Banner></Banner>
                
                <ListProducts title="NHỮNG SẢN PHẨM XEM NHIỀU" products={this.state.topViewProducts}></ListProducts>
                
                <ListProducts title="NHỮNG SẢN PHẨM" products={this.state.mainProducts}></ListProducts>
                <br></br>
            </div>
        )
    }
    
}
export default Home;
