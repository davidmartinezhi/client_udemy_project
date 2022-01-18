import React from "react";

//Ant-Design
import { Form, Input, Button, notification} from "antd";
import {UserOutlined} from "@ant-design/icons";

//Scss stylesheet
import "./LoginForm.scss";

export default function LoginForm(){
    return(
        <Form className="login-form">
            <Form.Item>
                <Input 
                  prefix = {<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                  type = "email"
                  name = "email"
                  placeholder = "Correo Electronico"
                  className = "login-form__input"
                />
            </Form.Item>
        </Form>
    );
}