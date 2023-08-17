import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup } from '@testing-library/react';
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouter as Router } from 'react-router-dom'; // Note the corrected import
import StaveComponent from './index';
import { AuthProvider } from '../../contexts';

expect.extend(matchers);

describe("stave component", () => {
    beforeEach(() => {
        render (
            <Router>
                <AuthProvider>
                    <StaveComponent />
                </AuthProvider>
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("should load the stave component", async () => {
        const mockChallenge = [
              { note: 60, isCorrect: false },
              { note: 62, isCorrect: false },
              // Add more mock challenge data as needed
            ];
        
            render(
              <Router>
                <StaveComponent challenge={mockChallenge} form={{ clef: "treble" }} />
              </Router>
            );
            // Add your assertions here
    });
       

    // Add more test cases if needed
});