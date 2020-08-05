import React, { Component } from 'react';
import BreadScrumb from '../components/BreadScrumb/BreadScrumb';
import {Row, Col, Rate, Empty, InputNumber, Button, notification, Pagination} from 'antd';
import {ArrowRightOutlined, CheckCircleOutlined} from '@ant-design/icons';
import queryString from 'query-string';
import axiosInstance from '../utils/axiosInstance';
import {Link} from 'react-router-dom'
import Product from '../components/products/Product';
import {connect} from 'react-redux';
import {addToCart} from '../action/cartsAction';
import { fetch_search_product} from '../action/productsAction';


class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            categoryId: 0,
            categories: [],
            products: [],
            currentPage: 1,
            pageSize: 3,
            
        }
    }
    async componentDidMount(){
        //const params = new URLSearchParams(this.props.location);
        const obj = queryString.parse(this.props.location.search);
        
        this.props.searchProduct(queryString.stringify({
            searchKey: obj.searchKey,
            categoryId: obj.categoryId,
            //
            pageSize: obj.pageSize,
            currentPage: obj.currentPage,
        }));
    }
    async componentDidUpdate(prevProps, prevState){
        if(prevProps.location.search !== this.props.location.search){
            const obj = queryString.parse(this.props.location.search);
            
            
            this.props.searchProduct(queryString.stringify({
                searchKey: obj.searchKey,
                categoryId: obj.categoryId,
                //
                pageSize: obj.pageSize,
                currentPage: obj.currentPage,   
            }));
        }
    }
    handleClickRate(value){
        const {searchKey, fromPrice, toPrice, categoryId, currentPage} = this.props;
        console.log("click rate! ",value);
        this.props.searchProduct(queryString.stringify({
            searchKey: searchKey,
            rating: value,
            fromPrice: fromPrice,
            toPrice: toPrice,
            categoryId: categoryId,
            currentPage: 1,
            pageSize: 3,
        }));
        
    }
    //thêm giỏ hàng
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
    //search theo giá
    handleSearchByPrice(e){
        e.preventDefault();
        console.log(e.target.fromPrice.value, e.target.toPrice.value);
        const {searchKey, rating, categoryId, pageSize, currentPage} = this.props;
        this.props.searchProduct(queryString.stringify({
            searchKey: searchKey,
            rating: rating,
            fromPrice: e.target.fromPrice.value,
            toPrice: e.target.toPrice.value,
            categoryId: categoryId,
            pageSize: 3,
            currentPage: 1,
        }));
    }
    //
    handleChangePage(page, pageSize){
        const {searchKey, fromPrice, toPrice, rating, categoryId} = this.props;
        this.props.searchProduct(queryString.stringify({
            searchKey: searchKey,
            rating: rating,
            fromPrice: fromPrice,
            toPrice: toPrice,
            categoryId: categoryId,
            currentPage: page,
            pageSize: 3,
        }));
    }
    render() {
        const {products, categories, totalColumns, currentPage, pageSize} = this.props;
        //const {currentPage, pageSize} = this.state;
        
        const listProduct = products.length > 0 ? ( products.map(ele => {
            return <Product addToCart={this.handleAddToCart.bind(this)} key={ele.id} product={{...ele}}></Product>
        })):null;
        
        return (
            <div style={{background: '#f7f7f7', minHeight: 480 }}>
                <div style={{width: '75%', margin: '0 auto'}}>
                    <BreadScrumb title={new URLSearchParams(this.props.location.search).get('searchKey')}></BreadScrumb>
                    <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
                        <Col lg={{span: 6}}>
                            <div style={{background: '#ffffff', padding: '10px 15px', fontSize: 15}}>
                                <h5>DANH MỤC SẢN PHẨM</h5>
                                <ul style={{listStyleType: 'none'}}>
                                {
                                    categories.length === 0 ? "" : 
                                    categories.map(e => {
                                        return <li key={e.id} style={{color: 'gray', cursor: 'pointer',
                                        fontWeight: new URLSearchParams(this.props.location.search).get('searchKey').includes(e.name)
                                        ?"bold":""
                                        }}>{e.name}</li>
                                    })
                                }
                                </ul>
                                <h5>ĐÁNH GIÁ</h5>
                                <span onClick={(value) => this.handleClickRate(5)}><Rate value={5} disabled></Rate> (từ 5 sao)</span>
                                <span onClick={(value) => this.handleClickRate(4)}><Rate value={4} disabled></Rate> (từ 4 sao)</span>
                                <span onClick={(value) => this.handleClickRate(3)}><Rate value={3} disabled></Rate> (từ 3 sao)</span>
                                <form onSubmit={this.handleSearchByPrice.bind(this)}>
                                <h5>GIÁ</h5>
                                <InputNumber name="fromPrice"></InputNumber> <ArrowRightOutlined /> <InputNumber name="toPrice"></InputNumber>
                                
                                <div style={{width: 100, margin: '10px 0'}}>
                                    <Button htmlType="submit" type="primary" ghost block>OK</Button>
                                </div>
                                </form>
                                <h5>NHÀ CUNG CẤP</h5>
                            </div>
                        </Col>
                        <Col lg={{span: 18}}>
                            <div style={{background: '#ffffff', padding: 20, minHeight: 400}}>
                                {
                                    products.length ? <>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                                    gridColumnGap: '1rem', gridRowGap: '2rem'}}>
                                        {listProduct}
                                       
                                    </div>
                                    <br/>
                                     <Row>
                                        <Col span={24} style={{textAlign: 'center'}}>
                                        <Pagination
                                        defaultCurrent={1}
                                        total={totalColumns}
                                        current={currentPage}
                                        pageSize={pageSize} 
                                        onChange={this.handleChangePage.bind(this)}
                                        >

                                        </Pagination>
                                        </Col>
                                    </Row></>
                                    : <Empty></Empty>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        categories: state.products.categories,
        searchKey: state.products.searchKey,
        rating: state.products.rating,
        fromPrice: state.products.fromPrice,
        toPrice: state.products.toPrice,
        provider: state.products.provider,
        categoryId: state.products.categoryId,
        currentPage: state.products.currentPage,
        pageSize: state.products.pageSize,
        totalColumns: state.products.totalColumns,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (item) => {dispatch(addToCart(item))},
        searchProduct: (query) => {dispatch(fetch_search_product(query))}
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Search);