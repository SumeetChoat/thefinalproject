import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {

  it('submits form with valid email and password', () => {
    const setEmail = jest.fn();
    const setPassword = jest.fn();
    const { getByText, getByLabelText } = render(
      <LoginForm
        email=""
        setEmail={setEmail}
        password=""
        setPassword={setPassword}
        message=""
        setMessage={() => {}}
      />
    );

    userEvent.type(getByLabelText('Email:'), 'test@example.com');
    userEvent.type(getByLabelText('Password:'), 'password123');
    userEvent.click(getByText('Login'));

    // You can add assertions here to check if the form is submitted correctly
    // For example, you can expect that setEmail and setPassword were called with the right values
    expect(setEmail).toHaveBeenCalledWith('test@example.com');
    expect(setPassword).toHaveBeenCalledWith('password123');
  });

  it('displays error message for invalid login', async () => {
    // Mock the fetch function to simulate an unsuccessful login
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    const setMessage = jest.fn();
    const { getByText, getByLabelText } = render(
      <LoginForm
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        message=""
        setMessage={setMessage}
      />
    );

    userEvent.type(getByLabelText('Email:'), 'test@example.com');
    userEvent.type(getByLabelText('Password:'), 'password123');
    userEvent.click(getByText('Login'));

    // Wait for the error message to appear
    await waitFor(() =>
      expect(getByText('Invalid email or password.')).toBeInTheDocument()
    );

    // Check if the setMessage function was called with the error message
    expect(setMessage).toHaveBeenCalledWith('Invalid email or password.');

    // Restore the original fetch function
    global.fetch = originalFetch;
  });
});
