import React, {useState, useCallback} from 'react';
import { Route , Switch } from 'react-router-dom';
import {Layout, Row, Col} from 'antd';
import MenuTop from '../components/Web/MenuTop';
import MenuTopMobile from '../components/Web/MenuTopMobile';
import Footer from '../components/Web/Footer';


import './LayoutBasic.scss';

export default function LayoutBasic( props ){
    const { routes } = props;   //Sistema de rutas que me llega por props

    /* 
    Columnas md 4, md 16 y md 4
    Ayuda a que en mobil, abarque la pantalla completa, pero tenga padding en pantalla media y grande
    Para que ocupe la pantalla completa en tablet, sería con lg
    */
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    window.addEventListener('resize', () => {setWindowWidth(window.innerWidth)});
    const [isActive, setIsActive] = useState(false);

    const toggleButton = useCallback(
      () => setIsActive(prevState => !prevState),
      [],
    )

    return (
        <>
            <Row>
                <Col md={4} />
                <Col md={16}>
                    {windowWidth > 750 ? <MenuTop /> : <MenuTopMobile isActive={isActive} toggleButton={toggleButton} />}
                </Col>
                <Col md={4} />
            </Row>
            <LoadRoutes routes={routes} />
            <Footer />
        </>
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