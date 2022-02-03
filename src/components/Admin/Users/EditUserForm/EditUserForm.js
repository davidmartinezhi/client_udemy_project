import React, { useCallback, useState } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col} from 'antd';
import { useDropzone} from 'react-dropzone';
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import "./EditUserForm.scss";

export default function EditUserForm(props){

    const { user } = props;
    const [ avatar, setAvatar ] = useState(null);


    return(
        <div className='edit-user-form'>
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <h2>{user.email}</h2>
        </div>
    );
}

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