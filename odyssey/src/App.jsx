import { Navbar } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Explore, Itinerary, Trips, Favorites } from './pages';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/itinerary" element={<Itinerary />}></Route>
          <Route path="/trips" element={<Trips />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
