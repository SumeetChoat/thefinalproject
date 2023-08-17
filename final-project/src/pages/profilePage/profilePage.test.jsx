import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import profilePage from '.';

describe("profilePage", () => {
    beforeEach(async () => {
        render (
              <profilePage />
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the profilePage", () => {
    })

  });

//     const assignmentsContainer = screen.getByText('Assignments');
//     const connectionsContainer = screen.getByText('Connections');
//     const leaderboardContainer = screen.getByText('LeaderBoard'); 

//     expect(assignmentsContainer).toBeTruthy();
//     expect(connectionsContainer).toBeTruthy();
//     expect(leaderboardContainer).toBeTruthy();
// })

// });