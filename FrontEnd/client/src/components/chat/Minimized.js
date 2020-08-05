import React, { Component } from 'react';
import { IconButton, ChatIcon } from '@livechat/ui-kit'

export default class Minimized extends Component {
    maximize(){
        
        this.props.onMaximize();
    }
    render() {
        //console.log(this.props.maximize);
        return (
            <div
		onClick={this.props.maximize}
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '60px',
			height: '60px',
			background: '#0093FF',
			color: '#fff',
			borderRadius: '50%',
			cursor: 'pointer',
		}}
	>
		<IconButton color="#fff">
			<ChatIcon />
		</IconButton>
	</div>
        )
    }
}
