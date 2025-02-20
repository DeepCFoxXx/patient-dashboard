import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import Registration from '../../pages/Registration';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Registration Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    fetchMock.resetMocks();
    (jest.requireMock('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders the registration form', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Password/i).length).toBe(2);
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('allows user input for username and password', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getAllByPlaceholderText(/Password/i)[0];

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testUser');
    expect(passwordInput).toHaveValue('password123');
  });

});
