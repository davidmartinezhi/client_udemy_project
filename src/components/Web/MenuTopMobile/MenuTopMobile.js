import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Row, Col, Menu } from "antd";
import { Link } from "react-router-dom";
import SocialLinks from "../SocialLinks";
import { getMenuApi } from "../../../api/menu";
import { HamburgerCollapse} from "react-animated-burgers";
import logoWhite from '../../../assets/img/png/white_logo_transparent_background copy.png'

import "./MenuTopMobile.scss";

export default function MenuTopMobile(props) {
  const { isActive, toggleButton } = props;

  if (!isActive) {
    return (
        <Row>
          <Col sm={24}>
            <HamburgerCollapse         
            buttonColor = "black"
            barColor = "white"
              {...{ isActive, toggleButton }}
            />
            <Link to={"/"}>
                <img src={logoWhite} className="logoWhite" alt="David Gerardo Martínez Hidrogo" />
            </Link>
          </Col>
        </Row>
    );
  } else {
    return (
      <div>
        <Row>
          <Col sm={24}>
            <HamburgerCollapse         
            buttonColor = "black"
            barColor = "white"
              {...{ isActive, toggleButton }}
            />
            <Link to={"/"}>
                <img src={logoWhite} className="logoWhite" alt="David Gerardo Martínez Hidrogo" />
            </Link>
          </Col>
        </Row>
        <MenuMobile />
      </div>
    );
  }
}

function MenuMobile() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuApi().then((response) => {
      let arrayMenu = [];
      response.menusStored.forEach((item) => {
        if (item.active) {
          arrayMenu.push(item);
        }
      });
      setMenuData(arrayMenu);
    });
  }, []);

  return ReactDOM.createPortal(
    <>
      <Menu className="menu-top-web-mobile" mode="vertical" theme="none">
        <div className="menu-top-web-mobile__nav">
          {menuData.map((item) => {
            //Si el url tiene http en el texto, significa que es una ruta externa
            //Entonces si tiene un -1, significa que no se encontro http dentro del string y es local
            const external = item.url.indexOf("http") > -1 ? true : false;

            if (external) {
              return (
                <Menu.Item key={item._id} className="menu-top-web-mobile__item">
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </Menu.Item>
              );
            }

            return (
              <Menu.Item key={item._id} className="menu-top-web-mobile__item">
                <Link to={item.url}>{item.title}</Link>
              </Menu.Item>
            );
          })}
        </div>

        {/* <Menu.Item className='menu-top-web__item'>
              <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item className='menu-top-web__item'>
              <Link to={"/contact"}>Contacto</Link>
          </Menu.Item> */}

        <SocialLinks className="menu-top-web-mobile__social" />
      </Menu>
    </>,
    document.getElementById("menuWebMobile")
  );
}
