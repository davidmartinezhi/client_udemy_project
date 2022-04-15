import React from 'react'
import {Row, Col, Card, Button} from 'antd'
import {Link} from 'react-router-dom'

//Imagenes miniatura de los cursos
import reactJsHooks from '../../../assets/img/jpg/react-js-hooks.jpg';
import reactNative from '../../../assets/img/jpg/react-native.jpg';
import javascript from '../../../assets/img/jpg/javascript-es6.jpg';
import wordPress from '../../../assets/img/jpg/wordpress.jpg'
import prestaShop from '../../../assets/img/jpg/prestashop-1-7.jpg'
import cssGrid from '../../../assets/img/jpg/css-grid.jpg'

import './HomeCourses.scss'


export default function HomeCourses() {
  return (
    <>
        <Row className="home-courses">
            <Col md={24} className="home-courses__title">
                <h2>Aprende y mejora tus habilidades.</h2>
            </Col>
            <Col md={4}></Col>
            <Col md={16}>
                <Row className="row-courses">
                    <Col md={6}>
                        Curso...
                    </Col>
                    <Col md={6}>
                        Curso...
                    </Col>
                    <Col md={6}>
                        Curso...
                    </Col>
                    <Col md={6}>
                        Curso...
                    </Col>
                    <Col md={6}>
                        Curso...
                    </Col>
                    <Col md={6}>
                        Curso...
                    </Col>
                </Row>
            </Col>
            <Col md={4}></Col>
        </Row>
    </>
  )
}
