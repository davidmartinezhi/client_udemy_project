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

  const processPost = (e) => {
    const { title, url, description, date } = postData;

    if (!title || !url || !description || !date) {
      notification["error"]({ message: "Todos los campos son obligatorios." });
    } else {
      if (!post) {
        addPost();
      } else {
        console.log("editando post...");
        console.log(postData);
      }
    }
  };

  const addPost = () => {
    const token = getAccessTokenApi();
    addPostApi(token, postData)
        .then(response => {
            const typeNotification = response.code == 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisibleModal(false); //cerramos modal
            setReloadPosts(true); //refrescamos los posts para que se actualicen
            setPostData({}); //reseteamos el valor de postData
        })
        .catch( () => {
            notification["error"]({message: "Error del servidor."})
        });
        
  }

  return (
    <div className="add-edit-post-form">
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
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
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder="URL"
            value={postData.url}
            onChange={(e) =>
              setPostData({
                ...postData,
                url: transformTextToUrl(e.target.value),
              })
            }
          />
        </Col>
        <Col span={8}>
          <DatePicker
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de publicación"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            value={postData.date && moment(postData.date)}
            onChange={(e, value) =>
              setPostData({
                ...postData,
                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
              })
            }
          />
        </Col>
      </Row>

      <Editor
        value={postData.description ? postData.description : ""}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help"
        }}
        onBlur={e =>
          setPostData({ ...postData, description: e.target.getContent() })
        }
      />
      <Button type="primary" htmlType="submit" className="btn-submit">
        {post ? "Actualizar Post" : "Crear Post"}
      </Button>
    </Form>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}