import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Gamestats } from './pages/GameStats'
import { LoginPage } from './pages/LoginPage'


function App() {
  
  return <div>
      <Router>
        <Routes>

          <Route path="/home" element={<Home />} />
          <Route path="/Login" element={<LoginPage form={'LoginForm'}/>} />
          <Route path="/Register" element={<LoginPage form={'RegisterForm'}/>} />
          <Route path='*' element={<h1>PAGE NOT FOUND</h1>}/>
          <Route path='/statistics' element={<Gamestats/>} />
        </Routes>
      </Router>
    </div>
}

export default App
