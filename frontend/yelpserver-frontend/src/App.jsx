import { Search, Home, Auto, Details, Reviews } from './pages'
import { Navigation } from './components'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auto" element={<Auto />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details" element={<Details />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
