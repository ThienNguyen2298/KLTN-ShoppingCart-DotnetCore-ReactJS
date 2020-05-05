import React, { Component } from 'react';
import {Modal} from 'antd';

export default class ModalCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            name: '',
            generalityName: '',
            visible: false
        }
    }
    componentDidMount(){
        const {data, visible} = this.props;
        this.setState({
            id: data ? data.id : 0,
            name: data ? data.name: '',
            generalityName: data ? data.generalityName: '',
            visible: visible,
        })
    }
    handleOk(){
        this.props.onOk(false)
    }
    handleCancel(){
        this.props.onCancel(false)
    }
    handleChangeInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
       
        const{id, name, generalityName, visible} = this.state;
        return (
            <Modal
                
                title={id ? "Cập nhập sản phẩm":"Thêm sản phẩm"}
                visible={visible}
                onOk={this.handleOk.bind(this)}      
                onCancel={this.handleCancel.bind(this)}
                >
                <div>
                    <input type="text" name="id" onChange={(e) => this.handleChangeInput(e)} value={id}></input>
                    <input type="text" name="name" onChange={(e) => this.handleChangeInput(e)} value={name}></input>
                    <input type="text" name="generalityName" onChange={(e) => this.handleChangeInput(e)} value={generalityName}></input>
                </div>
            </Modal>
        )
    }
}
