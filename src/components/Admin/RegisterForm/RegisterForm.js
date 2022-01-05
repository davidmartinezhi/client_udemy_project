import React from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import {MailOutlined, LockOutlined} from "@ant-design/icons";

import './RegisterForm.scss';

export default function RegisterForm() {
    return (
        <Form className="register-form">

            <Form.Item>
                <Input 
                    prefix={<MailOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
            <Input 
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                />                
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    name="repeatPassword"
                    placeholder="Ingresar nuevamente la contraseña"
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Checkbox name="privacyPolicy">
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Form.Item>

            <Form.Item>
                <Button>
                    Crear Cuenta
                </Button>
            </Form.Item>

        </Form>
    );
};
