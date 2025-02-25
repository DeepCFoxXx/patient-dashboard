# RegistrationForm Component

## Overview

The `RegistrationForm` component is a React functional component that provides a registration form for users to create an account. It includes username and password fields, client-side validation, and protection against potential security vulnerabilities such as SQL injection.

## Installation

Ensure you have the necessary dependencies installed:

```bash
npm install react-icons
```

## Dependencies

- **React Hooks (useState)** - Manages form state.
- **Icons (react-icons/fa)** - Displays password visibility toggles.
- **Custom Types (RegistrationFormProps)** - Defines the expected props.
- **CSS Styling** - Custom styles are used for layout and design.

## Props

| Prop Name | Type | Description |
|-----------|------|-------------|
| onSubmit | `(username: string, password: string) => void` | Callback function triggered on form submission. |

## Usage

To use the RegistrationForm component, import and include it in a registration page:

```tsx
import RegistrationForm from "./components/RegistrationForm";

const handleRegistration = (username: string, password: string) => {
    console.log("User registered:", username, password);
};

const RegistrationPage = () => {
    return (
        <div>
            <h2>Register</h2>
            <RegistrationForm onSubmit={handleRegistration} />
        </div>
    );
};

export default RegistrationPage;
```

## Features

- **User Input Fields:**
  - Username input.
  - Password input with visibility toggle.
  - Confirm Password field.

- **Form Validation:**
  - Prevents submission if passwords do not match.
  - Sanitizes input to prevent XSS.
  - Checks for potential SQL injection attempts.

- **Security Measures:**
  - **XSS Prevention:** Removes `<script>` tags and HTML elements from input.
  - **SQL Injection Prevention:** Blocks SQL-related keywords and special characters.

- **Password Visibility Toggle:** Users can show/hide password fields using the FaEye and FaEyeSlash icons.

## Implementation Details

### State Management

```tsx
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
```

- Manages username, password, and confirm password states.
- Controls password visibility toggles.

### Input Validation

#### XSS Protection

```tsx
const sanitizeInput = (input: string) => {
  return input.replace(/<[^>]*>/g, '');
};
```

- Removes any `<script>` or HTML tags from user input.

#### SQL Injection Prevention

```tsx
const isInputValid = (input: string) => {
  const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|UNION|--|\/\*|;)\b)/i;
  return !sqlInjectionPattern.test(input);
};
```

- Blocks common SQL injection patterns.

### Form Submission

```tsx
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    if (!isInputValid(sanitizedUsername) || !isInputValid(sanitizedPassword)) {
      alert("Invalid input detected.");
      return;
    }

    onSubmit(sanitizedUsername, sanitizedPassword);
};
```

- Prevents form submission if passwords do not match.
- Sanitizes input before passing data to onSubmit.
- Alerts the user if invalid input is detected.

### UI Components

```tsx
<form className="registration-form" onSubmit={handleSubmit}>
  <div className="
