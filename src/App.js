import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider'; 

import "./App.scss";

function App() {
  //Envolvemos la pagina web con el useAuth para siempre saber si esta loggeado el usuario

  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

//Cuando queramos que la función sea un componente, nombre es en mayusculas
//Cuando queramos que el nombre sea un Hook, lo creamos con useNombre
//Cuando queremos una función normal, comienza con minuscula y ya


function RouteWithSubRoutes (route){
  //Con esta función nos renderisa la routa en la que estemos, en lugar de tener una gran lista de rutas
  //Con que la ruta exista en config, todo esta bien
  //La función solo pide que nos renderice las rutas de la configuración

  return (
    <Route
          path = {route.path}
          exact = {route.exact}
          render = {props => <route.component routes={route.routes} {...props}/>}
    />
    
  );
}

export default App;
