import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import {} from "@ant-design/icons";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";

import { getCourseDataUdemyApi } from "../../../../api/course";
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
    courses.forEach((course) => {
      listCourseArray.push({
        content: <Course course={course} />,
      });
    });
    setListCourses(listCourseArray);
  }, []);

  const onSort = (sortedList, dropEvent) => {
    console.log(sortedList);
  };

  return (
    <div className="courses-list">
      <div className="course-list__header">
        <Button type="primary" onClick={() => console.log("Creando curso...")}>
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
    </div>
  );
}

function Course(props) {
  const { course } = props;
  return <h1>Hola mundo</h1>;
}
