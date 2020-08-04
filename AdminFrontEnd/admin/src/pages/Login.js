import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import './stylePage/login.css';
import {connect} from 'react-redux';
import {fetch_auth} from '../actions/authAction';
import {Spin} from 'antd'

class Login extends Component {
    
    handleSubmit(e){
        e.preventDefault();
        //console.log(e.target.username.value);
        
        this.props.login({username: e.target.username.value, password: e.target.password.value});
    }
    haveRedirect() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated === true) {
           
           return <Redirect to="/admin"></Redirect>
        }
    }
    
    render() {
        
        const {isLoading} = this.props; 
        if(isLoading)
            return (<Spin size="large" tip="LOADING"></Spin>)
        return (
            <div className="wrapper">
                {
                    this.haveRedirect()
                }
                <h1>ĐĂNG NHẬP</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" placeholder="ID" name="username"></input>
                    <input type="password" placeholder="Mật khẩu" name="password"></input>
                    <button type="submit">ENTER</button>
                </form>
                <div className="bottom-text">
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        isAuthenticated: state.auth.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {dispatch(fetch_auth(data))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);