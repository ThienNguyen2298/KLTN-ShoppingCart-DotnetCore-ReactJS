import React, { Component } from 'react';
import './styleCommon/Header.css';
import {BarsOutlined, DownOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';
import { Menu, Dropdown,Avatar, message } from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/authAction'
import NotifyMenu from './NotifyMenu/NotifyMenu';



class Header extends Component {
    
    
    handleLogoutClick(history){
        //window.location = "/"
        localStorage.removeItem("access_token")
        //console.log(this.props.history.push("/"));
        //window.location = "/"
        this.props.logout();
        this.props.history.push("/")
    }
    
    render() {
        const {history} = this.props;
        
        
        const menu = (
            <Menu>
              <Menu.Item>
                <Link rel="noopener noreferrer" to="#">
                <UserOutlined /> Thông tin admin
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link onClick={() => this.handleLogoutClick(history)} to="#">
                <LogoutOutlined /> Logout
                </Link>
              </Menu.Item>
             
            </Menu>)
        return (
            <div className="top_navbar">
                
                <div className="logo"><span>Online Shop</span></div>
                <div className="menu">
                    <div className="hamburger">
                        <BarsOutlined />
                    </div>
                    <div style={{display: 'flex'}}>
                    <div>
                        <NotifyMenu></NotifyMenu>
                    </div>
                    <div className="profile_wrap">
                        
                        <div className="profile">
                        <Dropdown overlay={menu}>
                            <Link className="ant-dropdown-link" to="#" onClick={e => e.preventDefault()}>
                                <Avatar size="small" src={this.props.avatar || "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg"} /> 
                                <span className="name">{this.props.name || "hihi"}</span> <DownOutlined style={{color: 'white'}}/>
                            </Link>
                        </Dropdown>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        name: state.auth.nameUser,
        avatar: state.auth.avatar
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        logout: () => {dispatch(logout())}
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));