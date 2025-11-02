import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add'
import Help from './pages/Help';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <header className='container site-header'>
          <div className='inside-header'>
          <h1 className='site-title'>Inventory Management Site</h1>
            <nav className='site-nav'>
              <ul className='nav-list'>
                <li className='nav-item'><Link to="/">Home</Link></li>
                <li className='nav-item'><Link to="/add-item">Add Item</Link></li>
                <li className='nav-item'><Link to="/help">Help</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className='site-main'>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-item" element={<Add />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </main>
        <footer className='site-footer'>
          <div className='container'>
            <p>© 2025 Inventory Management Site. All rights reserved.</p>
          </div>
        </footer>
      </Router>
    </div>
  )
}

export default App
