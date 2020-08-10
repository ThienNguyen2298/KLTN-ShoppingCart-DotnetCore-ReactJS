import React, { Component } from 'react';
import { IconButton, ChatIcon } from '@livechat/ui-kit';
import {message} from 'antd';
import { connect } from 'react-redux';

class Minimized extends Component {
    handleClickMaximize(){
		if(!!this.props.userId){
			this.props.maximize();
		}
		else{
			message.warning("Vui lòng Đăng nhập để Chat!", 4);
		}
	}
	componentDidUpdate(){
		if(this.props.openMaximize){
			this.props.maximize();
		}
	}
    render() {
        //console.log(this.props.maximize);
        return (
            <div
				onClick={this.handleClickMaximize.bind(this)}
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
const mapStateToProps = (state) => {
    return {
		userId: state.auth.userId,
		openMaximize: state.chat.openMaximize,
	}
}
export default connect(mapStateToProps, null)(Minimized);