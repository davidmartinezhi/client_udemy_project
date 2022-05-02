import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import {EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DragSortableList from "react-drag-sortable";
import { getAccessTokenApi } from "../../../../api/auth"
import Modal from "../../../Modal";
import AddEditCoursesForm from "../AddEditCoursesForm";

import { deleteCourseApi, getCourseDataUdemyApi } from "../../../../api/course";
import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listCourseArray = [];
    courses.forEach(course => {
      listCourseArray.push({
        content: (
          <Course
            course={course}
            deleteCourse={deleteCourse}
          />
        )
      });
    });
    setListCourses(listCourseArray);
  }, [courses]);


  const onSort = (sortedList, dropEvent) => {
    console.log(sortedList);
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(<AddEditCoursesForm setIsVisibleModal={setIsVisibleModal} setReloadCourses={setReloadCourses} />);
  }

  const deleteCourse = (course) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando curso",
      content: `¿Estas segur@ que quieres eliminar el curso ${course.idCourse}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCourseApi(accessToken, course._id)
          .then((response) => {
            const typeNotification =
              response.code == 200 ? "success" : "warning";
            notification[typeNotification]({ message: response.message });
            setReloadCourses(true);
          })
          .catch(() => {
            notification["danger"]({ message: "Error del servidor, intentalo más tarde." });
          });
      },
    });
  };

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={() => addCourseModal}>
          Nuevo Curso
        </Button>
      </div>

      <div className="courses-list__items">
        {listCourses.length == 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
      </div>
      <Modal  
        title={modalTitle}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}




//Componente de curso
function Course(props) {
  const { course, deleteCourse } = props;
  const [courseData, setCourseData] = useState(null);

    //Actualiza el curso cuando tiene cambios
  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse).then(response => {
      if (response.code !== 200) {  //Si no existe el curso, manda un warning
        notification["warning"]({
          message: `El curso con el id ${course.idCourse} no se ha encontrado.`
        });
      }
      setCourseData(response.data);
    });
  }, [course]);

  //Si no existe el curso, no lo imprime
  if (!courseData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => console.log("Editar curso")}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteCourse(course)}>
          <DeleteOutlined />
        </Button>
      ]}
    >
        <img 
            src={courseData.image_480x270} 
            alt={courseData.title} 
            style={{ width: "100px", marginRight: "20px" }}
        />
        <List.Item.Meta 
            title={`${courseData.title} | ID: ${course.idCourse}`}
            description={courseData.headline}
        />
    </List.Item>
  );
}
