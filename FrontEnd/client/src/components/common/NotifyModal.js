import React, { Component } from 'react';
import './Notify.css';
import {Modal, Empty} from 'antd';
import NotifyItem from './NotifyItem';
import {connect} from 'react-redux';
import {open_maximize} from '../../action/chatAction'

class NotifyModal extends Component {
    
    handleCancel(){
        this.props.onCancel();
    }
    handleClickItem(value){
        this.props.onCount(0);
        this.props.open_maximize(value);
    }
    render() {
        const {notifyList} = this.props;
        //
        const notifys = (
            
            notifyList.length <= 0 ? [] : (
                notifyList.map((ele, id) => {
                    return <NotifyItem key={id} notify={ele}
                     onClickItem={this.handleClickItem.bind(this)}>

                    </NotifyItem>
                })
            )
            
        )
        if(notifys.length > 0){
            return (
                <Modal
                title={"THÔNG BÁO"}
                        showHeader={false}
                        mask={false}
                        width={400}
                        visible={this.props.visible}
                        
                        onCancel={this.handleCancel.bind(this)}
                        footer={null}
                    >
                    <div className="dropdown">
                    {
                        notifys
                    }
                    </div>
                </Modal>
                
            )
        }
        else {
            return <Modal visible={true} onCancel={this.handleCancel.bind(this)} footer={null}>
                <Empty description="Không có Thông báo"></Empty>
            </Modal>
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        open_maximize: (data) => {dispatch(open_maximize(data))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotifyModal)