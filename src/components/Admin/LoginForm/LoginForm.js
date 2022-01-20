import React, { useState } from "react";

//Ant-Design
import { Form, Input, Button, notification} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

//Variables constantes de access token y refresh token
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

//Scss stylesheet
import "./LoginForm.scss";

//Importada función api que manda la data al backend para checar
import { signInApi } from "../../../api/user";

export default function LoginForm(){

    //Inputs del usuario
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    //Función para actualizar el form, "e" significa evento
    const changeForm = e => {
        setInputs({
            ...inputs, //Para traernos los valores
            [e.target.name]: e.target.value 
            //En email despliega el valor que se escribe en ese input e igual en password
        });
    };

    //Función para el login
    const login = async e => {
        
        //Espera a que se termine de ejecutar la función, antes de continuar
        const result = await signInApi(inputs); //Debe regresar el access y refresh token
        
        //Solo regresa un mensaje cuando hubo un error
        if(result.message){
            notification["error"]({
                message: result.message
            })
        }
        else{
            //Destructuring, saco los tokens del resultado
            const { accessToken, refreshToken} = result;

            //Local storage, en su variable de access_token le mando el accesstoken del resultado
            //Hago lo mismo con el refreshtoken
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
    };

    return(
        <Form className="login-form" onChange={changeForm} onFinish={login}>
            <Form.Item>
                <Input 
                  prefix = {<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                  type = "email"
                  name = "email"
                  placeholder = "Correo Electronico"
                  className = "login-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input 
                  prefix = {<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                  type = "password"
                  name = "password"
                  placeholder = "Constraseña"
                  className = "login-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>        
        </Form>
    );
}