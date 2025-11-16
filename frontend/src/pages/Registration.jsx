import { useState } from "react";
import { Link } from 'react-router-dom';


function Register({ handleRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await handleRegister(username, password);
  };

  return (
    <div className="register-page">
      <h2 className="loginh1">Create an Account</h2>
      <form className="loginform" onSubmit={onSubmit}>
        <label>
          Username:
          <input 
            className="input"
            type="text" 
            placeholder="Username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <label>
          Password:
          <input 
            className="input"
            type="text" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <button className="loginbtn" type="submit">Register</button>
      </form>
      <div>
        <p className="registerlink">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}

export default Register;