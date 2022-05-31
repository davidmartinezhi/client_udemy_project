import React from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";

import PostListWeb from "../components/Web/Blog/PostListWeb";

 function Blog(props) {
    const {location, history} = props;
    const pathname = location.pathname;

    // console.log(pathname);

  return (
    <Row>
        <Col md={4}/>
        <Col md={16}>
            {pathname !== "/blog" ? (
               " PostInfo"
            ): (
               <PostListWeb location={location} history={history}/>
            )}
        </Col>
        <Col md={4}/>
    </Row>
  );
}

export default withRouter(Blog);