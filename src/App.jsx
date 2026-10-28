import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import RecipeDetail from './Pages/RecipeDetail'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
