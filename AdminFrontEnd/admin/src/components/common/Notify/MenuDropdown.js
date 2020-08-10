import React, { Component } from 'react'
import ItemDropdown from './ItemDropdown';
import {Modal, message, Empty} from 'antd';
import '../DropdownMenu/DropdownMenu.css';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import {updateReceiverId} from '../../../actions/chatAction';

class MenuDropDown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notifyList: [],
            
        }
    }
    
    
    
    componentDidMount(){
        
    }
    componentWillUnmount(){
        
    }
    
    handleCancel(){
        this.props.onCancel();
    }
    handleClickItem(value){
        this.props.changeNotifyCount(value);
        
    }
    render() {
        const {notifyList} = this.props;
        
        const notifys = (
            
            notifyList.length <= 0 ? [] : (
                notifyList.map((ele, id) => {
                    return <ItemDropdown key={id} notify={ele}
                     onClickItem={this.handleClickItem.bind(this)}>

                    </ItemDropdown>
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
            );
        }
        else {
            return <Modal visible={true} footer={null}>
                <Empty description="Không có Dữ liệu"></Empty>
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
        update_receiverId: (data) => {dispatch(updateReceiverId(data))},
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuDropDown))
