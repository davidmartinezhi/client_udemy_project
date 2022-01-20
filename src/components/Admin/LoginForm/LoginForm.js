import React, { useState } from "react";

//Ant-Design
import { Form, Input, Button, notification} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

//Scss stylesheet
import "./LoginForm.scss";

export default function LoginForm(){

    //Inputs del usuario
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    //Función para actualizar el form
    const changeForm = () => {
        console.log("djbsbvjfks");
    };

    //Función para el login
    const login = () => {
        //Cuando haga login, voy a mostrar la variable
        console.log(inputs);
    };

    return(
        <Form className="login-form" onChange={changeForm}>
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