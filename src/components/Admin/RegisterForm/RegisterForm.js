import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import './RegisterForm.scss';

export default function RegisterForm() {
    //Inputs tiene el valor y setInputs actualiza el valor
    const [inputs, setInputs] = useState({
        //Estado default del formulario
        email: "",
        password:"",
        repeatPassword: "",
        privacyPolicy: false
    });
    //Para que cambie de valor, a los inputs se les debe poner un atributo onChange()

    return (
        <Form className="register-form">

            <Form.Item>
                <Input 
                    prefix={<MailOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="register-form__input"
                    value={inputs.email}
                />
            </Form.Item>

            <Form.Item>
            <Input 
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    value={inputs.password}
                />                
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    name="repeatPassword"
                    placeholder="Ingresar nuevamente la contraseña"
                    className="register-form__input"
                    value={inputs.repeatPassword}
                />
            </Form.Item>

            <Form.Item>
                <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy}>
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear Cuenta
                </Button>
            </Form.Item>

        </Form>
    );
};
