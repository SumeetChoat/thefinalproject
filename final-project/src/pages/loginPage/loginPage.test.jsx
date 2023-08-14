import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./index";
import { AuthContext } from "../../contexts/index.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import App from "../../App.jsx";

describe("Login Page", () => {

    beforeEach( async () => {
        render(
        <Router>
        <App />
        </Router>
        )
        const logIn = screen.getByRole('link', {name: "Login"})
        await userEvent.click(logIn)
    })

    afterEach(() => {
        cleanup()
    })

    it("should render login page", async () => {
    const loginTitle = screen.getByText('Login', { selector: '.login-title'});
    expect(loginTitle).to.exist;
   
    })
     
})