import React, { Component } from 'react';
import Maximized from './Maximized'
import Minimized from './Minimized'
import { ThemeProvider, FixedWrapper, darkTheme, elegantTheme, purpleTheme, defaultTheme } from '@livechat/ui-kit';

export default class Chat extends Component {
    render() {
        return (
            <div>
                <FixedWrapper.Root maximizedOnInit={false}>
                    <FixedWrapper.Minimized>
                        <Minimized/>
                    </FixedWrapper.Minimized>
                    <FixedWrapper.Maximized>
                        <Maximized/>
                    </FixedWrapper.Maximized>
                        
                </FixedWrapper.Root>
                
            </div>
        )
    }
}
