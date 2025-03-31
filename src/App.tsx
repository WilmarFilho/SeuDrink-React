import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Pesquisa from './pages/pesquisa'
import Resultados from './pages/resultados';
import Layout from './layouts/index';



export default function App() {
  return (

    <Router>

      <Routes>

        <Route path="/" element={<Navigate to="/pesquisa" />} />

        <Route path='/' element={<Layout />}>

          <Route path='pesquisa' element={<Pesquisa />}> </Route>
          <Route path='resultado' element={<Resultados />}> </Route>

        </Route>

      </Routes>

    </Router>

  );
};


