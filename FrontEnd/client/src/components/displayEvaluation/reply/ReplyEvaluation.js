import React, { Component } from 'react';
import './reply.css';
import {Input, Button,message} from 'antd';
import DisplayReply from '../displayReply/DisplayReply';
import {connect} from 'react-redux';
import {handle_create_feedback} from '../../../action/evaluationsAction';

const {TextArea} = Input;
class ReplyEvaluation extends Component {
    handleSubmitFeedback(e){
        e.preventDefault();
        if (e.target.content.value.trim() === '') {
            message.warning('Vui lòng không để trống nội dung phản hồi!', 2);
        }
        else {
            if(this.props.userId === ''){
                message.warning('Vui lòng đăng nhập tài khoản để phản hồi đánh giá này!', 3);
                //e.target.content.value = '';
                //e.target.title.value = '';
            }
            else{
                //clear
                let reply = {
                    
                    content: e.target.content.value,
                    userId: this.props.userId,
                    evaluationId: this.props.evaluation.id,
                }
                e.target.content.value = '';
                this.props.create_reply(reply);
                
                
            }
            
        }
    }
    render() {
        const {evaluation} = this.props;
        console.log("cờ show trong reply: ", this.props.showReply)
        console.log("evaluation trong reply: ", evaluation)
        return (
            <div className={this.props.showReply?"show-reply":"reply"}>
                {
                    evaluation ? evaluation.replies.map((ele) => {
                        return <DisplayReply key={ele.id} reply={ele}></DisplayReply>
                    }):""
                }
                
                
                <div>
                    <form onSubmit={this.handleSubmitFeedback.bind(this)}>
                        <TextArea name="content" style={{margin: '10px 0'}} autoSize={{ minRows: 3, maxRows: 5 }}></TextArea>
                        <Button htmlType="submit" style={{background: '#1890ff', border: '1px solid #1890ff', color: 'white'}}>Phản hồi</Button>
                    </form> 
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        
        userId: state.auth.userId,
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        create_reply: (fb) => {dispatch(handle_create_feedback(fb))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReplyEvaluation);