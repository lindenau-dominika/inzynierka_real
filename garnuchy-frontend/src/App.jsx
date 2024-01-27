import { useState } from 'react'
import './App.css'
import Home from './components/HomePage'
import Matches from './components/MatchesPage'
import MatchDetails from './components/MatchDetails'
import {BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import PlayersPage from './components/PlayersPage'

function App() {
  return <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:matchId/general" element={<MatchDetails />} />
          <Route path="/players" element={<PlayersPage />} />
          {/*
          <Route path="/matches/:matchId/utility" element={<MatchUtility />} />
          <Route path="/matches/:matchId/impact" element={<MatchImpact />} />
          <Route path="/matches/:matchId/clutches" element={<MatchClutches />} />+
          <Route path="/matches/:matchId/aim" element={<MatchAim />} />
          <Route path='/statistics/:steamId' element={<PlayerProfile />} /> */}
          <Route path='*' element={<h1>PAGE NOT FOUND</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
}

export default App
