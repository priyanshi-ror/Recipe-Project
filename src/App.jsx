import Navbar from './Components/Navbar'
import { Link, Route, Routes } from 'react-router-dom'
import RecipeDetail from './Pages/RecipeDetail'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer">
        <Link to="/" className="footer-brand">savorly<span>.</span></Link>
        <p>A little more love on your plate.</p>
        <span className="footer-note">Made for the joy of a good meal <span aria-hidden="true">✳</span></span>
      </footer>
    </div>
  )
}

export default App
