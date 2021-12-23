import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import "./App.scss";

function App() {
  
  return (
    <Router>
      <div className="App">
      
        <h1>Sistema de rutas basico</h1>
        <Link to="/">Home</Link> 
        <br/>
        <Link to="/contact">Contact</Link> 
        <br/>
        <Link to="/user">User</Link> 
        <br/> <br/> <br/> <br/>

        <Routes>
          <Route exact path="/"  element={<Home/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/user" element={<User/>} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </div>
    </Router>
  );
}

//Creo los componentes
function Home () {
  return (
    <div>
      <h2>Estamos en el componente Home</h2>
    </div>
  );
}

function Contact () {
  return (
    <div>
      <h2>Componente Contact...</h2>
    </div>
  );
}

function User () {
  return (
    <div>
      <h2>Estamos en el componente User</h2>
    </div>
  );
}

function Error404 () {
  return (
    <div>
      <h2>Error 404...</h2>
    </div>
  );
}

export default App;
