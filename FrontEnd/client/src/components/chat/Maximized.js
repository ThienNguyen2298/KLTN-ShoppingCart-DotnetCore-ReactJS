import React, { Component } from 'react';
import {TitleBar, AgentBar, Row, Column, Title, Subtitle, Avatar,
IconButton, RateGoodIcon, RateBadIcon, CloseIcon, MessageList,
MessageGroup, Message, Bubble,  MessageText,
TextComposer, Fill, TextInput, SendButton, Fit} from '@livechat/ui-kit';

const rate = 'good';
export default class Maximized extends Component {
    rateGood(){

    }
    rateBad(){

    }
    minimize(){
        this.props.onMinimize();
    }
    onMessageSend(){

    }
    render() {
        
        return (
            <div style={{
				display: 'flex',
				flexDirection: 'column',
                height: '100%',
                //background: 'gray'
			}}>
                <TitleBar
                    rightIcons={[
                        <IconButton key="close" onClick={this.props.minimize}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
                    title="WELCOME TO ONLINE SHOP"
                >
                
                </TitleBar>
                <div
				style={{
					flexGrow: 1,
					minHeight: 0,
					height: '100%',
				}}
			    >
                    <MessageList active containScrollInSubtree>
                        <MessageGroup avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
                        onlyFirstWithMeta>
							
								<Message date="10:48 05/08/2020" authorName="Admin"
									
									isOwn={false}
									key={1}
								>
									<Bubble isOwn={false}>
										
										<MessageText>{"Can I help you ?"}</MessageText>	
									</Bubble>
								</Message>
						</MessageGroup>
					
				    </MessageList>
                </div>
                <TextComposer onSend={this.onMessageSend.bind(this)}>
                        <Row align="center">
                            <Fill>
                                <TextInput />
                            </Fill>
                            <Fit>
                                <SendButton />
                            </Fit>
                        </Row>
                    </TextComposer>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '.6em',
                            padding: '.4em',
                            background: '#fff',
                            color: '#888',
                        }}
                    >
                        {'Powered by Online Shop'}
                    </div>
            </div>
        )
    }
}
