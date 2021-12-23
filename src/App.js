import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import "./App.scss";

function App() {
  
  return (
    
      <div className="App">
        <h1>Sistema de rutas basico</h1>
        <Routes>
          <Route exact path="/" component={Home} />
        </Routes>
      </div>
    
  );
}

//Creo los componentes
function Home () {
  return <h2>Estamos en el componente Home</h2>;
}

function Contact () {
  return <h2>Componente Contact...</h2>;
}

function User() {
  return <h2>Estamos en el componente User</h2>;
}

export default App;
