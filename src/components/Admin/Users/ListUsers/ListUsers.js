import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from "antd";
import {EditOutlined, StopOutlined , DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
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
        <UserActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      ) : (
        <UserInactive usersInactive={usersInactive} />
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

function UserActive(props) {
  const { usersActive , setIsVisibleModal, setModalTitle, setModalContent} = props;
  
  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
    setModalContent(<EditUserForm user={user} />);
  }

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => editUser(user)}
            >
              <EditOutlined />
            </Button>,

            <Button
                type="danger"
                onClick={() => console.log("Desactivar Usuario")}
            >
                <StopOutlined />
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
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."} ${
              user.lastname ? user.lastname : "..."
            }`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

function UserInactive(props) {
  const { usersInactive } = props;
  
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
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
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."} ${
              user.lastname ? user.lastname : "..."
            }`}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}