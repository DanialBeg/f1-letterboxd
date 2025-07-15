import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SeasonPage from './pages/SeasonPage'
import RacePage from './pages/RacePage'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/seasons/:year" element={<SeasonPage />} />
            <Route path="/races/:id" element={<RacePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
