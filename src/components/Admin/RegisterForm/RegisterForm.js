import React, { useReducer, useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { emailValidation, minLengthValidation} from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';

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

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })

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


    const inputValidation = e => {
        const {type, name, } = e.target;
        console.log(e);
        if(type === 'email'){
            setFormValid({...formValid, [name]: emailValidation(e.target)});
        }

        if(type === 'password'){
            setFormValid({...formValid,[name]: minLengthValidation(e.target, 6)});
        }

        if(type === 'checkbox'){setFormValid({...formValid,[name]: e.target.checked});
        }

    };

    const register = async e => {
        const {email, password, repeatPassword, privacyPolicy} = formValid;

        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        if(!emailVal|| !passwordVal || !repeatPasswordVal || !privacyPolicyVal){
            notification['error']({
                message: "Todos los campos son obligatorios."
            });
        }
        else{
            if(passwordVal != repeatPasswordVal){
                notification['error']({
                    message: "Las contraseñas no coinciden."
                });
            }
            else{
                //Funcion siendo asincronica y el await
                //Se espera hasta que se termine de correr el codigo, para correr a la siguiente linea
                const result = await signUpApi(inputs); //Regresa el objeto response.
                
                //Si se lleva a cabo el sign up, notifica al usuario de ello
                
                if(!result.ok){ //Si respuesta objeto que resivimos, tiene ok === false
                    notification['error']({ //Notificamos error
                        message: result.message
                    });
                }
                else{   //De lo contrario
                    notification['success']({ //Notificamos que fue exitoso
                        message: result.message
                    });
                }
            }

        }
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
                    onChange={inputValidation}
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
                    onChange={inputValidation}
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
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>

            <Form.Item>
                <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy} onChange={inputValidation}>
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
