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
            itemCount: 5,
            isLoadingTopViewProduct: true,
            isLoadingMainProduct: true,
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        axiosInstance('Product/products-top-view-count/false')
        .then(res => {
            this.setState({
                topViewProducts: [...res.data],
                isLoadingTopViewProduct: false,
            })
        })
        .catch(err => console.log(err + ''));
        axiosInstance(`Product/get-all-products/${this.state.itemCount}`)
        .then(res => {
            this.setState({
                mainProducts: [...res.data],
                isLoadingMainProduct: false,
            })
        })
        .catch(err => console.log(err + ''))
        
    }
    handleClickViewMore(value){
        this.setState({
            
            isLoadingTopViewProduct: true,
        })
        axiosInstance('Product/products-top-view-count/true')
        .then(res => {
            this.setState({
                topViewProducts: [...res.data],
                isLoadingTopViewProduct: false,
            })
        })
        .catch(err => console.log(err + ''))
    }
    handleClickViewMoreForMainProduct(value){
        this.setState({
            
            isLoadingMainProduct: true,
        })
        axiosInstance(`Product/get-all-products/${this.state.itemCount + 5}`)
        .then(res => {
            this.setState({
                mainProducts: [...res.data],
                isLoadingMainProduct: false,
            })
        })
        .catch(err => console.log(err + ''))
    }
    //{/*style={{background: '#ebebeb'}}*/}
    render(){
        return (
            
            <div>
                <Banner></Banner>
                
                <ListProducts title="NHỮNG SẢN PHẨM XEM NHIỀU" onClickViewMore={this.handleClickViewMore.bind(this)} loading={this.state.isLoadingTopViewProduct} products={this.state.topViewProducts}></ListProducts>
                
                <ListProducts title="NHỮNG SẢN PHẨM KHÁC" onClickViewMore={this.handleClickViewMoreForMainProduct.bind(this)} loading={this.state.isLoadingMainProduct} products={this.state.mainProducts}></ListProducts>
                <br></br>
            </div>
        )
    }
    
}
export default Home;
