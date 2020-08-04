import React, { Component } from 'react'
import Product from './Product';
import './listProducts.css';
import {connect} from 'react-redux';
import { addToCart} from '../../action/cartsAction';
import {notification, Button, Skeleton, Pagination} from 'antd';
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
        this.props.addToCart({...item, quantity: 1});
    }
    handleClickViewMore(){
        this.props.onClickViewMore(true)
    }
    //
    handleChangePage(page, pageSize){
        this.props.onChangePage(page, pageSize);
    }
    render() {
        const {products, loading, isViewMore, pageCurrent, pageSize, totalPage
        } = this.props;
        
        return (<>
            <h4 style={{maxWidth: '75%', margin: '20px auto'}}>{this.props.title}</h4>
            
            <div className="listProduct">
                {
                    <Skeleton style={{ width: '100%', border: '1px solid red'}} loading={loading} active>{
                        products.map((ele) => {
                            return <Product key={ele.id} addToCart={this.handleAddToCart.bind(this)} product={{...ele}}></Product>
                        }) }
                    </Skeleton>
                }
            </div>
                <br></br>
                <div style={{textAlign: 'center'}}>
                    {
                        isViewMore ? 
                        <Pagination current={pageCurrent} 
                        pageSize={pageSize} 
                        total={totalPage}
                        onChange={this.handleChangePage.bind(this)}
                        ></Pagination>
                        :
                        <Button disabled={loading} onClick={this.handleClickViewMore.bind(this)}>Xem thêm</Button>
                    }
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
