import React, {useState, useEffect} from 'react';
import {Row, Col, notification, Spin} from 'antd';
import { getCoursesApi } from "../api/course";
import CoursesList from '../components/Web/Courses/CoursesList';
import PresentationCourses from '../components/Web/Courses/PresentationCourses/PresentationCourses';

import {Helmet} from 'react-helmet';

export default function Courses() {
  const [courses, setCourses] = useState(null);
  // console.log(courses);
  useEffect(() => {
    getCoursesApi()
      .then((response) => {
        if(response?.code !== 200){
          notification["warning"]({message: response.message});
        }
        else{
          setCourses(response.courses);
        }
      })
      .catch(() => {
        notification["error"]({message: "Error del servidor, intentelo más tarde."});
      }) 
  }, [])
  

  return (
    <>
    <Helmet>
      <title>Cursos | David Gerardo Martínez</title>
    </Helmet>
      <Row>
        <Col md={4}></Col>
        <Col md={16}>
          <PresentationCourses />
          {!courses ? (
            <Spin tipe="Cargando cursos" style={{textAlign: "center", width: "100%", padding: "20px"}} />

          ) : (
            <CoursesList courses={courses} />
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
}
