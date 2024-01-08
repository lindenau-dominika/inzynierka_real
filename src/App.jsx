import './App.css'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import { Gamestats } from './pages/GameStats'
import { LoginPage } from './pages/LoginPage'
import Demo2D from './pages/Demo'
// import Canvas from '../templates/Canvas'
import React, { useState, useEffect } from 'react';




const App = () => {
  return <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo2D />} />
          <Route path="/Login" element={<LoginPage form={'LoginForm'}/>} />
          <Route path="/Register" element={<LoginPage form={'RegisterForm'}/>} />
          <Route path='*' element={<h1>PAGE NOT FOUND</h1>}/>
          <Route path='/statistics/:matchId' element={<Gamestats/>} />
        </Routes>
      </BrowserRouter>
    </>
}

export default App
