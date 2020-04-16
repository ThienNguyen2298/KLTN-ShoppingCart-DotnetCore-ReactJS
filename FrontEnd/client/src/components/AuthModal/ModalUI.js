import React, { Component } from 'react';
import {Modal , Tabs} from 'antd';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
const {TabPane} = Tabs;


export default class ModalUI extends Component {
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
                            <SignIn onSignInNowClick={this.callback}></SignIn>
                        </TabPane>
                        <TabPane tab="ĐĂNG KÝ" key="2">
                            <SignUp></SignUp>
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
