import React, { Component, Fragment } from 'react';
import { Avatar, Rate, } from 'antd';
import { UserOutlined , CheckCircleOutlined} from '@ant-design/icons';
import ReplyEvaluation from './reply/ReplyEvaluation';
import Moment from 'react-moment';
import 'moment/locale/vi';



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
        const {item} = this.props;
        console.log("evaluation: ",item)
        
        return (
            <div className={item.isOwn ? "opacity-50": ""} style={{border: '1px solid rgb(223, 224, 224)', 
            display: 'flex', margin: '10px 0', padding: '20px 10px',
             borderRadius: '5px'}}>
                <div style={{textAlign: 'center', width: '25%', padding: '5px'}}>
                    <Avatar size={64} src={item.user.avatar} icon={<UserOutlined />} />
                    <h6>{item.user.displayname || "User"} {item.user.displayname === 'Admin'? (<CheckCircleOutlined style={{color: 'green'}}/>): ""}</h6>
                    <p><Moment locale="vi" interval={30000} fromNow>{item.createDate}</Moment></p>
                </div>
                <div style={{ width: '75%', padding: '10px', }}>
                    <Rate disabled tooltips={desc} value={item.rating}></Rate> <strong style={{color: 'green'}}>{item.title}</strong>
                    
                    <p style={{padding: '10px', marginTop: '5px', border: '1px solid #f1f1f1', borderRadius: '5px', background: 'white',}}>
                        <b>
                        {
                            item.content
                        }
                        </b>
                    </p>
                    <span onClick={() => this.handleClickActiveReply()} style={{color: '#1890ff', cursor: 'pointer'}}>{this.state.activeReply?"Đóng":"Trả lời"}</span> 
                    <span> ({item.replies.length} trả lời)</span>
                    {(<ReplyEvaluation showReply={this.state.activeReply} evaluation={item}></ReplyEvaluation>)}
                </div>
            </div>
        )
                   
    }
}

