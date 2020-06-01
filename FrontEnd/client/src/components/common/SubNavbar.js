import React, { Component } from 'react';
import {Dropdown, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {BarsOutlined, EnvironmentOutlined, MergeCellsOutlined, SkinOutlined} from '@ant-design/icons'


const { SubMenu } = Menu;

export default class SubNavbar extends Component {
    render() {
        //custom menu
        const menu = (
            <Menu style={{ width: 220, background: '#ebebeb' }} mode="vertical">
            <SubMenu
              key="sub1"
              title={
                <span>
                  
                  <span>Quần áo</span>
                </span>
              }
              className="sub-category"
            >
              <Menu.ItemGroup title="Quần" style={{ width: 220 }}>
                <Menu.Item key="1">Quần tây</Menu.Item>
                <Menu.Item key="2">Quần Jeans</Menu.Item>
                <Menu.Item key="3">Quần Kaki</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Áo" >
                <Menu.Item key="3">Áo thun</Menu.Item>
                <Menu.Item key="4">Áo sơmi</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  
                  <span>Giày dép</span>
                </span>
              }
              className="sub-category"
            >
              <Menu.ItemGroup title="Giày" style={{ width: 220 }}>
                <Menu.Item key="1">Sandal</Menu.Item>
                <Menu.Item key="2">Sneaker</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Dép" >
                <Menu.Item key="3">Dép tổ ông</Menu.Item>
                <Menu.Item key="4">Dép lào</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  
                  <span>Phụ kiện</span>
                </span>
              }
              className="sub-category"
            >
                <Menu.ItemGroup title="Thắt lưng" style={{ width: 220 }}>
                    <Menu.Item key="3">Đẹp</Menu.Item>
                    <Menu.Item key="4">Xấu</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
          </Menu>
          );
        return (
            
                <div style={{paddingTop: 5,  maxWidth: '75%', margin: '0 auto', display: 'flex', justifyContent: 'space-between'}}>
                        <Dropdown overlay={menu}>
                            <Link className="ant-dropdown-link" to="#" >
                                <h5 style={{color: '#af9a7d'}}><BarsOutlined style={{color: 'black'}}></BarsOutlined>&nbsp;DANH MỤC SẢN PHẨM</h5>
                            </Link>
                        </Dropdown>
                        <h5 style={{color: '#af9a7d'}}><EnvironmentOutlined style={{color: 'red'}}/> Vận chuyển</h5>
                        <h5 style={{color: '#af9a7d'}}><MergeCellsOutlined style={{color: 'green'}}/> 30 ngày đổi trả dễ dàng</h5>
                        <h5 style={{color: '#af9a7d'}}><SkinOutlined style={{color: '#13c2c2'}}/> Sản phẩm chính hãng</h5>
                </div>
            
        )
    }
}
