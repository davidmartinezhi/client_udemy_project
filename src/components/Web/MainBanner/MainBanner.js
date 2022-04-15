import React from "react";
import {Col, Row} from 'antd';
import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark">
        <Row>
          <Col md={4} />
          <Col md={16}>
            <h2>
              Aprender nuevas <br /> tecnologías web y mobiles
            </h2>
            <h3>
              A través de cursos practicos y actualizados, creados por <br />
              profesionales con años de experiencia.
            </h3>
          </Col>
          <Col md={4} />
        </Row>
      </div>
    </div>
  );
}
