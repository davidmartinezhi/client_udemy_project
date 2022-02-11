import React, { useCallback, useState, useEffect } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDropzone} from 'react-dropzone';
import { getAvatarApi } from '../../../../api/user';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import "./EditUserForm.scss";

export default function EditUserForm(props){

    const { user } = props;
    const [ avatar, setAvatar ] = useState(null); //Avatar default es null, significa que no hay avatar
    const [userData, setUserData] = useState({}); //user data default es un objeto vacío

    //Cada vez que se actualice el user lo guarda
    useEffect(() => { 
      setUserData({ //userData ahora tendra esta información
        name: user.name,
        lastname: user.lastname,
        password: user.password,
        repeatPassword: user.repeatPassword,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      });
    }, [user]);

    //Use effect para regresar el avatar del usuario desde el back-end
    useEffect(() => {
      if(user.avatar){  //Si existe el user.avatar
        getAvatarApi(user.avatar).then(response => {  //Lo pedimos al backend
          setAvatar(response);  //el avatar ahora es el que nos manda el backend
        });
      }
      else{ //Si no existe el avatar en el backend
        setAvatar(null);  //El avatar es null
      }

    }, [user]); //Todo esto en el user

    //Utilizo useEffect para que sirve para guardar el avatar que seleccione el usuario
    useEffect(() => {
        if(avatar){
            setUserData({
                ...userData,
                avatar: avatar.file
            });
        }
    }, [avatar]);


    //Función para actualizar el usuario
    const updateUser = e => {

        console.log(userData);

    }


    return(
        <div className='edit-user-form'>
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    );
}

//Para que el usuario pueda subir su foto de perfil
function UploadAvatar(props){
    const {avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    //Se repite siempre que el valor de avatar se actualice
    useEffect(() => {
      if(avatar){
        if(avatar.preview){
          setAvatarUrl(avatar.preview);
        }else{
          setAvatarUrl(avatar);
        }
      }
      else{
        setAvatarUrl(null);
      }

    }, [avatar]);

    //Drop de imagenes por parte del usuario
    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)})
        }, [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png image/jpg",    //Tipo de archivos que acepta
        noKeyboard: true,
        onDrop
    });

    //Return sección donde el usuario elige su avatar en su perfil
    return(
        <div className='upload-avatar' {...getRootProps()}>
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