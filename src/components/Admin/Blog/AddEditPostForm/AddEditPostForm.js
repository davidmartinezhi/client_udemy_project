import React, {useState, useEffect} from 'react'
import {Row, Col, Form, Input, Button, DatePicker, notification} from 'antd'
import {FontSizeOutlined, LinkOutlined} from '@ant-design/icons'
import moment from 'moment'
import { Editor } from '@tinymce/tinymce-react'
import {getAccessTokenApi} from '../../../../api/auth'

import './AddEditPostForm.scss'

export default function AddEditPostForm(props) {
    const {setIsVisibleModal, setReloadPosts, post} = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
      if(post){
          setPostData(post);
      }else{
          setPostData({});
      }
    }, []);
    

  return (
    <div className='add-edit-post-form'>
        <AddEditForm postData={postData} setPostData={setPostData} post={post}/>
    </div>
  )
}

function AddEditForm(props){
    const {postData, setPostData, post} = props;

    return(
        <Form
            className='add-edit-form'
            layout="inline"
        >
            <Row gutter={24}>
                <Col span={8}>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo"
                    //value={}
                    //onChange={}
                />
                </Col>
                <Col span={8}>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="URL"
                    //value={}
                    //onChange={}
                />
                </Col>
                <Col span={8}>
                <DatePicker 
                    style={{width: "100%"}}
                    format="DD/MM/YYYY HH:mm:ss"
                    placeholder="Fecha de publicación"
                    showTime={{defaultValue: moment("00:00:00", "HH:mm:ss")}}
                    //value={}
                    //onChange={}
                />
                </Col>
            </Row>
        </Form>
    )
}