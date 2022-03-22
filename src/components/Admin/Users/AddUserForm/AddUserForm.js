import React, { useState } from "react";
import { Form, Button, Input, Select, Row, Col, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddUserForm.scss";

export default function AddUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [ userData, setUserData ] = useState({});

  const addUser = (event) => {
    if(
      !userData.name || 
      !userData.lastname || 
      !userData.rol ||
      !userData.password ||
      !userData.repeatPassword
      ){
        notification["error"]({message: "Todos los campos son obligatorios."});
      }
      else if(userData.password !== userData.repeatPassword){
        notification["error"]({message: "Las contraseñas tienen que ser iguales."});
      }
      else{
        const accessToken = getAccessTokenApi();
        signUpAdminApi(accessToken, userData)
        .then( response => {
          notification["success"]({message: response}); //Notificación de éxito
          setIsVisibleModal(false); //Cerrar modal
          setReloadUsers(true); //Actualizar usuarios
          setUserData({});  //Volver a vacíar el objeto
        })
        .catch(error => {
          notification["error"]({message: error});
        })
      }
  };

  return (
    <div className="add-user-form">
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
      {/*  Nombre y apellidos */}
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
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={ e => setUserData({ ...userData, lastname: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>

      {/*  Correo y rol*/}
      <Row gutter={24}>
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
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccióna un rol"
              onChange={ e => setUserData({...userData, rol: e})}
              value = {userData.rol}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/*  contraseña */}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input 
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              type="password"
              value={userData.password}
              onChange={ e => setUserData({ ...userData, password: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input 
              prefix={<LockOutlined />}
              placeholder="Repetir Contraseña"
              type="password"
              value={userData.repeatPassword}
              onChange={ e => setUserData({ ...userData, repeatPassword: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
