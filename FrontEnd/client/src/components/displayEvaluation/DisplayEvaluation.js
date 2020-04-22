import React, { Component } from 'react';
import { Avatar, Rate, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ReplyEvaluation from './reply/ReplyEvaluation';


const desc = ['Khủng khiếp', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];
export default class DisplayEvaluation extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeReply: false
        }
    }
    handleClickActiveReply(){
        this.setState({
            activeReply: !this.state.activeReply
        })
    }
    render() {
        return (
            <div style={{border: '1px solid rgb(223, 224, 224)', display: 'flex', padding: '20px 10px'}}>
                <div style={{textAlign: 'center', width: '25%', padding: '10px'}}>
                    <Avatar size={64} src={this.props.avatar} icon={<UserOutlined />} />
                    <h6>{this.props.fullname || "User"}</h6>
                    <p>Khoảng 1 tháng trước</p>
                </div>
                <div style={{ width: '75%', padding: '10px'}}>
                    <Rate disabled tooltips={desc} value={this.props.star}></Rate> <b>Hàng Ok nha shop</b>
                    <p>
                        {
                            this.props.evaluation || ""
                        }
                    </p>
                    <span onClick={() => this.handleClickActiveReply()} style={{color: '#1890ff', cursor: 'pointer'}}>Trả lời</span> <span> (1 trả lời)</span>
                    {(this.state.activeReply ? <ReplyEvaluation></ReplyEvaluation> :"")}
                </div>
            </div>
        )
    }
}
DisplayEvaluation.propTypes={
    avatar: PropTypes.string,
    fullname: PropTypes.string,
    star:PropTypes.number,
    evaluation: PropTypes.string.isRequired,
}
