import React, {useState, useEffect} from 'react';
import { Switch, List, Button, Icon, Modal as ModalAntd, notification} from 'antd';
import Modal from "../../../Modal";
import PropTypes from 'prop-types';
import DragSortableList from 'react-drag-sortable';

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
                content: (<div><p>{item.title}</p></div>)
            });
        });
        setListItems(listItemsArray);
    }, [menu]);

    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
    }

    return(
        <div className='menu-web-list'>

            {/* HEADER */}
            <div className='menu-web-list__header'>
                <Button type="primary">
                    Menú menú
                </Button>
            </div>

            {/* ITEMS */}
            <div className='menu-web-list__items'>
                <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
            </div>
        </div>
    );
}