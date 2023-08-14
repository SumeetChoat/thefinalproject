import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { MockAuthProvider, RoleProvider, AssignmentsProvider, FriendsProvider, StudentsProvider, RequestsProvider, MessagesProvider   } from '../../contexts';
import challengePage from './index';
import App from "../../App.jsx";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe('Challenge Page when logged in', ()=>{
  beforeEach(async () => {
      render(
          <Router>
          <MockAuthProvider>
            <RoleProvider>
              <AssignmentsProvider>
                <FriendsProvider>
                  <StudentsProvider>
                  <RequestsProvider>
                  <MessagesProvider>
        <Routes>
      <Route path="/challenge" element={<challengePage />} />
    </Routes>
      </MessagesProvider>
      </RequestsProvider>
      </StudentsProvider>
      </FriendsProvider>
      </AssignmentsProvider>
      </RoleProvider>
      </MockAuthProvider>
      </Router >
        );
  })

  afterEach(() => {
      cleanup()
  })

  it("should load a timer", () => {
      const timer = screen.getByTestId("timer")
      expect(timer).toBeInTheDocument()
  })


})