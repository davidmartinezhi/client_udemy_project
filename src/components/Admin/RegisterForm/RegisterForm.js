import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { MailOutlined, LockOutlined } from "@ant-design/icons";

//Funciones para validar formulario
import { emailValidation, minLengthValidation} from '../../../utils/formValidation';

//Manda información para guardar usuario en la base de datos y regresa confirmacion 
import { signUpApi } from '../../../api/user';

import './RegisterForm.scss';   //Estilos del registerForm

export default function RegisterForm() {
    
    //Valores en el formulario y base de datos, para la creación de usuario
    //Inputs tiene el valor y setInputs actualiza el valor
    const [inputs, setInputs] = useState({
        //Estado default del formulario
        email: "",
        password:"",
        repeatPassword: "",
        privacyPolicy: false
    });
    //Para que cambie de valor
    //Los inputs se les debe poner un atributo onChange() en el FORM y crear la funcion para que muestre el cambio

    //Validación de valores en el formulario
    const [formValid, setFormValid] = useState({
        //Estado default de las validaciones
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })

    //e significa event, el evento que ocurre para el onChange
    //Para poder modificar en tiempo real el formulario
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

    //Para validar el input
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

    //Para registrar al usuario nuevo en la base de datos
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
                    resetForm();    //Regresa el formulario a sus valores default
                }
            }

        }
    };

    //Para regresar el formulario a su estado default
    const resetForm = ( ) => {
        const input = document.getElementsByTagName('input');

        for(let i = 0; i < inputs.length; i++){
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setInputs({
            //Regreso el formulario a su estado default
            email: "",
            password:"",
            repeatPassword: "",
            privacyPolicy: false    
        });

        setFormValid({
            //Regreso a su valor default las variables que validan el formulario
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false           
        });
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
