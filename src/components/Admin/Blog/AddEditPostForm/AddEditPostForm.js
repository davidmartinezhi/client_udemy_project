import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { addPostApi } from '../../../../api/post';
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, []);

  const processPost = e => {
      if(!post){
          console.log("creando post...");
          console.log(postData);
      }else{
          console.log("editando post...");
          console.log(postData);

      }
  }

  return (
    <div className="add-edit-post-form">
      <AddEditForm postData={postData} setPostData={setPostData} post={post} processPost={processPost} />
    </div>
  );
}

function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;

  return (
    <Form className="add-edit-form" layout="inline" onFinish={processPost}>
      <Row gutter={24}>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Titulo"
            value={postData.title}
            onChange={e => setPostData({...postData, title: e.target.value})}
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="URL"
            value={postData.url}
            onChange={e => setPostData({...postData, url: transformTextToUrl(e.target.value)})}
          />
        </Col>
        <Col span={8}>
          <DatePicker
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de publicación"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            value={postData.date && moment(postData.date)}
            onChange={ (e, value) => setPostData(
                {...postData, 
                    date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
                })}
          />
        </Col>
      </Row>

      <Editor
        apiKey="your-api-key"
        value={postData.description ? postData.description : ""}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={e => setPostData({ ...postData, description: e.target.getContent() })}
      />
      <Button type="primary" htmlType="submit" className="btn-submit">
        { post ? "Actualizar Post": "Crear Post"}      
    </Button> 
    </Form>
  );
}

function transformTextToUrl(text){
    const url = text.replace(" ", "-");
    return url.toLowerCase();
}