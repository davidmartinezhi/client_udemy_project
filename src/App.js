import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import routes from './config/routes';
import AdminHome from './pages/Admin';
import "./App.scss";

function App() {
  return (
    <Router>
      {routes.map((route, index) => (
          <RouteWithSubRoutes key={index} route={route} />
        ))}
      <Routes>
        
      </Routes>
    </Router>
  );
}

//Cuando queramos que la función sea un componente, nombre es en mayusculas
//Cuando queramos que el nombre sea un Hook, lo creamos con useNombre
//Cuando queremos una función normal, comienza con minuscula y ya

function RouteWithSubRoutes (props){
  const { route } = props;

  return (
    <Routes>
      {route.routes.map((item, index) => (
        <Route
          key = {index}
          path = {item.path}
          element = {<route.component routes={route.routes}/>}
        />
      ))}
    </Routes>
  );
}

export default App;
