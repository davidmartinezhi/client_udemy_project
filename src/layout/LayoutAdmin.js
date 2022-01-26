import React, { useState } from "react";
import { Route , Switch , Redirect } from "react-router-dom";
import { Layout } from "antd";
//import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";

import AdminSignIn from "../pages/Admin/SignIn/SignIn";

import {getAccessTokenApi, getRefreshTokenApi} from "../api/auth";
import useAuth from "../hooks/useAuth";

import "./LayoutAdmin.scss"; 

export default function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();
  const [menuCollapsed, setMenuCollapsed] = useState(false);



  //Llamo Tokens
  /*
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  console.log("Access Token: " + accessToken);
  console.log("Refresh Token: " + refreshToken);
  */

  if (!user) {

    //<Redirect to="/admin/login"/> 
    //Tengo que usar redirect para que me mande a AdminSignIn
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        
      </>
    );
  }

  //if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>

          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>

          <Footer className="layout-admin__footer">
            David Gerardo Martínez
          </Footer>
        </Layout>
      </Layout>
    );
  //}
}


function LoadRoutes ( {routes} ){
    //Map requiere que el hijo siempre tenga una key
    //map debe estar envuelto en llaves al no estar directamente en Router
    return (
        <Switch>
            {routes.map((route, index) => (
            <Route 
                key={index}
                path = {route.path}
                exact = {route.exact}
                component = {route.component}
            /> 
            ))}
        </Switch>
    );

}