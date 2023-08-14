import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import { useState } from "react";
expect.extend(matchers);
import Assignments from '.';

import { BrowserRouter as Router } from "react-router-dom";
import App from "../../App";
import { MockAuthProvider, KeysProvider, SettingsProvider, PokemonProvider } from '../../contexts';
import { Routes, Route } from 'react-router-dom';

describe('assignments', () => {

  it('should render assignment details correctly', () => {
    render(<Assignments />);

    // Check if the assignment details are rendered correctly
    expect(screen.getByText('My Assignments')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('Teacher:')).toBeInTheDocument();
    expect(screen.getByText('Range:')).toBeInTheDocument();
    expect(screen.getByText('Pattern:')).toBeInTheDocument();
    expect(screen.getByText('Rounds:')).toBeInTheDocument();

    // Mock a click event on the "Play" button
    const playButton = screen.getAllByText('Play')[0];
    userEvent.click(playButton);

    // You might need to assert your expected behavior after the button click
  });

});






