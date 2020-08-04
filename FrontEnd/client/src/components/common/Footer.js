import React, { Fragment } from 'react';
import {Row, Col, Avatar} from 'antd';
import {FacebookOutlined, YoutubeOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import './Footer.css';
import img1 from '../../images/footer/img1.PNG';
import img2 from '../../images/footer/img2.PNG';
import img3 from '../../images/footer/img3.PNG';
import img4 from '../../images/footer/img4.PNG';
import img5 from '../../images/footer/img5.PNG';
import img6 from '../../images/footer/img6.PNG';


export default function Footer() {
    return (
        <footer style={{width: '100%',  background: '#ffffff'}}>
            <div style={{width: '75%', margin: '0 auto'}}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={6}>
                        <article className="article-footer">
                            <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                            <h6>Được đổi, trả trước khi nhận hàng nếu sản phẩm bị lỗi thuộc về Online Shop</h6>
                            <h6>Chăm sóc khách hàng: +8433 697 0895</h6>
                            <h6>Email: thiennguyen.it.ute@gmail.com</h6>
                        </article>
                    </Col>
                    <Col span={6}>
                        <article className="article-footer">
                            <h4>VỀ ONLINE SHOP</h4>
                            <h6>Online Shop chuyên buôn bán và cung cấp quần áo, giày dép, các phục kiện thời trang cao cấp</h6>
                        </article>
                    </Col>
                    <Col span={6}>
                        <article className="article-footer">
                            <h4>PHƯƠNG THỨC THANH TOÁN</h4>
                            <h6>
                                <Row>
                                    <Col lg={{span: 18, offset: 3}}>
                                        <img className="img-icon" src={img1}></img>
                                        <img className="img-icon" src={img2}></img>
                                        <img className="img-icon" src={img3}></img>
                                        <img className="img-icon" src={img4}></img>
                                        <img className="img-icon" src={img5}></img>
                                        <img className="img-icon" src={img6}></img>
                                    </Col>
                                </Row>
                            </h6>
                        </article>
                    </Col>
                    <Col span={6}>
                        <article className="article-footer">
                            <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
                            <h6>
                                <Row>
                                    <Col span={24} style={{textAlign: 'center'}}>
                                        
                                    <Avatar shape="square" size={48} style={{color: '#096dd9', 
                                     background: 'white'
                                     }} icon={<FacebookOutlined />} />
                                    
                                    <Avatar shape="square" size={48} style={{color: '#f5222d',
                                    background: 'white'}} icon={<YoutubeOutlined />} />
                                    
                                    </Col>
                                </Row>
                            </h6>
                        </article>
                    </Col>
                </Row>
                <div style={{textAlign: 'center'}}>
                    <br></br>
                    <h4>Copyright 2020 All rights reserved | made by Online Shop</h4>
                    <br></br>
                </div>
            </div>
        </footer>
    )
}
