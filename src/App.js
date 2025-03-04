import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './componentes/Layout'
import Create from './componentes/Create';
import Edit from './componentes/Edit';
import Show from './componentes/Show';
import Login from './componentes/Login';




const App =() => {
  return (
   
    <BrowserRouter>     
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Show" element={<Layout><Show /></Layout>} />
        <Route path="/Create" element={<Layout><Create /></Layout>} />
        <Route path="/Edit/:id" element={<Layout><Edit /></Layout>} />  
        
    </Routes>
    </BrowserRouter>
   
  );
};

export default App;
