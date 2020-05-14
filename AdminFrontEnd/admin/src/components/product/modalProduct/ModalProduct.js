import React, { Component } from 'react';
import { Modal } from 'antd';

export default class ModalProduct extends Component {


    handleOk() {
        this.props.onOk(false)
    }
    handleCancel() {
        this.props.onCancel(false)
    }
    render() {
        const { data, visible } = this.props;
        
        return (
            <Modal
                width={800}
                title={data.id ? "Cập nhập sản phẩm" : "Thêm sản phẩm"}
                visible={visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <div>
                    <div>
                        Modal
                    </div>
                </div>
            </Modal>
        )
    }
}
