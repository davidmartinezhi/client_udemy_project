import React from 'react';
import { Route , Switch } from 'react-router-dom';
import {Layout, Row, Col} from 'antd';
import MenuTop from '../components/Web/MenuTop';

import './LayoutBasic.scss';

export default function LayoutBasic( props ){
    const { routes } = props;   //Sistema de rutas que me llega por props
    const { Content , Footer } = Layout; //Para usar de manera directa esos componentes

    /* 
    Columnas md 4, md 16 y md 4
    Ayuda a que en mobil, abarque la pantalla completa, pero tenga padding en pantalla media y grande
    Para que ocupe la pantalla completa en tablet, sería con lg
    */
    return (
        <Row>
            <Col md={4} />
            <Col md={16}>
                <MenuTop />
                <LoadRoutes routes={routes} />
                <Footer>
                    David Gerardo Martínez
                </Footer>
            </Col>
            <Col md={4} />
        </Row>
    );
}


function LoadRoutes( {routes} ){
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key = {index}
                    path = {route.path}
                    exact = {route.exact}
                    component = {route.component}
                />
            ))}
        </Switch>
    );
}