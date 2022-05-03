import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddEditCoursesForm.scss";

export default function AddEditCoursesForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;

  const [courseData, setCourseData] = useState({});

  return (
    <div className="add-edit-course-form">
      <AddEditForm course={course} />
    </div>
  );
}

function AddEditForm(props) {
  const { course } = props;
  return (
    <Form
      className="form-add-edit"
      onFinish={() => console.log("Submit form...")}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="ID del curso"
          // value={}
          // onChange={}
          disabled={course ? true : false}
        />
      </Form.Item>
    </Form>
  );
}
