import React, { useState, useEffect } from 'react';
import { getMenuApi } from '../../../api/menu';
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList';
//import "./MenuWeb.scss"

export default function MenuWeb() {

    //Estado donde guardamos el menu
    const [menu, setMenu] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    
    
    //Cuando editemos un menu, pediremos nuevamente los menús de la base de datos
    //Se pintan los menus en el front otra vez, sin tener que recargar la pagina
    useEffect(() => {
        getMenuApi().then( response => {
            setMenu(response.menusStored);
        });

        setReloadMenuWeb(false);    //Cuando lo cambiamos a true, lo vuelve a poner en false

    }, [reloadMenuWeb]);


    return (
        <div className='menu-web'>
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
        </div>
    );
}