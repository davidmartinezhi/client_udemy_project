import React, { useState, useEffect } from "react";
import { notification, Button } from "antd";
import Modal from "../../../components/Modal";
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import { getPostsApi } from "../../../api/post";
import PostsList from "../../../components/Admin/Blog/PostsList";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";

import "./Blog.scss";

function Blog(props) {
  const { location, history } = props;

  //modal states
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //posts states
  const [posts, setPosts] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false); //forzar recargado de posts

  const { page = 1 } = queryString.parse(location.search); //Valor default del query en el string

  //Cada vez que actualizemos la pagina, agarra sus valores correspondientes
  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if(response?.code !== 200){
          notification["warning"]({message: response.message});
        }else{
          setPosts(response.posts)
        }
      })
      .catch((err) => {
        notification["error"]({ message: "Error del servidor" });
      });

      setReloadPosts(false);
  }, [page, reloadPosts]);


  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={null}
      />
    );
  };

  if(!posts){
    return null;
  }


  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button onClick={addPost} type="primary">Nuevo Post</Button>
      </div>
      <h1>PostList...</h1>
      <PostsList posts={posts} setReloadPosts={setReloadPosts} />
      <Pagination posts={posts} location={location} history={history} />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default withRouter(Blog);