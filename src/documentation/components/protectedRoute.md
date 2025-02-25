# ProtectedRoute Component

## Overview

The `ProtectedRoute` component is a React functional component that serves as a wrapper for protected routes in a React application. It checks if the user is authenticated based on the presence of a token in local storage. If the user is authenticated, it renders the child components; otherwise, it redirects the user to the home page.

## Installation

To use the `ProtectedRoute` component, ensure you have `react` and `react-router-dom` installed in your project. If you haven't installed these yet, you can do so with the following command:

```bash
npm install react react-router-dom
```

## Props

The ProtectedRoute component accepts the following props:

- **children**
  **Type:** `React.ReactNode`
  **Required:** Yes
  **Description:** The child components to be rendered if the user is authenticated.

## Usage

Here’s an example of how to use the ProtectedRoute component in your React application:

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
```

## Features

- **Authentication Check:** Automatically checks for a token in local storage to determine if the user is authenticated.
- **Redirection:** Redirects unauthenticated users to the home page.
- **Reusability:** Can be used to protect any number of routes by wrapping them in the ProtectedRoute component.

## Implementation Details

- The component retrieves the token from localStorage using `localStorage.getItem('token')`.
- It determines if the user is authenticated by checking if the token exists and is not an empty string.
- If authenticated, the children are rendered. If not, the component uses the `<Navigate />` component from react-router-dom to redirect to the specified route (in this case, the home route `/`).

## Notes

- Ensure that the token is properly set in local storage during the login process for the authentication check to work.
- The component can be easily extended to include additional authentication logic or redirection routes if needed.
