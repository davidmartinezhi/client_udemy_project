import React from 'react'

import logoWhite from '../../../../assets/img/png/white_logo_transparent_background copy 2 2.png'
import './MyInfo.scss'

export default function MyInfo() {
  return (
    <div className='my-info'>
        <img src={logoWhite} alt="David Gerardo Martínez Hidrogo" />
        <h4>Entra en el mundo del desarrollo web, disfruta creando proyectos de todo
        tipo, deja que tú imaginación fluya y crea verdaderas maravillas!!
        </h4>
    </div>
  )
}