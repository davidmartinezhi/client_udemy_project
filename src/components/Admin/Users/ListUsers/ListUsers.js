import React, { useState, useEffect } from "react";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";

import "./ListUsers.scss";

//Importación global
const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);


  //Función para confirmar eliminación del usuario
  function showDeleteConfirm( user ){
    const accessToken = getAccessTokenApi();

    //Objeto importado de ModalAntd, para mostrar el modal de confirmación para borrar usuarios
    confirm({
      title: "Eliminando Usuario",
      content: `¿Eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        //Aquí se escribe la logica que va a ejecutar el endpoint
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({ message: response });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({ message: err });
          });
      }
    });
  };


  //Función para el modal de addUser
  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Usuario");
    setModalContent(
      <div>
        <h1>Formulario Creación de usuario.</h1>
        <h2>Admin</h2>
      </div>
    );
  }

  return (
    <div className="list-users">
      <div className="list-users__header">
      <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActive(!viewUsersActive)}
          />
          <span>
            {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button type="primary" onClick={addUserModal}>
          Nuevo Usuario
        </Button>
      </div>

      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
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
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
    showDeleteConfirm
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        />
      )}
    />
  );
}

//Componente para renderizar un unico usuario
function UserActive(props) {
  const { user, editUser, setReloadUsers, showDeleteConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  //Función para desactivar el usuario
  const desactivateUser = () => {
    const accessToken = getAccessTokenApi();

    activateUserApi(accessToken, user._id, false)
      .then((response) => {
        notification["success"]({ message: response });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({ message: err });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,

        <Button type="danger" onClick={desactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={e => showDeleteConfirm(user)}>
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
  const { usersInactive, setReloadUsers, showDeleteConfirm } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm}/>
      )}
    />
  );
}

//Renderiza un solo usuario inactivo
function UserInactive(props) {
  const { user, setReloadUsers, showDeleteConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  //Activamos al usuario
  const activateUser = () => {
    const accesToken = getAccessTokenApi();

    activateUserApi(accesToken, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckCircleOutlined />
        </Button>,

        <Button type="danger" onClick={e => showDeleteConfirm(user)}>
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
