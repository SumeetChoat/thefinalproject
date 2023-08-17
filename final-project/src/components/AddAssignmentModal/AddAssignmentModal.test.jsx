import React, { useState } from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import assignments from '../../pages';
import AddAssignmnetModal from './index'
import {AuthProvider} from '../../contexts'

describe("add assignments modal", () => {
    beforeEach(async () => {
        // const [form, setForm] = useState({}); 
        render (
            <AuthProvider>
              <AddAssignmnetModal />
            </AuthProvider>
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the add assignments modal", async () => {
        const button = screen.getByRole('button', {name: "+ Add Assignment"})
        await userEvent.click(button)
    })

});