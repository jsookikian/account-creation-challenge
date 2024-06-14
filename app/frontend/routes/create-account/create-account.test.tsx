import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CreateAccount } from './create-account';
import { useCreateAccount } from 'app/frontend/hooks/useCreateAccount';
import userEvent from '@testing-library/user-event';

jest.mock('app/frontend/hooks/useCreateAccount');

const renderComponent = () =>
  render(
    <Router>
      <CreateAccount />
    </Router>
  );

describe('CreateAccount', () => {
  const user = userEvent.setup()
  const createAccount = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    (useCreateAccount as jest.Mock).mockReturnValue({
      createAccount,
      status: null,
      error: null
    });
  });

  it('renders CreateAccount component', () => {
    renderComponent();
    expect(screen.getByText('Create New Account')).toBeInTheDocument();
  });

  it('submits the form when valid', async () => {
    renderComponent();

    const usernameInput = screen.getByTestId('username-input-field');
    const passwordInput = screen.getByTestId('password-input-field');
    const submitButton = screen.getByText('Create Account');

    fireEvent.input(usernameInput, { target: { value: 'validusername' } });
    fireEvent.input(passwordInput, { target: { value: 'validpassword123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createAccount).toHaveBeenCalledWith({ username: 'validusername', password: 'validpassword123' });
    });
  });

  it('shows validation error for short username', async () => {
    renderComponent();
    const usernameInput = screen.getByTestId('username-input-field');
    user.type(usernameInput, "short");
    fireEvent.blur(usernameInput);

    await waitFor(() => {
      expect(screen.getByText('Username must be between 10 and 50 characters.')).toBeInTheDocument();
    });
  });

  it('shows validation error for weak password', async () => {
    renderComponent();
    const passwordInput = screen.getByTestId('password-input-field');
    user.type(passwordInput, 'weakpassword');
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText('Password is too weak.')).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    (useCreateAccount as jest.Mock).mockReturnValue({
      createAccount: jest.fn().mockResolvedValue(false),
      status: 'error',
      error: 'Account creation failed',
    });

    renderComponent();

    const usernameInput = screen.getByTestId('username-input-field');
    const passwordInput = screen.getByTestId('password-input-field');
    const submitButton = screen.getByText('Create Account');

    fireEvent.input(usernameInput, { target: { value: 'validusername' } });
    fireEvent.input(passwordInput, { target: { value: 'validpassword123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Error: Account creation failed (Status: error)')).toBeInTheDocument();
    });
  });

  it('focuses username input on mount', () => {
    renderComponent();
    const usernameInput = screen.getByTestId('username-input-field');
    expect(document.activeElement).toBe(usernameInput);
  });

  it('updates password strength meter', async () => {
    renderComponent();

    const passwordInput = screen.getByTestId('password-input-field');

    await act(async () => {
      user.type(passwordInput, 'weakpass');
    })

    await waitFor(() => {
      expect(screen.getByText('Strength: Weak')).toBeInTheDocument();
    });

    await act(async () => {
      user.type(passwordInput, 'StrongPassword1');
    })
    await waitFor(() => {
      expect(screen.getByText('Strength: Strong')).toBeInTheDocument();
    });

  });
});
