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
  //Con esta función nos renderisa la routa en la que estemos, en lugar de tener una gran lista de rutas
  //Con que la ruta exista en config, todo esta bien
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
