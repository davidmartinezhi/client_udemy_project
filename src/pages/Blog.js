import React from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";

 function Blog(props) {
    const {location} = props;
    const pathname = location.pathname;

    console.log(pathname);

  return (
    <div>
      {pathname !== "/blog" ? <h1>Dentro de un post...</h1> : <h1>Lista de posts</h1>}
    </div>
  );
}

export default withRouter(Blog);