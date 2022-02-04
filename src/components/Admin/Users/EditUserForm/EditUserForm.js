import React, { useCallback, useState } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDropzone} from 'react-dropzone';
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import "./EditUserForm.scss";

export default function EditUserForm(props){

    const { user } = props;
    const [ avatar, setAvatar ] = useState(null);
    const [userData, setUserData] = useState({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar
    });


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

    return(
        <div className='upload-avatar' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                //Si no esta activado, muestra el noAvatar
                <Avatar size={150} src={NoAvatar} />
            ) : (
                //Si ya tiene un avatar lo muestra, sino llama al no avatar
                <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
            )}
        </div>
    );
}

//Edita el formulario del usuario para editar
function EditForm(props){
    const { userData, setUserData, updateUser} = props;
    const { Option } = Select;

    return(
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            defaultValue={userData.name}
                            onChange={ e => setUserData({
                                ...userData,
                                name: e.target.value
                            })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined />}
                            placeholder="Apellidos"
                            defaultValue={userData.lastname}
                            onChange={ e => setUserData({
                                ...userData,
                                lastname: e.target.value
                            })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<MailOutlined />}
                            placeholder="Correo Electrónico"
                            defaultValue={userData.email}
                            onChange={ (e) => setUserData({
                                ...userData,
                                email: e.target.value
                            })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                        placeholder="Rol Usuario"
                        onChange={ (e) => setUserData({
                            ...userData,
                            role: e //El rol va a ser igual a la acción seleccionada
                        })}
                        defaultValue={userData.role}
                        >
                            <Option value="admin">
                                Administrador
                            </Option>
                            <Option value="editor">
                                Editor
                            </Option>
                            <Option value="reviewer">
                                Revisor
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>

                </Col>

                <Col span={12}>

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