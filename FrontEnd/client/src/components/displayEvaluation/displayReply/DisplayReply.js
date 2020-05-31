import React, { Component } from 'react';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';

export default class DisplayReply extends Component {
    render() {
        return (
            <div style={{display: 'flex', margin: '10px 0'}}>
                <div>
                    <Avatar size="large" icon={<UserOutlined />} style={{ margin: '8px 15px 0 0'}}/>
                </div>
                <div>
                    <h6>Nguyễn Hữu Thiện</h6>
                    <p>
                        Cám ơn bạn đã feedback có tâm, Cám ơn bạn đã feedback có tâm, Cám ơn bạn đã feedback có tâm, 
                        Cám ơn bạn đã feedback có tâm, 
                        Cám ơn bạn đã feedback có tâm, Cám ơn bạn đã feedback có tâm, Cám ơn bạn đã feedback có tâm.
                    </p>
                </div>
            </div>
        )
    }
}
