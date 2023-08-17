import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import RegisterForm from '.';
import {BrowserRouter as Router} from 'react-router-dom';

describe("Register Form", () => {
    beforeEach(async () => {
        render (
            <Router>
              <RegisterForm />
            </Router>
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the Register Form", () => {
    })

  });