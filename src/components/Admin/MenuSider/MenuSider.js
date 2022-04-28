import React from "react";
import { Link, withRouter } from 'react-router-dom';
import {Layout, Menu } from 'antd';
import { HomeOutlined, GroupOutlined, MenuOutlined, BookOutlined } from '@ant-design/icons';

import './MenuSider.scss';

function MenuSider ( props ) {
    const { menuCollapsed, location } = props;
    const { Sider } = Layout;

    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[location.pathname]}
                //defaultSelectedKeys={["/admin/users"]}
            >
                {/*  Home  */}
                <Menu.Item key="/admin">
                <Link to="/admin">
                    <HomeOutlined />
                    <span className="nav-text">Home</span>
                </Link>
                </Menu.Item> 

                {/* Users */}
                <Menu.Item key="/admin/users">
                    <Link to="/admin/users">
                    <GroupOutlined />
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>

                {/* Menu Web */}
                <Menu.Item key="/admin/menu">
                    <Link to="/admin/menu">
                    <MenuOutlined />
                        <span className="nav-text">Menú</span>
                    </Link>
                </Menu.Item> 

                {/* Menu Courses */}
                <Menu.Item key="/admin/courses">
                    <Link to="/admin/courses">
                    <BookOutlined />
                        <span className="nav-text">Cursos</span>
                    </Link>
                </Menu.Item>             
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);