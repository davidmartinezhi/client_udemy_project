import React from 'react'
import {Layout, Row, Col} from 'antd'
import MyInfo from './MyInfo';
import NavegationFooter from './NavegationFooter';
import NewsLetter from '../NewsLetter';

import './Footer.scss'

export default function Footer() {
    const {Footer} = Layout;
  return (
    <Footer className='footer'>
        <Row>
            <Col md={4}></Col>
            <Col md={16}>
                <Row>
                    <Col md={8}>
                        <MyInfo />
                    </Col>
                    <Col md={8}>
                        <NavegationFooter />
                    </Col>
                    <Col md={8}>
                        <NewsLetter />
                    </Col>
                </Row>
                <Row className='footer__copyright'>
                    <Col md={12}>
                        © 2019 ALL RIGHTS RESERVED
                    </Col>
                    <Col md={12}>
                        David Gerardo Martínez Hidrogo
                    </Col>
                </Row>
            </Col>
            <Col md={4}></Col>
        </Row>
    </Footer>
  )
}
