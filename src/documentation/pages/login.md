# Login Component

## Overview

The `Login` component is a React functional component that provides a user authentication interface. It allows users to enter their username and password, authenticate with an API, and navigate to the dashboard upon successful login.

## Installation

Ensure you have the necessary dependencies installed before using this component:

```bash
npm install react-icons react-router-dom
Dependencies
React Router (useNavigate) - Handles navigation upon successful login.
State Management (useState) - Manages form input values, error handling, and password visibility.
Icons (react-icons/fa) - Provides eye/eye-slash icons for toggling password visibility.
CSS Styling - Styles are imported from login-styles.css.
Props
This component does not accept any props.

Usage
To use the Login component, import and include it in a route within your React application:

tsx
Copy
Edit
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
Features
User Authentication:
Accepts username and password input.
Sends a POST request to the authentication API.
Stores a token in localStorage upon successful login.
Redirects the user to the dashboard.
Password Visibility Toggle:
Uses FaEye and FaEyeSlash icons to show/hide the password.
Error Handling:
Displays an error message if authentication fails.
Handles unexpected errors gracefully.
Navigation:
Redirects the user to the dashboard upon successful login.
Provides a link to the registration page for new users.
Implementation Details
State Management
tsx
Copy
Edit
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState<string | null>(null);
const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
username and password: Stores the user’s input values.
error: Stores any login error messages.
showPassword: Toggles password visibility.
navigate: Handles redirection after login.
Authentication Logic
tsx
Copy
Edit
const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unexpected error occurred');
        }
    }
};
Sends a POST request to http://localhost:5001/api/auth/login.
If authentication fails, an error message is displayed.
If successful, the received token is stored in localStorage and the user is redirected to /dashboard.
Password Visibility Toggle
tsx
Copy
Edit
<span onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
</span>
Clicking the icon toggles the password input between text and password types.
UI Components
tsx
Copy
Edit
<div className="login-page">
    <h2 className="sign">Welcome Please Login</h2>
    {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
    <form className="form1" onSubmit={handleLogin}>
        <input className="un" type="text" value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" required />

        <div className="password-input">
            <input className="pass" type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" required />
            <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
        </div>

        <button className="submit" type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="/register">Register here</a></p>
</div>
Login form with username and password inputs.
Password visibility toggle.
Error message display (if applicable).
Link to registration page.
Notes
Ensure the API endpoint (http://localhost:5001/api/auth/login) is running and properly configured.
Consider encrypting the token in localStorage for better security.
Protect the /dashboard route using an authentication guard (e.g., ProtectedRoute component).
