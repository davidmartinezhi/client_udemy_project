import React from "react";
import { Link, withRouter } from 'react-router-dom';
import {Layout, Menu } from 'antd';
import { HomeOutlined, GroupOutlined  } from '@ant-design/icons';

import './MenuSider.scss';

function MenuSider ( props ) {
    const { Sider } = Layout;
    const { Item } = Menu;

    const { menuCollapsed, location } = props;

    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                {/*  Home  */}
                <Item key='/admin'>
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Item>

                {/*  */}
                <Item key='/admin/users'>
                    <Link to="/admin/users">
                        <GroupOutlined />
                        <span className="nav-text"> Usuarios </span>
                    </Link>
                </Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);