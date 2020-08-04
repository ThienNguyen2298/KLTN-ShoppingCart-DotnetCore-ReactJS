import React, { Component } from 'react';
import {Dropdown, Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {BarsOutlined, EnvironmentOutlined, MergeCellsOutlined, SkinOutlined} from '@ant-design/icons';
import axiosInstance from '../../utils/axiosInstance';
import queryString from 'query-string';
import {connect} from 'react-redux';


const { SubMenu } = Menu;

class SubNavbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
    }
  }
  async componentDidMount(){
    const data = await axiosInstance('Category/getAllCategory', 'GET').then(res => res.data);
    this.setState({
      categories: data,
    })
    
  }
  handleClickCategory(item){
    
    this.props.history.push({
      pathname: "/search/",
      search: queryString.stringify({
        searchKey: this.props.searchKey,
        categoryId: item.key,
        //
        currentPage: 1,
        pageSize: 3,
    }),
      hash: "#search-product",
      state: { fromDashboard: window.location.pathname === '/' || ''? true : false }
    })
    
  }
    render() {
        const {categories} = this.state;
        //custom menu
        const menu = (
            <Menu style={{ width: 220, background: '#ebebeb' }} onClick={this.handleClickCategory.bind(this)} mode="vertical">
              {
                categories.map((ele, index) => {
                   return <Menu.Item key={ele.id}>{ele.name}</Menu.Item>
                })
              }
            
              
          </Menu>
          );
        if(categories){
          return (
            
            <div style={{paddingTop: 5,  maxWidth: '75%', margin: '0 auto', display: 'flex', justifyContent: 'space-between'}}>
                    <Dropdown overlay={menu}>
                        <Link className="ant-dropdown-link" to="#" >
                            <h5 style={{color: '#af9a7d'}}><BarsOutlined style={{color: 'black'}}></BarsOutlined>&nbsp;DANH MỤC SẢN PHẨM</h5>
                        </Link>
                    </Dropdown>
                    <h5 style={{color: '#af9a7d'}}><EnvironmentOutlined style={{color: 'red'}}/> Vận chuyển</h5>
                    <h5 style={{color: '#af9a7d'}}><MergeCellsOutlined style={{color: 'green'}}/> 30 ngày đổi trả dễ dàng</h5>
                    <h5 style={{color: '#af9a7d'}}><SkinOutlined style={{color: '#13c2c2'}}/> Sản phẩm chính hãng</h5>
            </div>
        
    )
        }
        else{
          return null;
        }
        
    }
}
const mapStateToProps = (state) => {
  return {
      searchKey: state.products.searchKey,
      rating: state.products.rating,
      fromPrice: state.products.fromPrice,
      toPrice: state.products.toPrice,
      provider: state.products.provider,
  }
}
export default withRouter(connect(mapStateToProps,null)(SubNavbar));