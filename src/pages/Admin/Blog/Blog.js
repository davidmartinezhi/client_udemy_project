import React, { useState, useEffect } from "react";
import { notification, Button } from "antd";
import Modal from "../../../components/Modal";
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';

import "./Blog.scss";

function Blog(props) {

  const {location, history} = props;

  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [modalTitle, setmodalTitle] = useState("");
  const [modalContent, setmodalContent] = useState(null);

  const {page = 1} = queryString.parse(location.search); //Valor default del query en el string
  

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary">Nuevo Post</Button>
      </div>
      <h1>PostList...</h1>
      <h2>Paginación...</h2>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setisVisibleModal}
        width="75%"
      />
    </div>
  );
}

export default withRouter(Blog);