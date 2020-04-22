import React, { Component } from 'react';
import logo from '../../images/logodoan.png';
//import logo from '../images/logo.svg';
import {FaAlignRight, FaUserAlt, FaShoppingCart, FaBell, FaAngleDown, FaSignOutAlt} from 'react-icons/fa';
import {Link, Redirect} from 'react-router-dom';
//test.css
import "./userInfomation.css";
import ModalUI from '../AuthModal/ModalUI';
//antd
import {Input,AutoComplete} from 'antd'
import SubNavbar from './SubNavbar';
//gọi connect
import {connect} from 'react-redux';


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
        showModal: false,
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
        
        
        this.setState({
            showModal: true
        })
    }
    handleOnOKAuthModal = () => {

    }
    handleOnCancelAuthModal = () => {
        this.setState({
            showModal: false,
          });
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
                        <li>
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
                        <li>
                            <Link to="/Persional/1"><FaBell style={{color: 'red'}}></FaBell> Thông báo</Link>
                        </li>
                        <li>
                            <Link to="#" onClick={this.handleShowAuthModal}><FaUserAlt ></FaUserAlt> Đăng nhập</Link>
                        </li>
                        <ModalUI visible={this.state.showModal}
                        onOKAuthModal = {this.handleOnOKAuthModal}
                        onCancelAuthModal = {this.handleOnCancelAuthModal}
                        ></ModalUI>
                        <li className="right"  style={{border: '1px solid red', display: 'none'}}>
                            <div>
                                
                                <span className="name-user">Hữu Thiện<p>User</p></span>
                                <img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg" alt="user" width="30"></img>
                                <FaAngleDown></FaAngleDown>
                                <div className="dropdown">
                                    <ul>
                                        <li><Link to="/hihi"><FaUserAlt></FaUserAlt> <small>Cá nhân</small></Link></li>
                                        <li><Link to="#"><FaSignOutAlt></FaSignOutAlt> <small>Đăng xuất</small></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
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
        count: state.carts.count,
    }
}
export default connect(mapStateToProps,null)(Navbar);