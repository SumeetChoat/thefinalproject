import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup } from '@testing-library/react';
import matchers from "@testing-library/jest-dom/matchers";
import AssignmentReadyModal from '.'; 
import {
    AuthProvider,
    RoleProvider,
    AssignmentsProvider,
    FriendsProvider,
    StudentsProvider,
    RequestsProvider,
    MessagesProvider,
    NotificationsProvider,
    AssignmentListProvider
  } from "../../contexts";
import { BrowserRouter as Router } from 'react-router-dom'; 

expect.extend(matchers);

describe("assignment ready modal", () => {
    beforeEach(() => {
        render (
            <Router>
                <AuthProvider>
                <RoleProvider>
                <AssignmentsProvider>
                
                <AssignmentListProvider>
                                <AssignmentReadyModal />
                </AssignmentListProvider>
                
                </AssignmentsProvider>
                </RoleProvider>
                </AuthProvider>
            </Router>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("should load the assignment ready modal", async () => {
        
    });

});