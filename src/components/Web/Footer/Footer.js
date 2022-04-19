import React from 'react'
import {Layout, Row, Col} from 'antd'

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
                        Mi información...
                    </Col>
                    <Col md={8}>
                        Navegación...
                    </Col>
                    <Col md={8}>
                        Newsletter...
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
