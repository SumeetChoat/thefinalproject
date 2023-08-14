import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import registerPage from "."; 
import { AuthContext } from "../../contexts/index.jsx";
import App from "../../App.jsx";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";

describe("Register Page", () => {
  beforeEach( async () => {
    render(
      <Router>
          <App />
      </Router>
    );
    const register = screen.getByRole("link", { name:"Register" });
    await userEvent.click(register);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the register page correctly", async () => {
    const registerTitle = screen.getByRole('Register');
    const inputF = screen.getByRole('textbox', {type: /firstname/});
    const inputL = screen.getByRole('textbox', {type: /lastname/});
    const inputU = screen.getByRole('textbox', {type: /username/})
    const inputP = screen.getByRole('textbox', {type: /password/})
    const button = screen.getByRole("button", { name: /Register/i });

    expect(registerTitle).toBeInTheDocument();
    expect(inputF).toBeInTheDocument();
    expect(inputL).toBeInTheDocument();
    expect(inputU).toBeInTheDocument();
    expect(inputP).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});


