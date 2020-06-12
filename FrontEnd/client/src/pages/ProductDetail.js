import React, { Component } from 'react'
import BreadScrumb from '../components/BreadScrumb/BreadScrumb';
import Detail from '../components/productDetail/Detail';
import Evalution from '../components/evalution/Evaluation'
import ListEvaluation from '../components/listEvaluation/ListEvaluation';

class ProductDetail extends Component{
    
    componentDidMount(){
        //window.scrollTo(0, 0)
    }
    render(){
        return (
            <>
                <div style={{width: '75%', margin: '0 auto'}}>
                    <BreadScrumb title="Chi tiết sản phẩm"></BreadScrumb>
                    <Detail productId={this.props.match.params.productId}></Detail>
                    
                    <Evalution productId={this.props.match.params.productId}></Evalution>
                    <ListEvaluation productId={this.props.match.params.productId}></ListEvaluation>
                </div>
            </>
        )
    }
}
export default ProductDetail;
