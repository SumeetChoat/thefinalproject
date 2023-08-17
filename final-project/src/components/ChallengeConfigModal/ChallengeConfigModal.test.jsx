import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup } from '@testing-library/react';
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouter as Router } from 'react-router-dom'; // Note the corrected import
import ChallengeConfigModal from './index';
import { AuthProvider } from '../../contexts';

expect.extend(matchers);

describe("challenge config modal", () => {
    beforeEach(() => {
        render (
            <Router>
                <AuthProvider>
                    <ChallengeConfigModal />
                </AuthProvider>
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("should load the challenge config modal", async () => {
        // Your test code here
    });

    // Add more test cases if needed
});