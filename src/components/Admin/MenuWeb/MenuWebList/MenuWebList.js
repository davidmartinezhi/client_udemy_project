import React, {useState, useEffect} from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Modal from "../../../Modal";
import PropTypes from 'prop-types';
import DragSortableList from 'react-drag-sortable';
import {updateMenuApi, activateMenuApi} from "../../../../api/menu";
import {getAccessTokenApi} from "../../../../api/auth";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props){

    const { menu, setReloadMenus } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);


    useEffect( () => {
        const listItemsArray = [];
        menu.forEach(item => {
            listItemsArray.push({
                content: (
                <MenuItem item={item} activateMenu={activateMenu}/>
                )
            });
        });
        setListItems(listItemsArray);
    }, [menu]);


    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi();
        activateMenuApi(accessToken, menu._id, status).then( response => {
            notification["success"]({
                message: response
            });
        });
    }

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menú");
        setModalContent(
            <div>
                <h1>Creando nuevo menú</h1>
            </div>
        );
    }

    //Actualizando el orden de las listas
    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        //En la pagina, se actualiza el orden en la parte de rank
        sortedList.forEach((item) => {
            const {_id} = item.content.props.item;  //Sacamos la id del menú
            const order = item.rank;    //Sacamos la posición que tiene en la pagina actualmente y la asignamos como el order

            updateMenuApi(accessToken, _id, {order}); //Mandamos a actualizar la api
        });
    }

    return(
        <div className='menu-web-list'>

            {/* HEADER */}
            <div className='menu-web-list__header'>
                <Button type="primary" onClick={addMenuWebModal}>
                    Crear Menú
                </Button>
            </div>

            {/* ITEMS */}
            <div className='menu-web-list__items'>
                <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
            </div>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}


function MenuItem(props){
    const {item, activateMenu} = props;

    return(
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)}/>,
                <Button type="primary" ><EditOutlined /></Button>,
                <Button type="danger"><DeleteOutlined /></Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    );
}