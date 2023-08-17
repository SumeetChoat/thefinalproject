import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import assignments from '.';

describe("assignments", () => {
    beforeEach(async () => {
        render (
              <assignments />
        )
    })
    afterEach(() => {
        cleanup()
    })
      it("should load the assignments", async () => {

    });

  });



// describe('assignments', () => {

//   it('should render assignment details correctly', () => {
//     render(<Assignments />);

//     expect(screen.getByText('My Assignments')).toBeInTheDocument();
//     expect(screen.getByText('Date:')).toBeInTheDocument();
//     expect(screen.getByText('Teacher:')).toBeInTheDocument();
//     expect(screen.getByText('Range:')).toBeInTheDocument();
//     expect(screen.getByText('Pattern:')).toBeInTheDocument();
//     expect(screen.getByText('Rounds:')).toBeInTheDocument();

   
//     const playButton = screen.getAllByText('Play')[0];
//     userEvent.click(playButton);


//   });

// });






