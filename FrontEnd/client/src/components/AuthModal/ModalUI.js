import React, { Component } from 'react';
import {Modal , Tabs} from 'antd';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import {connect} from 'react-redux';
import {fetch_register, fetch_login} from '../../action/authAction';


const {TabPane} = Tabs;

class ModalUI extends Component {
    constructor(){
        super();
        this.state = {
            active: "1",
            
        }
        this.callback  = this.callback.bind(this)
        
    }
    onOk(){
        this.props.onOKAuthModal()
    }
    onCancel(){
        this.props.onCancelAuthModal()
    }
    
    callback(key){
        this.setState({
            active: key
        })
    }
    handleRegisterSuccess(value){
        if(value){
            this.setState({
                active: "1"
            })
        }
        else{
            this.setState({
                active: "2"
            })
        }
    }
    handleSignUp(values) {
        this.props.register(values);
        
    }
    handleSignIn(values){
        this.props.login(values);
    }
    render() {
        const {visible, onOKAuthModal, onCancelAuthModal} = this.props;
        return (
            <div>
                
                <Modal
                visible={visible}
                footer={false}
               
                
                onOk={onOKAuthModal}
                onCancel={onCancelAuthModal}
                >
                    <Tabs activeKey={this.state.active} onChange={this.callback}>
                        <TabPane tab="ĐĂNG NHẬP" key="1">
                            {
                                this.state.active === "1"?<SignIn onSignIn={this.handleSignIn.bind(this)}
                                onSignInNowClick={this.callback}></SignIn>:""
                            }
                            
                        </TabPane>
                        <TabPane tab="ĐĂNG KÝ" key="2">
                            {
                                this.state.active === "2"?<SignUp onSignUp={this.handleSignUp.bind(this)}></SignUp>:""
                            }
                            
                        </TabPane>
                        <TabPane tab="" key="3">
                            Quên Mật khẩu
                        </TabPane>
                    </Tabs>
                </Modal>
                
          </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        registerSuccess: state.auth.registerSuccess,
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        register: (data) => {dispatch(fetch_register(data))},
        login: (data) => {dispatch(fetch_login(data))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalUI);