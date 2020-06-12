import React, { Component } from 'react';
import {Avatar} from 'antd';
import {UserOutlined, CheckCircleOutlined} from '@ant-design/icons';
import Moment from 'react-moment';
import 'moment/locale/vi';

export default class DisplayReply extends Component {
    render() {
        const {reply} = this.props;
        console.log(reply)
        return (
            <div style={{display: 'flex', margin: '10px 0', padding: '15px', background: '#f1f1f1', borderRadius: '5px'}}>
                <div>
                    <Avatar size="large" icon={<UserOutlined />} style={{ margin: '8px 15px 0 0'}}/>
                </div>
                <div>
                    <h6>{reply.user?reply.user.displayname:'User'} {reply.user.displayname === 'Admin'? (<CheckCircleOutlined style={{color: 'green'}}/>): ""}</h6>
                    
                    <p>
                        {reply.content}
                    </p>
                    <p><small><Moment locale="vi" interval={30000} fromNow>
                        {reply.createDate}</Moment></small></p>
                </div>
            </div>
        )
    }
}
