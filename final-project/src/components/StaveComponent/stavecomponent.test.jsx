import React from 'react';
import { describe, it, expect ,afterEach, beforeEach,jest} from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, render, cleanup } from '@testing-library/react';
import {
  Renderer,
  Stave,
  StaveNote,
  StaveConnector,
  Formatter,
  Voice,
  Beam,
  Accidental,
} from 'vexflow';

import StaveComponent from './index';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);



describe('StaveComponent', () => {
  it('HELLO WORLD CHECK', () => {
    console.log("Hello World")
   });

  it('renders staves and notes correctly with challenge', () => {
    const challenge = [
      { note: 60, isCorrect: true },
      { note: 62, isCorrect: false },
      { note: 64, isCorrect: true },
    ];

    const { container } = render(<StaveComponent challenge={challenge} />);

    // Write your assertions here to check if staves and notes are rendered correctly.
    // For example:
    const staveElements = container.querySelectorAll('.vf-stave');
    expect(staveElements.length).toBe(2);

    const noteElements = container.querySelectorAll('.vf-note');
    expect(noteElements.length).toBe(challenge.length);
  });

  // Add more test cases as needed to cover different scenarios
});
 
  
  



