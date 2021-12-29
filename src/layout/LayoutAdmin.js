import React from "react";
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import "./LayoutAdmin.scss";

export default function LayoutAdmin( props ) {
    
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    

    return(
        <Layout>
            <h2>Menú Sidebar</h2>

            <Layout>
                <Header>
                    Header...
                </Header>

                <Content>
                
                    <LoadRouters routes = {routes}/>
    
                </Content>

                <Footer>
                    David Gerardo Martínez
                </Footer>
            </Layout>
            
        </Layout>
    );
}


function LoadRouters ({routes}){
    //Map requiere que el hijo siempre tenga una key
    return routes.map((route, index) => (
            <Route 
                key={index}
                path = {route.path}
                exact = {route.exact}
                component = {route.component}
            /> 
    ));
}