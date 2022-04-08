import React, {useState} from 'react';
import { Form, Input, Button, Select, notification} from "antd";
import {FontSizeOutlined} from "@ant-design/icons";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import "./AddMenuWebForm.scss";

export default function AddMenuWebForm( props ) {
    const {setIsVisibleModal, setReloadMenuWeb} = props;

    //Aquí se guardarán los datos del nuevo menú
    const [menuWebData, setMenuWebData] = useState({});


    const addMenu = e => {

        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
        };

        //Validar los datos
        if(!finalData || !finalData.url || !menuWebData.url){
            notification["error"]({message: "Todos los campos son obligatorios."});
        }
        else{
            //Conseguimos access token
            const accessToken = getAccessTokenApi();    //Conseguimos el access token
            finalData.active = false;   //inicializamos el menu como inactivo
            finalData.order = 1000; //mandamos el menú al final

            //Función para agregar el menú a la base de datos
            addMenuApi(accessToken, finalData)
                .then( response => {
                    notification["success"]({message: response});   //Si sale bien, lo notificamos
                    setIsVisibleModal(false);   //Cerramos el modal
                    setReloadMenuWeb(true);   //Recargamos los menus
                    setMenuWebData({}); //Reiniciamos los valores de los objetos que guardan la info
                    finalData = {};
                })
                .catch((err) => {
                    notification["error"]({message: "Error en el servidor"});
                })
        }
        
    }


  return (
    <div className='add-menu-web-form'>
        <AddForm menuWebData={menuWebData} setMenuWebData={setMenuWebData} addMenu={addMenu}/>
    </div>
  );
}

function AddForm( props ){

    const { menuWebData, setMenuWebData, addMenu } = props;

    const { Option } = Select;
    const selectBefore = (
        <Select
            defaultValue = "http://"
            style = {{ width: 90 }}
            onChange = {e => setMenuWebData({...menuWebData, http: e })}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    return (
        <Form className="form-add" onFinish={addMenu}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChange={ e => setMenuWebData({...menuWebData, title: e.target.value })}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={ e => setMenuWebData({...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Menú
                </Button>
            </Form.Item>
        </Form>
    );
}