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


    //e significa event, el evento que ocurre para el onChange
    const changeForm = e => {
        //Función que actualiza el forms cuando el usuario interactua con ella
        //Para diferenciar entre el tipo de input que tengo (input y checkbox)
        //Debo checar el name, privacyPolicy es mi checkbox y si es así, la trato como checkbox

        //Si el input es en el checkbox
        if(e.target.name === "privacyPolicy"){
            //Agarro el objeto de los inputs, que en default es vacío
            setInputs({
                //Todos los inpus los dejo igual
                ...inputs,

                //El input en el que estamos actuando, que en este caso es el checkbox
                //Lo checamos
                //Para sacar valor de checkbox, se escribe .checked
                [e.target.name]: e.target.checked,
            });
        }
        //Si el input es normal
        else{
            setInputs({
                ...inputs,
                //Para sacar valor de un input es .value
                [e.target.name]: e.target.value,
            });
        }
    };

    const register = () => {
        console.log(inputs);
    };

    return (
        <Form className="register-form" onFinish={register} onChange={changeForm}>

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
