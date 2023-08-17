import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import LoginForm from '.';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from '../../contexts'

describe("Login Form", () => {
    const mockLoginForm = { username: "", password: "" };
    beforeEach(async () => {
        render (
            <Router>
                <AuthProvider>
              <LoginForm loginForm={mockLoginForm} />
              </AuthProvider>
            </Router>
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the Login Form", () => {
    })

  });