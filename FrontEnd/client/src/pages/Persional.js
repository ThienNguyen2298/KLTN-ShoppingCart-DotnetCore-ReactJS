import React, { Component } from 'react'

export default class Persional extends Component {
    constructor(props){
        super(props);
        console.log(this.props.match.params.userId);
        this.state={
            
        }
    }
    render() {
        return (
            <div>
                Trang thông tin cá nhân của <h1>{this.props.match.params.userId}</h1>
            </div>
        )
    }
}
