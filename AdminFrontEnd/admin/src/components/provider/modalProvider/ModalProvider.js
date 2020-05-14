import React, { Component } from 'react';
import { Modal, Input, Button } from 'antd';


export default class ModalProvider extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const {data} = this.props;
        this.props.onSubmitForm({id: data.id, name: e.target.name.value});
    }
    handleCancel() {
        this.props.onCancel(false)
    }
    handleChangeInput(e) {
        
        this.props.onChangeInput(e)
    }
    render() {

        const { data , visible } = this.props;
        return (
            <Modal

                title={data.id ? "Cập nhập nhà cung cấp" : "Thêm nhà cung cấp"}
                visible={visible}
                
                onCancel={this.handleCancel.bind(this)}
                footer={null}
            >
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <Input allowClear size="large" type="text" name="name" onChange={(e) => this.handleChangeInput(e)}
                            value={data.name} placeholder="Tên nhà cung cấp (Cty A, ...)"
                        >
                        </Input>
                        
                        <br />
                        <br />
                        <div style={{ textAlign: 'end'}}>
                            <Button htmlType="submit" type="primary">Submit</Button>
                        </div>
                        
                    </form>
                </div>
            </Modal>
        )
    }
}
