import React, { useState, useEffect } from "react";
import { Row, Col, Button, notification, Card, Rate } from "antd";
import { getCourseDataUdemyApi } from "../../../../api/course";
import "./CoursesList.scss";

export default function CoursesList(props) {
  const { courses } = props;
  //console.log(courses);
  return (
    <div className="courses-list">
      <Row>
        {courses.map((course) => (
          <Col md={8} className="courses-list__course">
            <Course key={course._id} course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Course(props) {
  const { course } = props;
  const [courseInfo, setCourseInfo] = useState({});
  const [urlCourse, setUrlCourse] = useState("");
  const { Meta } = Card;
  

  useEffect(() => {
    //Recibimos data por parte de udemy
    getCourseDataUdemyApi(course.idCourse)
      .then((response) => {
        //Checa que la respuesta sea correcta
        if (response?.code !== 200) {
          //Si no es correcta la data, manda un aviso
          notification["warning"]({ message: response.message });
        } else {
          //Si es correcta, establece los datos de la tarjeta
          setCourseInfo(response.data);
          mountUrl(response.data.url)
        }
      })
      .catch(() => {
        //Si llega algún error del servidor, lo notificamos
        notification["error"]({
          message: "Error del servidor, intentelo más tarde.",
        });
      });
  }, [course]);


  const mountUrl = (url) => {
    if(!course.link){ //Link de udemy
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl = baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");
      setUrlCourse(finalUrl);
    }
    else{ //Link personalizado
      setUrlCourse(course.link);
    }
  }

  return (
    <a href={urlCourse} target="_blank" rel="noopener noreferrer">
      <Card
        cover={<img src={courseInfo.image_480x270} alt={courseInfo.title} />}
      >
        <Meta title={courseInfo.title} description={courseInfo.headline} />
        <Button>Entrar en el Curso</Button>
        <div className="courses-list__course-footer">
          <span>{course.price ? `MX$${course.price}` : courseInfo.price} </span>
          <div>
            <Rate disabled defaultValue={5} />
          </div>
        </div>
      </Card>
    </a>
  );
}
