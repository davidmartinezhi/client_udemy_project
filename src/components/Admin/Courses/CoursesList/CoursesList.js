import React, {useState, useEffect} from 'react'
import { List, Button, Modal as ModalAntd, notification } from 'antd'
import {} from '@ant-design/icons'
import DragSortableList from "react-drag-sortable"
import Modal from '../../../Modal'

import { getCourseDataUdemyApi } from '../../../../api/course'
import './CoursesList.scss'

const { confirm } = ModalAntd;

export default function CoursesList( props ) {
    const { courses, setReloadCourses } = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);


  return (
    <div className='courses-list'>
        <div className='course-list__header'>
            <Button type="primary" onClick={() => console.log("Creando curso...")}>
                Nuevo Curso
            </Button>

        </div>
    </div>
  )
}
