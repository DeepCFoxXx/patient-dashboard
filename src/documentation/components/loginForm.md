# LoginForm Component

## Overview

The `LoginForm` component is a React functional component that allows users to log in by entering their username and password. It includes basic input validation to prevent SQL injection attacks and provides visual feedback during form submission.

## Installation

To use the `LoginForm` component, ensure you have `react`, `dompurify`, and `react-icons` installed in your project. If you haven't installed these yet, you can do so with the following command:

```bash
npm install react dompurify react-icons
Props
The LoginForm component accepts the following props:

onSubmit
Type: (username: string, password: string) => Promise<void>
Required: Yes
Description: A function that is called when the form is submitted. It receives the sanitized username and password as arguments and returns a promise.
error
Type: string | null
Required: No
Description: An optional error message that will be displayed below the password input field if provided.
State Variables
The LoginForm component manages the following local state variables:

username: The username entered by the user.
password: The password entered by the user.
showPassword: A boolean indicating whether the password should be visible.
loading: A boolean indicating whether the form is currently submitting.
Validation
The component includes validation to ensure:

Both username and password fields are filled before submission.
Input is sanitized using DOMPurify to prevent XSS attacks.
The input does not contain SQL injection patterns using a regular expression.
Usage
Here’s an example of how to use the LoginForm component in your React application:

jsx
Copy
Edit
import React from 'react';
import LoginForm from './LoginForm';

const App = () => {
  const handleLoginSubmit = async (username, password) => {
    // Handle login logic here (e.g., API call)
    console.log('Logging in with:', username, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLoginSubmit} error={null} />
    </div>
  );
};

export default App;
Features
Password Visibility Toggle: Users can toggle the visibility of their password using an eye icon.
Error Display: If an error occurs, it will be displayed below the password input field.
Loading State: A loading message is shown on the submit button while the login request is processing.
Notes
The component uses Font Awesome icons for the password visibility toggle. Ensure you have the appropriate CSS or library loaded to display the icons correctly.
Make sure to handle the login logic in the onSubmit function provided.
