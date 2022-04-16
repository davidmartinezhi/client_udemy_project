import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

//Imagenes miniatura de los cursos
import reactJsHooks from "../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from "../../../assets/img/jpg/react-native.jpg";
import javascript from "../../../assets/img/jpg/javascript-es6.jpg";
import wordPress from "../../../assets/img/jpg/wordpress.jpg";
import prestaShop from "../../../assets/img/jpg/prestashop-1-7.jpg";
import cssGrid from "../../../assets/img/jpg/css-grid.jpg";

import "./HomeCourses.scss";

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
              <CardCourses
                image={reactJsHooks}
                title="ReactJs Hooks"
                subtitle="Intermedio - React/Javascript"
                link="https://twitter.com/davidmtzhi"
              />
            </Col>
            <Col md={6}>
              <CardCourses
                image={reactNative}
                title="React Native Expo"
                subtitle="Intermedio - React/Javascript"
                link="https://twitter.com/davidmtzhi"
              />
            </Col>
            <Col md={6}>
              <CardCourses
                image={javascript}
                title="Javascript ES6"
                subtitle="Básico - React/Javascript"
                link="https://twitter.com/davidmtzhi"
              />
            </Col>
            <Col md={6}>
              <CardCourses
                image={wordPress}
                title="Wordpress"
                subtitle="Básico - Wordpress"
                link="https://twitter.com/davidmtzhi"
              />
            </Col>
            <Row className="row-courses">
              <Col md={6}>
                <CardCourses
                  image={prestaShop}
                  title="PrestaShop 1.7"
                  subtitle="Básico - PrestaShop"
                  link="https://twitter.com/davidmtzhi"
                />
              </Col>
              <Col md={6}></Col>
              <Col md={6}></Col>
              <Col md={6}>
                <CardCourses
                  image={cssGrid}
                  title="CSS Grid"
                  subtitle="Intermedio - CSS"
                  link="https://twitter.com/davidmtzhi"
                />
              </Col>              
            </Row>
          </Row>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
}

function CardCourses(props) {
  const { image, title, subtitle, link } = props;

  const { Meta } = Card;

  return (
    <a href={link} target="_blank">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>INGRESAR</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
}
