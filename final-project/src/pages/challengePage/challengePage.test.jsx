import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import challengePage from '.';
import { AuthProvider, AssignmentsProvider } from '../../contexts';

describe("challengePage", () => {
    beforeEach(async () => {
        render (
            <AuthProvider>
            <AssignmentsProvider>
              <challengePage />
            </AssignmentsProvider>
            </AuthProvider>
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the challengePage", () => {
        // const titleElement = screen.getByText(
        //     'Play the following. Remember to hit the start button.'
        //   );
        //   expect(titleElement).toBeInTheDocument();
    })

    // Assert that the component renders without errors
    const challengeTitle = screen.getByText(
        "Play the following. Remember to hit the start button."
      );
      expect(challengeTitle).toBeInTheDocument();
  
      // Add more assertions based on the rendering of the component
  
      // Example: Assert that the "Start" button is present
      const startButton = screen.getByText("Start");
      expect(startButton).toBeInTheDocument();
  
      // Example: Assert that the "Challenge Configuration" button is present
      const configButton = screen.getByText("Challenge Configuration");
      expect(configButton).toBeInTheDocument();
  
      // Example: Assert that the "Next" button is present
      const nextButton = screen.getByText("Next");
      expect(nextButton).toBeInTheDocument();
    });
  
    it("should start the pitch detection when 'Start' button is clicked", async () => {
      render(
        <Router>
          <AuthProvider>
            <AssignmentsProvider>
              <challengePage />
            </AssignmentsProvider>
          </AuthProvider>
        </Router>
      );
  
      // Click the "Start" button
      const startButton = screen.getByText("Start");
      userEvent.click(startButton);
  
      // Add assertions to test the behavior after clicking the "Start" button
      // For example, you can assert that the pitch detection logic is triggered
      // and that the challenge notes are played and highlighted correctly.
    });
  
    it("should display Assignment Ready Modal when there is a current assignment", async () => {
      // Mock current assignment data
      const currentAssignment = {
        round: 1,
        // Add other assignment properties here
      };
  
      render(
        <Router>
          <AuthProvider>
            <AssignmentsProvider>
              <challengePage />
            </AssignmentsProvider>
          </AuthProvider>
        </Router>
      );
  
      // Set the current assignment
      // You might need to implement the context mock for setCurrentAssignment
      // to control the context behavior for this test case
      // setCurrentAssignment(currentAssignment);
  
      // Assert that the Assignment Ready Modal is displayed
      const assignmentReadyModal = await screen.findByTestId(
        "assignment-ready-modal"
      );
      expect(assignmentReadyModal).toBeInTheDocument();
    });
  
    // Add more test cases to cover other behaviors and interactions
 
