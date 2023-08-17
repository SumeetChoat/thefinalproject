import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import registerPage from '.';

describe("registerPage", () => {
    beforeEach(async () => {
        render (
              <registerPage />
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the registerPage", () => {
    })

  });
    // it("should load the register form", async () => {
    //   const button = screen.getByTestId('login-register-switch');
    //   await userEvent.click(button);
    // })

  //   it("should switch forms", async () => {
  //     const button = screen.getByTestId('login-register-switch');
  //     expect(screen.queryByTestId("username")).not.toBeInTheDocument()
  //     await userEvent.click(button)
  //     expect(screen.getByTestId("username")).toBeInTheDocument()
  // })

  // it("should render the register form correctly", async () => {
  //   const registerTitle = screen.getByRole('Register');
  //   const inputF = screen.getByRole('textbox', {type: /firstname/});
  //   const inputL = screen.getByRole('textbox', {type: /lastname/});
  //   const inputU = screen.getByRole('textbox', {type: /username/})
  //   const inputP = screen.getByRole('textbox', {type: /password/})
  //   const button = screen.getByRole("button", { name: /Register/i });

  //   expect(registerTitle).toBeInTheDocument();
  //   expect(inputF).toBeInTheDocument();
  //   expect(inputL).toBeInTheDocument();
  //   expect(inputU).toBeInTheDocument();
  //   expect(inputP).toBeInTheDocument();
  //   expect(button).toBeInTheDocument();
  // });
// });


