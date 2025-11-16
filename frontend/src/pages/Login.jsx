import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({handleLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loggedIn = async (e) => {
        e.preventDefault();

        await handleLogin(username, password);
    };

    return(
        <div>
            <h1 className="loginh1">Login</h1>
            
            {error && <p style={{color: 'red'}}>{error}</p>}

            <form className="loginform" onSubmit={loggedIn}>
                <label>Username</label>
                <input
                    className="input"
                    type='text'
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    className="input"
                    type='text'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="loginbtn" type="submit">Login</button>
            </form>
            <h2 className="loginh2">Don't have an account? Register here! </h2>
            <div className="regbtn-container">
                <Link to="/register">
                    <button className="regbtn" type="button">Register</button>
                </Link>
            </div>
        </div>

    )
}

export default Login;