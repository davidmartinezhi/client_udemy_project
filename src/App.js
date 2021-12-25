import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import routes from './config/routes';
import AdminHome from './pages/Admin';
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" exact={true} element={<AdminHome/>}/>
      </Routes>
    </Router>
  );
}


export default App;
