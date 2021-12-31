import React from "react";
import { Link } from 'react-router-dom';
import {Layout, Menu } from 'antd';
import { HomeOutlined, MenuOutlined  } from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider ( props ) {
    const { Sider } = Layout;
    const { Item } = Menu;

    const { menuCollapsed} = props;

    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {/*  Home  */}
                <Item key='1'>
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Item>

                {/*  */}
                <Item key='2'>
                    <Link to="/admin/menu-web">
                        <MenuOutlined />
                        <span className="nav-text"> Menu Web </span>
                    </Link>
                </Item>
            </Menu>
        </Sider>
    );
}