import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  it('submits the form with valid input', async () => {
    const mockNavigate = jest.fn();
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <RegisterForm setMessage={() => {}} navigate={mockNavigate} />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });

    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('displays an error message for empty fields', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegisterForm setMessage={() => {}} navigate={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(getByText('Please fill in all fields.')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});