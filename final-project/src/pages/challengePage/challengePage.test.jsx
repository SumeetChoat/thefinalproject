import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll } from "vitest";
import { render, screen } from '@testing-library/react';
import ChallengePage from './index';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe('Challenge Page', () => {
  it('should render the challenge page', () => {
    render(<ChallengePage />);
    
    // Check if the title is rendered
    const title = screen.getByText('Play the following. Remember to hit the start button.');
    expect(title).toBeInTheDocument();
    
    // You can add more assertions to check other elements on the page
  });

  // Add more test cases here as needed
});