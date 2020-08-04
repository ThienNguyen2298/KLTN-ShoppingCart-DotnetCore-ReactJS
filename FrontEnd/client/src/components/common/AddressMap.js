import React from 'react';
import { Row, Col } from 'antd';
 const AddressMap=()=>{
    return (
        <Row>
            <Col lg={{span: 24}}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9322903619263!2d106.71160921474927!3d10.816493692294342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175289a3bac3373%3A0x9376707fd4ad09ab!2zMjMyLzE3LzYgUUwxMywgUGjGsOG7nW5nIDI2LCBCw6xuaCBUaOG6oW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1577580051510!5m2!1svi!2s" width="100%" height="350"  style={{border:0}}  aria-hidden="false" ></iframe>
            </Col>
        </Row>
    );
 }
 export{AddressMap}