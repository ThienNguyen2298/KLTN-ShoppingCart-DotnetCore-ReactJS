import React, { Component } from 'react';
import {Input, Button} from 'antd';
import DisplayReply from '../displayReply/DisplayReply';

const {TextArea} = Input;
export default class ReplyEvaluation extends Component {
    render() {
        return (
            <>
                <DisplayReply></DisplayReply>
                <DisplayReply></DisplayReply>
                
                <div>
                    <form>
                        <TextArea style={{margin: '10px 0'}} autoSize={{ minRows: 3, maxRows: 5 }}></TextArea>
                        <Button htmlType="submit" style={{background: '#1890ff', border: '1px solid #1890ff', color: 'white'}}>Nhận xét</Button>
                    </form>
                    
                </div>
            </>
        )
    }
}
