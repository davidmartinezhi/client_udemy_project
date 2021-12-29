import React from 'react';
import { Route } from 'react-router-dom';
import {Layout} from 'antd';

import './LayoutBasic.scss';

export default function LayoutBasic( props ){
    const { routes } = props;   //Sistema de rutas que me llega por props
    const { Content , Footer } = Layout; //Para usar de manera directa esos componentes

    return(
        <Layout>
            <h2>Menu...</h2>
            <Layout>
                <Content>
                    <LoadRouters routes={routes} />
                </Content>
                <Footer>
                    David Gerardo Martínez
                </Footer>
            </Layout>
        </Layout>
    );
}


function LoadRouters( {routes} ){
    return(
        routes.map((route, index) => (
            <Route
                key = {index}
                path = {route.path}
                exact = {route.exact}
                component = {route.component}
            />
        ))
    );
}