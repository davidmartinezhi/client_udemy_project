import React, {useState, useEffect} from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Modal from "../../../Modal";
import PropTypes from 'prop-types';
import DragSortableList from 'react-drag-sortable';
import {updateMenuApi, activateMenuApi, deleteMenuApi} from "../../../../api/menu";
import {getAccessTokenApi} from "../../../../api/auth";
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props){

    const { menu, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);


    useEffect( () => {
        const listItemsArray = [];
        menu.forEach(item => {
            listItemsArray.push({
                content: (
                <MenuItem 
                    item={item} 
                    activateMenu={activateMenu} 
                    editMenuWebModal={editMenuWebModal}
                    deleteMenu={deleteMenu}
                />
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
    };

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menú");
        setModalContent(
            <AddMenuWebForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
            />
        );
    };

    const editMenuWebModal = ( menu ) => {
        setIsVisibleModal(true);
        setModalTitle(`Editando menú: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenuWeb={setReloadMenuWeb}
                menu={menu}
            />
        );
    }

    const deleteMenu = (menu) => {
        const accessToken = getAccessTokenApi();
        confirm({
            title: "Eliminando Menú",
            content: `¿Estas seguro que quieres eliminar el menú: ${menu.title}?`,
            okText: "Eliminar",
            okTyoe: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteMenuApi(accessToken, menu._id)
                    .then(response => {
                        notification["success"]({message: response});
                        setReloadMenuWeb(true);
                    })
                    .catch(() => {
                        notification["error"]({message: "Error del servidor, intentelo más tarde."})
                    })
            }
        })
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
    const {item, activateMenu, editMenuWebModal, deleteMenu } = props;

    return (
      <List.Item
        actions={[
          <Switch
            defaultChecked={item.active}
            onChange={(e) => activateMenu(item, e)}
          />,
          <Button type="primary" onClick={() => editMenuWebModal(item)}>
            <EditOutlined />
          </Button>,
          <Button type="danger" onClick={() => deleteMenu(item)}>
            <DeleteOutlined />
          </Button>,
        ]}
      >
        <List.Item.Meta title={item.title} description={item.url} />
      </List.Item>
    );
}