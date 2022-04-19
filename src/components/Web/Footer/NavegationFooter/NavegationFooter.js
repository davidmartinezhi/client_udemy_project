import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  CodeSandboxOutlined,
  DatabaseOutlined,
  ArrowRightOutlined,
  HddOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./NavegationFooter.scss";

export default function NavegationFooter() {
  return (
    <Row className="navegation-footer">
      <Col md={24}>
        <h3>Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="#">
          <BookOutlined /> Cursos Online
        </a>
      </li>
      <li>
        <a href="#">
          <CodeSandboxOutlined /> Desarrollo Web
        </a>
      </li>
      <li>
        <a href="#">
          <DatabaseOutlined /> Base de Datos
        </a>
      </li>
      <li>
        <a href="#">
          <ArrowRightOutlined /> Política de Privacidad
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
          <HddOutlined /> Sistemas / Servidores
        </a>
      </li>
      <li>
        <a href="#">
          <AppstoreOutlined /> CMS
        </a>
      </li>
      <li>
        <a href="#">
          <UserOutlined /> Portfolio
        </a>
      </li>
      <li>
        <a href="#">
          <ArrowRightOutlined /> Política de Cookies
        </a>
      </li>
    </ul>
  );
}
