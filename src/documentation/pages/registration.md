# Registration Page

## Overview

The `Registration` component is a React functional component that provides a user registration interface. It integrates with the `RegistrationForm` component and handles user account creation by interacting with an authentication API.

## Installation

Ensure you have the necessary dependencies installed before using this component:

```bash
npm install react-router-dom
```

## Dependencies

- **React Router (useNavigate)** - Handles navigation upon successful registration.
- **State Management (useState)** - Manages error handling.
- **Custom Components:**
  - `RegistrationForm` - A reusable form component for user registration.
- **CSS Styling** - Styles are imported from `registration-styles.css`.

## Props

This component does not accept any props.

## Usage

To use the Registration component, import and include it in a route within your React application:

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Features

- **User Registration:**
  - Accepts a username and password input.
  - Sends a POST request to the authentication API.
  - Stores a token in `localStorage` upon successful registration.
  - Redirects the user to the dashboard.

- **Error Handling:**
  - Displays an error message if registration fails.
  - Handles unexpected errors gracefully.

- **Navigation:**
  - Redirects the user to the dashboard upon successful registration.

## Implementation Details

### State Management

```tsx
const [error, setError] = useState<string | null>(null);
const navigate = useNavigate();
```

- `error`: Stores any registration error messages.
- `navigate`: Handles redirection after successful registration.

### Registration Logic

```tsx
const handleRegistration = async (username: string, password: string) => {
    setError(null);
    try {
        const response = await fetch('http://localhost:5001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
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
```

- Sends a POST request to `http://localhost:5001/api/auth/register`.
- If registration fails, an error message is displayed.
- If successful, the received token is stored in `localStorage` and the user is redirected to `/dashboard`.

### UI Components

```tsx
<div className="registration-page">
    <h2 className="registration-title">Please Register</h2>
    {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
    <RegistrationForm onSubmit={handleRegistration} error={error} />
</div>
```

- **Page Title:** Displays "Please Register".
- **Error Message:** Shows any registration errors in red.
- **Registration Form:** Uses the `RegistrationForm` component to handle user input.

## Notes

- Ensure the API endpoint (`http://localhost:5001/api/auth/register`) is running and properly configured.
- Consider encrypting the token in `localStorage` for better security.
- Protect the `/dashboard` route using an authentication guard (e.g., `ProtectedRoute` component).
