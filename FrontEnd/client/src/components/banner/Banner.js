import React, { Component } from 'react';
import {Carousel} from 'antd';
import banner1 from '../../images/banner/banner1.jpg';

import banner3 from '../../images/banner/banner3.jpg';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

export default class Banner extends Component {
    constructor(){
        super();
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
    }
    next(){
        this.carousel.next();
    }
    previous() {
        this.carousel.prev();
    }

    render() {
        const props = {
            dots: true,
            infinite: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            
            <div style={{position: 'relative'}}>
                
                <MdKeyboardArrowLeft style={{cursor: 'pointer',fontSize: '2em',color: 'white',position: 'absolute', top: '46%',
                left: '2%', zIndex: '1'}} onClick={this.previous}></MdKeyboardArrowLeft>
                <Carousel ref={node => (this.carousel = node)} {...props}>
                    
                    <div style={{}}>
                        <img src={banner1} width="98%" alt="Banner 1"></img>
                        
                    </div>
                    
                    <div>
                        <img src={banner3} width="98%" alt="Banner 3"></img>
                    </div>
                    
                </Carousel>
                
                <MdKeyboardArrowRight style={{cursor: 'pointer',fontSize: '2em',color: 'white', position: 'absolute', top: '46%',right: '2%', zIndex: '1'}} type="right-circle" onClick={this.next}></MdKeyboardArrowRight>
            </div>
            
        )
    }
}
