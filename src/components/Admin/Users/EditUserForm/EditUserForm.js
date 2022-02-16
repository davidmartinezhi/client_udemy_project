import React, { useCallback, useState, useEffect } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col, notification} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDropzone} from 'react-dropzone';
import { getAvatarApi, uploadAvatarApi, updateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import "./EditUserForm.scss";

export default function EditUserForm(props){

    const { user, setIsVisibleModal, setReloadUsers } = props;
    const [ avatar, setAvatar ] = useState(null); //Avatar default es null, significa que no hay avatar
    const [userData, setUserData] = useState({}); //user data default es un objeto vacío

    //Cada vez que se actualice el user lo guarda
    useEffect(() => {
      setUserData({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        password: "",
        repeatPassword: ""
      });
    }, [user]);
  
    useEffect(() => {
      if (user.avatar) {
        getAvatarApi(user.avatar).then(response => {
          setAvatar(response);
        });
      } else {
        setAvatar(null);
      }
    }, [user]);
  
    useEffect(() => {
      if (avatar) {
        setUserData({ ...userData, avatar: avatar.file });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);
  

    //Función para actualizar el usuario
    const updateUser = e => {
      const token = getAccessTokenApi();
      let userUpdate = userData;
      
      //Comprueba contraseñas
      if(userUpdate.password || userUpdate.repeatPassword) {
        if(userUpdate.password !== userUpdate.repeatPassword){
          notification["error"]({message: "Las contraseñas tienen que ser iguales."});
          return;
        }
        else {
          delete userUpdate.repeatPassword; //Borramos la contraseña repetida
        }
      }

      //Comprueba que se hayan puesto los datos
      if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email){
        notification["error"]({message: "Es obligatorio llenar los campos Nombre, Apellido y email."});
        return;
      }
      
    //Comprueba el avatar y actualiza el usuario
    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({ message: result.message });
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({ message: result.message });
      });
    }

    setIsVisibleModal(false);
    setUserData({
      ...userData,
      password: "",
      repeatPassword: ""
    });
    setReloadUsers(true);
  };


    return(
        <div className='edit-user-form'>
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    );
}

//Para que el usuario pueda subir su foto de perfil
function UploadAvatar(props){
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  //Se repite siempre que el valor de avatar se actualice

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  //Drop de imagenes por parte del usuario
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg", //Tipo de archivos que acepta
    noKeyboard: true,
    onDrop,
  });

  //Return sección donde el usuario elige su avatar en su perfil
  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        //Si no esta activado, muestra el noAvatar
        <Avatar size={150} src={NoAvatar} />
      ) : (
        //Si ya tiene un avatar lo muestra, sino llama al no avatar
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

//Edita el formulario del usuario para editar
function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onFinish={updateUser}>
      {/*Nombre y Apellido*/}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  lastname: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      {/*Email y Rol*/}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo Electrónico"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Rol Usuario"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  role: e, //El rol va a ser igual a la acción seleccionada
                })
              }
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/*Contraseña y repetir constraseña*/}
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  password: e.target.value,
                })
              }
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
              onChange={(e) =>
                setUserData({
                  ...userData,
                  repeatPassword: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}