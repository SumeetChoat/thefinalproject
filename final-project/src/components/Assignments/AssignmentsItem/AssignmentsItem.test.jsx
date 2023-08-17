import React, { useState } from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import assignments from '../../pages';
import AssignmentsItem from '../index'
import {AuthProvider, AssignmentsProvider, AssignmentListProvider, RoleProvider } from '../../contexts';
import { BrowserRouter as Router } from 'react-router-dom'; 

describe("assignments item", () => {
    beforeEach(async () => {
        // const [form, setForm] = useState({}); 
        render (
            <Router>
            <AuthProvider>
                <RoleProvider>
                <AssignmentsProvider>
                <AssignmentListProvider>
              <AssignmentsItem />
              </AssignmentListProvider>
              </AssignmentsProvider>
              </RoleProvider>
            </AuthProvider>
            </Router>
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the assignments item", async () => {
    //     const button = screen.getByRole('button', {name: "+ Add Assignment"})
    //     await userEvent.click(button)
     })

});