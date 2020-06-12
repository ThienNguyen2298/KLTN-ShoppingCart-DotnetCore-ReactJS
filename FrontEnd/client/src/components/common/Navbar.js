import React, { Component } from 'react';
import logo from '../../images/logodoan.png';
//import logo from '../images/logo.svg';
import {FaAlignRight, FaUserAlt, FaShoppingCart, FaBell,  FaSignOutAlt} from 'react-icons/fa';
import {Link, withRouter, Redirect} from 'react-router-dom';
//test.css
import "./userInfomation.css";
import ModalUI from '../AuthModal/ModalUI';
//antd
import {Input,AutoComplete, Avatar} from 'antd'
import SubNavbar from './SubNavbar';
//gọi connect
import {connect} from 'react-redux';
import {change_visible_button, logout} from '../../action/authAction';
//
import {convertNameUser} from '../../helper/convertNameUser';


function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
  }

const searchResult = query =>
  
  
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((item, idx) => {
      const category = `${query} ${idx}`;
      
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <Link
                to={`/product-detail/${query}`}
                
                rel="noopener noreferrer"
              >
                {category}
              </Link>
            </span>
            
          </div>
        ),
      };
    });

 class Navbar extends Component {
    state = {
        isOpen: false,
        //showModal: false,
        options: [],
        wordSearch: '',
        
        
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
        //this.setState({
        //    showModal: false,
        //  });
    }
    handleSearch = (value) => {
        this.setState({
            options: value ? searchResult(value) : []
        })
    }
    handleSearchRandom(val, e){
        if(e.target.type === 'button' && val !==''){
            this.setState({
                wordSearch: val
            })
        }
        
    }
    handleLogout(){
        localStorage.removeItem("access_token");
        this.props.logout();
        this.props.history.push("/");
    }
    handleViewInfoUser(){
        console.log(window.location.pathname);
        
        if(window.location.pathname === `/Persional/${this.props.userId}`)
        {
            window.location.reload()
        }
        else{
            this.props.history.push(`Persional/${this.props.userId}`)
        }
        
    }
    render() {
        
        return (
            <>
            {
                this.state.wordSearch ? <Redirect to={`/Persional/${this.state.wordSearch}`}></Redirect>:''
            }
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link  to="/"><img src={logo} alt="beach resort"></img></Link>
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
                                onSearch={(value)=>this.handleSearch(value)}
                                >
                                    <Input.Search value={this.state.wordSearch} onSearch={(val, e)=>this.handleSearchRandom(val, e)
                                    } style={{outline: 'none', backgroundColor: 'gray'}} size="large" 
                                    placeholder="Nhập từ khóa tìm kiếm" enterButton/>
                                </AutoComplete>
                            </div>
                        </li>
                        <li className="li-item">
                            <Link to="/Persional/1"><FaBell style={{color: 'red'}}></FaBell> Thông báo</Link>
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        change_visible_btn: (data) => {dispatch(change_visible_button(data))}, 
        logout: () => {dispatch(logout())},
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));