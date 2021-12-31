import React, { useState } from "react";
import { Route , Switch } from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";

import "./LayoutAdmin.scss"; 

export default function LayoutAdmin( props ) {
    
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    
    const [ menuCollapsed, setMenuCollapsed ] = useState(false);

    return(
        <Layout>
            {/* TO DO: Menu Sidebar */}
            <MenuSider menuCollapsed={menuCollapsed}/>
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
                </Header>

                <Content 
                className="layout-admin__content" 
                style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                
                    <LoadRoutes routes = {routes}/>
    
                </Content>

                <Footer className="layout-admin__footer">
                    David Gerardo Martínez
                </Footer>
            </Layout>
            
        </Layout>
    );
}


function LoadRoutes ( {routes} ){
    //Map requiere que el hijo siempre tenga una key
    //map debe estar envuelto en llaves al no estar directamente en Router
    return (
        <Switch>
            {routes.map((route, index) => (
            <Route 
                key={index}
                path = {route.path}
                exact = {route.exact}
                component = {route.component}
            /> 
            ))}
        </Switch>
    );

}