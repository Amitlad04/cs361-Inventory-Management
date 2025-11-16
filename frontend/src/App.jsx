import { Routes, Route, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from './pages/Home';
import Add from './pages/Add'
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Registration'
import './App.css';

function App() {
  const [isloggedIn, setIsloggedIn] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    validateSession();
  }, []);
  
  const validateSession = async () => {
    const response = await fetch(
        `/auth/validate-session`, {method: 'GET'}
    );

    const data = await response.json();

    if (response.status === 200) {
        console.log('Session validated successfully.');
        setIsloggedIn(true);
    } else {
        console.log(`Session is not valid. ${response.status}`);
        setIsloggedIn(false);
    }
    console.log(data);
  }

  const handleLogin = async (username, password) => {
    const response = await fetch(
        `/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        }
    );

    const data = await response.json();

    if (response.status === 200){
        console.log("Successfully logged in.");
        setIsloggedIn(true);
        navigate("/", { replace: true });
        alert("Successfully logged in.");
    } else {
        console.log("Failed to log in: " + response.status);
        alert("Failed to log in: " + response.status);
    }
    console.log(data);
  }

  const handleRegister = async (username, password) => {
    const response = await fetch(
        `/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        }
    );

    const data = await response.json();

    if (response.status === 201){
        console.log("User succesfully registered.");
        alert("Account created! Please log in.");
        navigate("/login");
    } else {
        console.log("User registration failed.");
        alert("Registration failed.");
    }
    console.log(data);
  }

  const deleteSession = async () => {
    const response = await fetch(
        `/auth/logout`, {method: 'POST'}
    );

    const data = await response.json();

    if (response.status === 200) {
        console.log('Session destroyed - Successfully logged out.');
        alert('Successfully logged out.');
        setIsloggedIn(false);
        navigate("/", { replace: true });
    } else {
        console.log(`Failed to log out. ${response.status}`);
        alert(`Failed to log out. ${response.status}`);
    }
  }
  
  if (!isloggedIn) {
    return(
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register handleRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  return (
      <div className="app">
        <header className='container site-header'>
          <div className='inside-header'>
            <h1 className='site-title'>Inventory Management Site</h1>
            <nav className='site-nav'>
              <ul className='nav-list'>
                <li className='li'><Link to="/">Home</Link></li>
                <li className='li'><Link to="/add-item">Add Item</Link></li>
                <li className='li'><Link to="/help">Help</Link></li>
                <li>
                  <button onClick={deleteSession} className="logoutbtn">
                    Logout
                  </button>
                </li>
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
        <footer className="site-footer">
          <div className="container">
            <p>© 2025 Inventory Management Site. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
}

export default App;
