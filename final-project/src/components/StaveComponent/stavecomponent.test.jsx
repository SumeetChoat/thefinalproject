import React from 'react';
import { describe, it, expect ,afterEach, beforeEach,jest} from 'vitest';
import { userEvent,screen, render, cleanup } from '@testing-library/react';
import StaveComponent from './index';


import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('StaveComponent', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    afterEach(() => {
      cleanup();
    });
  
    it("renders the home link", () => {
      const Stavecomponent = screen.getByRole('link', {name: /Stavecomponent/i})
      expect(Stavecomponent).toBeInTheDocument();
  })

  // Add more test cases as needed to cover different scenarios
});
 
  
  



