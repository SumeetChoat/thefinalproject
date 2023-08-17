import React, { useState } from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import assignments from '../../pages';
import Assignments from '.'
import {AuthProvider, AssignmentsProvider, AssignmentListProvider } from '../../contexts'

describe("assignments", () => {
    beforeEach(async () => {
        // const [form, setForm] = useState({}); 
        render (
            <AuthProvider>
              <AssignmentsProvider>
                <AssignmentListProvider>
              <Assignments />
              </AssignmentListProvider>
              </AssignmentsProvider>
            </AuthProvider>
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the assignments", async () => {
        // const button = screen.getByRole('button', {name: "+ Add Assignment"})
        // await userEvent.click(button)
    })

});