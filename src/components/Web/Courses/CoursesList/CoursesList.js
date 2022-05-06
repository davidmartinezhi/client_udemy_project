import React, {useState, useEffect} from "react";
import {Row, Col, Button, notification, Card, Rate} from "antd";
import {getCoursesApi} from "../../../../api/course";
import "./CoursesList.scss";

export default function CoursesList(props) {

  const {courses} = props;
  //console.log(courses);
  return (
    <div className="courses-list">
      <Row>
        {
          courses.map( course => (
            <Col md={8} className="courses-list__courset">
              <Course key={course._id} course={course} />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}


function Course(props){

  const { course } = props;

  console.log(course);

  return <p>hola...</p>
}
