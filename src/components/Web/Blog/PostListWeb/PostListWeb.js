import React, { useState, useEffect } from "react";
import { Spin, List, notification } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
import { getPostsApi } from "../../../../api/post";
import "moment/locale/es";

import "./PostListWeb.scss";

export default function PostListWeb(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => {
        notification["error"]({ message: "Error del servidor." });
      });
  }, [page]);

  if (!posts) {
    return (
      <Spin tip="cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <div className="posts-list-web">
      <h1>Blog</h1>
      <List
        dataSource={posts.docs}
        renderItem={(post) => <Post post={post} />}
      />
      <Pagination posts={posts} location={location} history={history} />
    </div>
  );
}

function Post(props) {
  const { post } = props;
  console.log(post);
  const day = moment(post.date).format("DD");
  const month = moment(post.date).format("MMMM");

  return (
    <List.Item className="post">
            <Link to={`blog/${post.url}`}>
        <List.Item.Meta title={post.title} />
      </Link>
      <div className="post__date">
        <span>{day}</span>
        <span>{month}</span>
      </div>

    </List.Item>
  );
}
