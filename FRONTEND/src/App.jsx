import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Dashboard from './pages/Dashboard'
import Teams from './pages/Teams'
import Players from './pages/Players'
import AuctionRoom from './pages/AuctionRoom'
import SoldPlayers from './pages/SoldPlayers'
import TeamPlayers from './pages/TeamPlayers'
import PlayerInfo from './pages/PlayerInfo'
import ListofPlayer from './pages/ListofPlayer'

const App = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/teams" element={<Teams />} />
      <Route path="/admin/players" element={<Players />} />
      <Route path="/admin/auction-room/:id" element={<AuctionRoom />} />
      <Route path="/admin/sold-players" element={<SoldPlayers />} />
      <Route path="/admin/teams/:teamId" element={<TeamPlayers />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/player-info/:id" element={<PlayerInfo />} />
      <Route path="/players-list" element={<ListofPlayer />} />
    </Routes>
  )
}

export default App
