import React from 'react';
import { describe, it, expect ,afterEach, beforeEach, vi } from 'vitest';
import { userEvent,screen, render, cleanup } from '@testing-library/react';
import StaveComponent from './index';
import { MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('StaveComponent', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <StaveComponent />
        </MemoryRouter>
      );
    });

    afterEach(() => {
      cleanup();
    });
  
    it("renders the stavecomponent page", () => {
      const staveComponent = screen.getByRole('link', {name: /Stavecomponent/i})
      expect(staveComponent).toBeInTheDocument();
  })

  // describe('StaveComponent', () => {
  //   it('should render StaveComponent', () => {
  //     const challenge = [
  //       { note: 60, isCorrect: true },
  //       { note: 62, isCorrect: false },
  //       // ... other challenge objects
  //     ];
  
  //     render(<StaveComponent challenge={challenge} />);

  //   });
  
});
 
  
  



