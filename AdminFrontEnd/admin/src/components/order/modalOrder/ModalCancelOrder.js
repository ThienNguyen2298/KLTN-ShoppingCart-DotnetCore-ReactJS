import React, { Component } from 'react';
import {Modal, Input} from 'antd';

const {TextArea} = Input;

export default class ModalCancelOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            note: null,
        }
    }
    handleChangeNote(e){
        this.setState({
            note: e.target.value
        })
    }
    handleCancel(){
        this.props.onCancel();
    }
    handleSubmit(){
        const {note} = this.state;
        const {orderId} = this.props;
        this.props.onOk(note, orderId);
    }
    render() {
        const {visible, orderId} = this.props;
        const {note} = this.state;
        return (
            <Modal
            title={<strong>HỦY ĐƠN HÀNG</strong>}
            width={600}
            onCancel={this.handleCancel.bind(this)}
            onOk={this.handleSubmit.bind(this)}
            visible={visible}>
                    <label><strong>Nguyên nhân:</strong> </label>
                    <TextArea rows={3}
                     onChange={this.handleChangeNote.bind(this)} value={note}>

                     </TextArea>
            </Modal>
        )
    }
}
