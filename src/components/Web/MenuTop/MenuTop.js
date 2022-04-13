import React, {useEffect, useState} from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'
import SocialLinks from '../SocialLinks'
import {getMenuApi} from '../../../api/menu'
import logoWhite from '../../../assets/img/png/white_logo_transparent_background copy.png'
import './MenuTop.scss'

export default function MenuTop() {

    const [menuData, setMenuData] = useState([]);

    //console.log(menuData);

    useEffect(() => {
      getMenuApi().then( response => {
          let arrayMenu = [];
          response.menusStored.forEach( item => {
              if(item.active){
                  arrayMenu.push(item);
              }
          });
          setMenuData(arrayMenu);
      });
    }, [])
    

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item className="menu-top-web__logo">
        <Link to={"/"}>
          <img src={logoWhite} alt="David Gerardo Martínez Hidrogo" />
        </Link>
      </Menu.Item>

      {
      menuData.map((item) => {
        //Si el url tiene http en el texto, significa que es una ruta externa
        //Entonces si tiene un -1, significa que no se encontro http dentro del string y es local
        const external = item.url.indexOf("http") > -1 ? true : false;

        if (external) {
          return (
            <Menu.Item key={item._id} className="menu-top-web__item">
              <a href={item.url} target="_blank">{item.title}</a>
            </Menu.Item>
          );
        }

        return (
            <Menu.Item
                key={item._id}
                className="menu-top-web__item"
            >
                <Link to={item.url}>{item.title}</Link>
            </Menu.Item>
        );
      })
      }

      {/* <Menu.Item className='menu-top-web__item'>
            <Link to={"/"}>Home</Link>
        </Menu.Item>
        <Menu.Item className='menu-top-web__item'>
            <Link to={"/contact"}>Contacto</Link>
        </Menu.Item> */}

      <SocialLinks />
    </Menu>
  );
}
