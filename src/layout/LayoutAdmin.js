import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();

  //Si el usuario es nulo y ha terminado de cargar
  //<Redirect to="/admin/login" />
  if (!user && !isLoading) {
    return (
      <Route path="/admin/login" component={AdminSignIn} />
  );
  }
   
  if(!user && isLoading) {
    return (<Redirect to="/admin/login" />);
  }
  
  //Si tiene cotendiso y ya termino de cargar
  if (user && !isLoading) {
    //Usuario loggeado correctamente
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
  }

  return null;
}

function LoadRoutes({ routes }) {
  //Map requiere que el hijo siempre tenga una key
  //map debe estar envuelto en llaves al no estar directamente en Router
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
