import React, {useState, useEffect} from 'react';
import {Row, Col, notification, spin} from 'antd';
import { getCoursesApi } from "../api/course";
import CoursesList from '../components/Web/Courses/CoursesList';
import PresentationCourses from '../components/Web/Courses/PresentationCourses/PresentationCourses';

export default function Courses() {
  return (
    <>
      <Row>
        <Col md={4}></Col>
        <Col md={16}>
          <PresentationCourses />
          <CoursesList />
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
}
