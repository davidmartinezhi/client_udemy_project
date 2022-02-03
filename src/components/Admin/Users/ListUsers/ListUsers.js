import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from "antd";
import {EditOutlined, StopOutlined , DeleteOutlined } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);

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
        <UserActive usersActive={usersActive} />
      ) : (
        <UserInactive usersInactive={usersInactive}/>
      )}
    </div>
  );
}

function UserActive(props) {
  const { usersActive } = props;
  
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
              onClick={() => console.log("Editar Usuario")}
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
              onClick={() => console.log("Editar Usuario")}
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