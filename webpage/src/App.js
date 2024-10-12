import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/about" element={<About />} />
          <Route path ="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
