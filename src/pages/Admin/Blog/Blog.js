import React, { useState, useEffect } from "react";
import { notification, Button } from "antd";
import Modal from "../../../components/Modal";

import "./Blog.scss";

export default function Blog() {
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [modalTitle, setmodalTitle] = useState("");
  const [modalContent, setmodalContent] = useState(null);

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
