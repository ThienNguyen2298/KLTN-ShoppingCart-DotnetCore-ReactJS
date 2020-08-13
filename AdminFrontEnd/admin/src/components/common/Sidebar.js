import React, { Component } from 'react';
import './styleCommon/SideBar.css';
import { Menu } from 'antd';
import { ShoppingOutlined, AppstoreOutlined, AreaChartOutlined, SkinOutlined, CommentOutlined,
    TeamOutlined, RadarChartOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';

const { SubMenu } = Menu;

export default class SideBar extends Component {
    state = {
        theme: 'dark',
        current: this.props.isActive,
      };
      
    
      changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
      };
    
      handleClick = e => {
        
        this.setState({
          current: e.key,
        });
      };
    render() {
        
        return (
            <>
                
                <div className="sidebar">
                  
                    <div>
                            
                        <Menu
                            theme={this.state.theme}
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys="1"
                            selectedKeys={[this.state.current]}
                            mode="inline"
                            >
                            <SubMenu
                                key="sub1"
                                title={
                                <span>
                                    <ShoppingOutlined />
                                    <span>Quản lý Đơn hàng</span>
                                </span>
                                }
                            >
                                
                                <Menu.Item key="1"><Link to="/admin/order-manage/order-success">Đơn hàng thành công</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/admin/order-manage/order-delivering">Đơn hàng đang chuyển</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/admin/order-manage/order-not-confirm">Đơn hàng chưa duyệt</Link></Menu.Item>
                                <Menu.Item key="12"><Link to="/admin/order-manage/order-canceled">Đơn hàng Đã hủy</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                <span>
                                    <AppstoreOutlined />
                                    <span>Quản lý Danh mục</span>
                                </span>
                                }
                            >
                                <Menu.Item key="4"><Link to="/admin/category-manage">Quản lý danh mục</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={
                                <span>
                                    <RadarChartOutlined />
                                    <span>Quản lý Nguồn cung</span>
                                </span>
                                }
                            >
                                <Menu.Item key="5"><Link to="/admin/provider-manage">Quản lý Nguồn cung</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                <span>
                                    <SkinOutlined />
                                    <span>Quản lý Sản phẩm</span>
                                </span>
                                }
                            >
                                <Menu.Item key="6"><Link to="/admin/product-manage">Quản lý sản phẩm</Link></Menu.Item>
                                
                            </SubMenu>
                            <SubMenu
                                key="sub5"
                                title={
                                <span>
                                    <TeamOutlined />
                                    <span>Quản lý User</span>
                                </span>
                                }
                            >
                                <Menu.Item key="7"><Link to="/admin/user-manage">Quản lý user</Link></Menu.Item>
                                
                            </SubMenu>
                            <SubMenu
                                key="sub6"
                                title={
                                <span>
                                    <CommentOutlined />
                                    <span>Quản lý Đánh giá</span>
                                </span>
                                }
                            >
                                <Menu.Item key="8"><Link to="/admin/evaluation-manage">Đánh giá chưa duyệt</Link></Menu.Item>
                                
                            </SubMenu>
                            <SubMenu
                                key="sub7"
                                title={
                                <span>
                                    <AreaChartOutlined />
                                    <span>Thống kê</span>
                                </span>
                                }
                            >
                                <Menu.Item key="9"><Link to="/admin/statistics-revenue">Thống kê doanh thu</Link></Menu.Item>
                                <Menu.Item key="10"><Link to="/admin/statistics-product">Thống kê Chung</Link></Menu.Item>
                                <Menu.Item key="11"><Link to="/admin/statistics-general">Thống kê Sản phẩm</Link></Menu.Item>
                            </SubMenu>
                            
                        </Menu>
                    </div>
                </div>

            </>
            
        )
    }
}
