import React from 'react'
import {Col, Row, Card} from 'antd'
import {} from '@ant-design/icons'
import './HowMyCoursesWork.scss'

export default function HowMyCoursesWork() {
  return (
    <Row className='how-my-courses-work'>
        <Col md={24} className='how-my-courses-work__title'>
            <h2>¿Cómo funcionan mis cursos?</h2>
            <h3>
                Cada curso cuenta con contenido bajo la web de Udemy, 
                activa las 24 horas del día los 365 días del año.
            </h3>
        </Col>
    </Row>
  )
}
