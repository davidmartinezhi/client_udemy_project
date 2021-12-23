import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import "./App.scss";

function App() {
  
  return (
    <Router>
      <div className="App">
      
        <h1>Sistema de rutas basico</h1>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
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

function User() {
  return (
    <div>
      <h2>Estamos en el componente User</h2>
    </div>
  );
}

export default App;
