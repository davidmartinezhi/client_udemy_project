import React, { useState } from "react";
import { Form, Button, Input, Select, Row, Col, notification } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddUserForm.scss";

export default function AddUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [ userData, setUserData ] = useState({});

  const addUser = (event) => {
    console.log("Creando Usuarios...");
  };

  return (
    <div className="addUserForm">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

//Formulario para añadir usuario nuevo
function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" onFinish={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input 
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={ e => setUserData({ ...userData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input 
              prefix={<MailOutlined />}
              placeholder="Correo Electrónico"
              value={userData.email}
              onChange={ e => setUserData({ ...userData, email: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
