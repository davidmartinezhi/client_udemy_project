import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Layout } from 'antd';

import "./LayoutAdmin.scss";
import routes from "../config/routes";

export default function LayoutAdmin( props ) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;

    return(
        <Layout>
            <h2>Menú Sidebar</h2>
            <Layout>
                <Header>Header...</Header>

                <Content>
                
                    <LoadRouters routes={routes}/>
    
                </Content>

                <Footer>
                    David Gerardo Martínez
                </Footer>
            </Layout>
            
        </Layout>
    );
}


function LoadRouters ({routes}){
    console.log(routes);
    return routes.map((route, index) => (
        <Routes>
            <Route 
                key={index}
                path = {route.path}
                exact = {route.exact}
                element = {<route.component />}
            />
        </Routes>
    ));
}