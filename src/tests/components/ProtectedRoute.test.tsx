import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';

describe('ProtectedRoute Component', () => {
  test('renders children when authenticated', () => {
    localStorage.setItem('token', 'test-token');
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
    localStorage.removeItem('token');
  });

  test('redirects to home when not authenticated', () => {
    localStorage.removeItem('token');
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/"
            element={<div>Home Page</div>}
          />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(queryByText('Protected Content')).not.toBeInTheDocument();
    expect(queryByText('Home Page')).toBeInTheDocument();
  });

  test('redirects to the correct URL when not authenticated', () => {
    localStorage.removeItem('token');
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/"
            element={<div>Home Page</div>}
          />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(queryByText('Protected Content')).not.toBeInTheDocument();
    expect(queryByText('Home Page')).toBeInTheDocument();
  });

  test('renders different child components when authenticated', () => {
    localStorage.setItem('token', 'test-token');
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Another Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Another Protected Content')).toBeInTheDocument();
    localStorage.removeItem('token');
  });

  test('handles edge cases when localStorage is empty or contains invalid data', () => {
    localStorage.setItem('token', '');
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/"
            element={<div>Home Page</div>}
          />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(queryByText('Protected Content')).not.toBeInTheDocument();
    expect(queryByText('Home Page')).toBeInTheDocument();

    localStorage.removeItem('token');
  });
});