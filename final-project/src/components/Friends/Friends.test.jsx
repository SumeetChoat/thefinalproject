import React, { useState, useEffect } from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import Friends from '.'
import {AuthProvider, FriendsProvider, RequestsProvider } from '../../contexts'

describe("friends", () => {
    beforeEach(async () => {
        // const [form, setForm] = useState({}); 
        render (
            <AuthProvider>
              <FriendsProvider>
              <RequestsProvider>
              <Friends />
              </RequestsProvider>
              </FriendsProvider>
            </AuthProvider>
        )
    })
    afterEach(() => {
        cleanup()
    })
    it("should load the friends", async () => {
        // const button = screen.getByRole('button', {name: "+ Add Assignment"})
        // await userEvent.click(button)
    })

});