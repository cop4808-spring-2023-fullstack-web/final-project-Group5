import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home.jsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
