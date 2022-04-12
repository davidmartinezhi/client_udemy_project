import React, {useState} from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'
import logoWhite from '../../../assets/img/png/white_logo_transparent_background copy.png'
import './MenuTop.scss'

export default function MenuTop() {
  return (
    <Menu className='menu-top' mode='horizontal'>
        <Menu.Item className='menu-top__logo'>
            <Link to={'/'}>
                <img src={logoWhite} alt="David Gerardo Martínez Hidrogo" />
            </Link>
        </Menu.Item>

        <Menu.Item className='menu-top__item'>
            <Link to={"/"}>Home</Link>
        </Menu.Item>
        <Menu.Item className='menu-top__item'>
            <Link to={"/contact"}>Contacto</Link>
        </Menu.Item>

        <div>Social Media...</div>
    </Menu>
  )
}
