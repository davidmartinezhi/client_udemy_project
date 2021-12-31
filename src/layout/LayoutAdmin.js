import React from "react";
import { Route , Switch } from 'react-router-dom';
import { Layout } from 'antd';
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";

import "./LayoutAdmin.scss"; 

export default function LayoutAdmin( props ) {
    
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    

    return(
        <Layout>
            {/* TO DO: Menu Sidebar */}
            <MenuSider />
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop/>
                </Header>

                <Content className="layout-admin__content">
                
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