import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import DOMPurify from 'dompurify';
import LoginForm from '../../components/LoginForm';

function createPendingPromise() {
  let resolvePromise: () => void;
  const promise = new Promise<void>(resolve => {
    resolvePromise = resolve;
  });
  return { promise, resolvePromise: resolvePromise! };
}

describe('LoginForm Component', () => {
  const mockOnSubmit = jest.fn((username: string, password: string): Promise<void> => { void username; void password; return Promise.resolve(undefined); });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);

    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows user input for username and password', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testUser');
    expect(passwordInput).toHaveValue('password123');
  });

  test('sanitizes input and prevents SQL injection', () => {
    window.alert = jest.fn();

    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "DROP TABLE users; --" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Invalid input detected.");
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('calls onSubmit when valid credentials are entered', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'validUser' } });
    fireEvent.change(passwordInput, { target: { value: 'securePass123' } });

    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('validUser', 'securePass123');
  });

  test('displays error message when login fails', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error="Invalid credentials" />);

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  test('toggles password visibility when the eye icon is clicked', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);

    const passwordInput = screen.getByLabelText(/Password:/i);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('prevents submission if username or password is empty', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);

    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  test('sanitizes user input before submission', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);

    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: '<script>alert("hacked")</script>' } });
    fireEvent.change(passwordInput, { target: { value: '<img src=x onerror=alert(1)>' } });

    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      DOMPurify.sanitize('<script>alert("hacked")</script>'),
      DOMPurify.sanitize('<img src=x onerror=alert(1)>')
    );
  });

  test('disables submit button while the form is being submitted', async () => {
    const { promise, resolvePromise } = createPendingPromise();
    const mockOnSubmit = jest.fn(() => promise);
    render(<LoginForm onSubmit={mockOnSubmit} error={null} />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.change(screen.getByLabelText(/username:/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password:/i), { target: { value: 'password' } });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => expect(submitButton).toBeDisabled());
    act(() => {
      resolvePromise();
    });
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });

});