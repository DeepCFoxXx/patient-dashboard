import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    fetchMock.resetMocks();
    (jest.requireMock('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders the login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows user input for username and password', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testUser');
    expect(passwordInput).toHaveValue('password123');
  });

});