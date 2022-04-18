import React from 'react'
import {Col, Row, Card} from 'antd'
import {ClockCircleOutlined, KeyOutlined, MessageOutlined, UserOutlined, DollarCircleOutlined, CheckCircleOutlined} from '@ant-design/icons'
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
        <Col md={4}></Col>
        <Col md={16}>
            <Row className="row-cards">
                <Col md={8}>
                    <CardInfo 
                        icon={<ClockCircleOutlined />} 
                        title="Cursos y Clases"
                        subtitle="Cursos de entre 10 y 30 horas de contenido"
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        icon={<KeyOutlined />} 
                        title="Acceso 24/7"
                        subtitle="Accede a los cursos en cualquier momento"
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        icon={<MessageOutlined />} 
                        title="Aprendizaje Colaborativo"
                        subtitle="Aprende en conjunto al publicar tus preguntas"
                    />
                </Col>
            </Row>
            <Row className="row-cards">
                <Col md={8}>
                    <CardInfo 
                        icon={<UserOutlined />} 
                        title="Mejora tu perfil"
                        subtitle="Aprende y mejora tu perfil profesional"
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        icon={<DollarCircleOutlined />} 
                        title="Precios Bajos"
                        subtitle="Acceso y soporte ilimitado, por solo 9.99"
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        icon={<CheckCircleOutlined />} 
                        title="Certificados de finalización"
                        subtitle="Udemy te manda un certificado de finalización del curso"
                    />
                </Col>
            </Row>
        </Col>
        <Col md={4}></Col>
    </Row>
  )
}

function CardInfo( props ){
    const {icon, title, subtitle} = props;
    const {Meta} = Card;

    return(
        <Card className="how-my-courses-work__card">
            {icon}
            <Meta title={title} description={subtitle} />
        </Card>
    );

}