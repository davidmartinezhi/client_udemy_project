import React, { useState , useEffect } from 'react';
import { getAvatarApi, activateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from "../../../../api/auth";
import { Switch, List, Avatar, Button, notification } from "antd";
import {EditOutlined, StopOutlined , DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [ isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [ modalContent, setModalContent] = useState(null);

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActive)}
        />
        <span>
          {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
        </span>
      </div>
      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

//Renderiza usuarios activos
function UsersActive(props) {
  const { usersActive , setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers} = props;
  
  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
    setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>);
  }

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} />}
    />
  );
}

//Componente para renderizar un unico usuario
function UserActive(props){
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      });
    }
    else{
      setAvatar(null);
    }
  },[user]);

  //Función para desactivar el usuario
  const desactivateUser = () => {
    const accessToken = getAccessTokenApi();

    activateUserApi(accessToken, user._id, false)
      .then(response => {
        notification["success"]({message: response});
        setReloadUsers(true);
      })
      .catch(err => {
        notification["error"]({message: err});
      });
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,

        <Button type="danger" onClick={desactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log("Eliminar usuario")}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."} ${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      />
    </List.Item>
  );
}

//Renderiza usuarios no activos
function UsersInactive(props) {
  const { usersInactive } = props;
  
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <UserInactive user={user} />}
    />
  );
}

//Renderiza un solo usuario inactivo
function UserInactive(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      });
    }
    else{
      setAvatar(null);
    }
  },[user]);
  
  return(
    <List.Item
    actions={[

      <Button
        type="primary"
        onClick={() => console.log("Activar Usuario")}
        >
        <CheckCircleOutlined />
      </Button>,

      <Button
          type="danger"
          onClick={() => console.log("Eliminar usuario")}
          >
          <DeleteOutlined />
      </Button>
    ]}
  >
    <List.Item.Meta
      avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
      title={`${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`}
      description={user.email}
    />
  </List.Item>
  );
  
}