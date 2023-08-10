import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AuthProvider, useAuth } from './auth';
import {useState,useContext, createContext} from 'react';

// A test component that uses the useAuth hook
const TestComponent = () => {
  const auth = useAuth();
  return <div>{auth.token}</div>;
};

describe('AuthContext', () => {
  it('should provide token through context', () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Expect the token to be available in the rendered component
    expect(getByText('')).toBeInTheDocument(); // Replace with the expected token value
  });
});