import React from 'react'
import { Form, Input, Button, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './NewsLetter.scss'


export default function NewsLetter() {

    const onSubmit = () => {
        console.log("Newsletter Enviado...");
    }

  return (
    <div className='newsletter'>
        <h3>Newsletter</h3>

        <Form onFinish={onSubmit} >
            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}} />}
                    placeholder="Correo electronico"
                    //value=""
                    //onChange={}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-form">
                    ¡Me suscribo!
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
}
