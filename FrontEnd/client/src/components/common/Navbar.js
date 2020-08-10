import React, { Component} from 'react';
import logo from '../../images/logodoan.png';
import {FaAlignRight, FaUserAlt, FaShoppingCart, FaBell,  FaSignOutAlt} from 'react-icons/fa';
import {Link, withRouter} from 'react-router-dom';
//test.css
import "./userInfomation.css";
import ModalUI from '../AuthModal/ModalUI';
//antd
import {Input,AutoComplete, Avatar} from 'antd'
import SubNavbar from './SubNavbar';
//gọi connect
import {connect} from 'react-redux';
import {change_visible_button, logout} from '../../action/authAction';
import {update_search_key} from '../../action/productsAction';
//
import {convertNameUser} from '../../helper/convertNameUser';
import axiosInstance from '../../utils/axiosInstance';
//
import queryString from 'query-string'

import Notify from './Notify';


 class Navbar extends Component {
    constructor(props){
        super(props);
        this.state ={
            isOpen: false,
            //showModal: false,
            options: [],
            wordSearch: '',
            position: '',
            categoryId: null,
            //
            visible: false,
            notifyList: [],
        }
        //debounce search.
        this.debounceRef = React.createRef(null);
    }
    
    componentDidMount(){
        
        this.setState({
            position: window.location.pathname,
        })
        
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.position !== window.location.pathname){
            //reset search khi trở lại trang hơn - code ko đc clean :(
            if( window.location.pathname === '/' && prevState.position.includes('/search')){
                this.props.update_searchkey('');
                /*this.setState({
                    wordSearch: '',
                });*/
            }
            this.setState({
                position: window.location.pathname,
            });
        }
    }
    searchResult = async(query) => {
        const tempArray = await axiosInstance(`Product/search-products?${queryString.stringify({
            searchKey: query,
            categoryId: this.state.categoryId,
            //
            currentPage: 1,
            pageSize: 3,
        })}`, 'GET')
        .then(res => res.data.products);
        return [...tempArray].map((e) => {
            return {
                value: e.name,
                label: (
                    <Link
                    to = {{
                        pathname: "/search/",
                        search: queryString.stringify({
                            searchKey: e.name,
                            categoryId: this.state.categoryId,
                            //
                            currentPage: 1,
                            pageSize: 3,
                        }),
                        hash: "#search-product",
                        state: { fromDashboard: window.location.pathname === '/' || ''? true : false }
                      }}
                    rel="noopener noreferrer"
                  >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>
                      
                        {e.name}
                      
                    </span>
                    
                  </div></Link>
                ),
              }
        })
        
    }
    
    handleToggle = () => {
        //click nút toggle
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    handleClick = () => {
        
        
    }
    handleShowAuthModal = () =>{
        
        this.props.change_visible_btn(true);
        //this.setState({
        //    showModal: true
        //})
    }
    handleOnOKAuthModal = () => {

    }
    handleOnCancelAuthModal = () => {
        this.props.change_visible_btn(false);
    }
    handleSearch = async(value) => {
        if(this.debounceRef.current){
            clearTimeout(this.debounceRef.current)
        }
        this.debounceRef.current = setTimeout(async () => {
            
            this.setState({
                options: value ? await this.searchResult(value) : []
            })
        }, 500)
        
    }
    handleSearchRandom(e){
        this.props.update_searchkey(e.target.value)
        /*this.setState({
            wordSearch: e.target.value
        })*/
        
        
    }
    handleLogout(){
        localStorage.removeItem("access_token");
        this.props.logout();
        this.props.history.push("/");
    }
    handleViewInfoUser(){
        //console.log(window.location.pathname);
        this.props.history.push({
            pathname: `/Persional/${this.props.userId}`,
            
        })
        /*if(window.location.pathname === `/Persional/${this.props.userId}`)
        {
            window.location.reload()
        }
        else{
            this.props.history.push({
                pathname: `/Persional/${this.props.userId}`,
                
            })
            
        }*/
        
    }
    handleOnSelect(value, options){
        this.props.update_searchkey(value)
        /*this.setState({
            wordSearch: value
        })*/
        
    }
    //
    handleOpenModal(){
        this.setState({
            visible: true,
        })
    }
    render() {
        const {searchKey} = this.props;
        const {visible} = this.state;
        return (
            <>
            
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/"><img src={logo} alt="beach resort"></img></Link>
                        <button type="button" className="nav-btn" onClick={this.handleToggle}>
                            <FaAlignRight className="nav-icon"></FaAlignRight>
                        </button>
                    </div>
                    <ul className={this.state.isOpen?"nav-links show-nav":"nav-links"}>
                        <li className="li-item">
                            <div className="search-body">
                                <AutoComplete
                                dropdownMatchSelectWidth={252}
                                style={{
                                    width: "100%",
                                    outline: 'none'
                                }}
                                options={this.state.options}
                                onSearch={this.handleSearch.bind(this)}
                                value={searchKey}
                                onSelect={this.handleOnSelect.bind(this)}
                                
                                >
                                    <Input onChange={(e)=>this.handleSearchRandom(e)}  size="large" 
                                    placeholder="Nhập từ khóa tìm kiếm" allowClear/> 
                                </AutoComplete>
                            </div>
                        </li>
                        <li className="li-item">
                            <Notify></Notify>
                        </li>
                        <li className="li-item" style={{display: this.props.isAuthenticated?'none':'block'}}>
                            <Link to="#" onClick={this.handleShowAuthModal}><FaUserAlt ></FaUserAlt> Đăng nhập</Link>
                        </li>
                        {
                            this.props.isVisible ? <ModalUI visible={this.props.isVisible}
                            onOKAuthModal = {this.handleOnOKAuthModal}
                            onCancelAuthModal = {this.handleOnCancelAuthModal}
                            ></ModalUI> : ""
                        }
                        
                        <li className="right"  style={{display: this.props.isAuthenticated?'block':'none'}}>
                            <div>
                                
                                <span className="name-user">Chào {convertNameUser(this.props.nameUser) ||'Bạn'}...</span>
                                <Avatar alt="user" src={this.props.avatar ||"https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg"} />
                                
                                <div className="dropdown">
                                    <ul>
                                        <li><Link onClick={this.handleViewInfoUser.bind(this)} 
                                        to="#"><FaUserAlt style={{fontSize: '12px'}}></FaUserAlt> <span>Thông tin Cá nhân</span></Link></li>
                                        <li><Link to="#" onClick={this.handleLogout.bind(this)}>
                                            <FaSignOutAlt style={{fontSize: '12px'}}></FaSignOutAlt> <span>Đăng xuất</span>
                                            </Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="li-item">
                            <Link to="/Cart"><FaShoppingCart></FaShoppingCart> Giỏ hàng <span className="count-item">
                                {this.props.count}
                            </span></Link>
                        </li>
                    </ul>
                </div>
                <SubNavbar></SubNavbar>
            </nav>
            
           </>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        userId: state.auth.userId,
        nameUser: state.auth.nameUser,
        role: state.auth.role,
        avatar: state.auth.avatar,
        isVisible: state.auth.isVisible,
        isAuthenticated: state.auth.isAuthenticated,
        count: state.carts.count,
        searchKey: state.products.searchKey,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        change_visible_btn: (data) => {dispatch(change_visible_button(data))}, 
        logout: () => {dispatch(logout())},
        update_searchkey: (searchKey) => {dispatch(update_search_key(searchKey))}
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));