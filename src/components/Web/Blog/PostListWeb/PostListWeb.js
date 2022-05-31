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
      .then(response => {
          if(response?.code !== 200){
            notification["warning"]({message: response.message})
          }
          else{
              setPosts(response.posts);
          }
      })
      .catch(() =>{
          notification["error"]({message: "Error del servidor."})
      })
  }, [page]);


  return (
    <div>
      <h1>PostListWeb...</h1>
    </div>
  );
}
