import React from 'react';
import { describe, it, expect ,afterEach, beforeEach,jest} from 'vitest';
import { useEffect, useRef, useState } from "react";
import { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render, cleanup } from '@testing-library/react';
import ChallengeConfigModal from './index';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers); 

describe('ChallengeConfigModal', () => {
    it('HELLO WORLD CHECK', () => {
      console.log("Challenge-Hello World")
     });
    
    it('renders without crashing', () => {
    const dialogRef = createRef(); // Mock the ref
  
    // Render the component
    render(
      <ChallengeConfigModal
        toggleChallengeConfigModal={false}
        setToggleChallengeConfigModal={() => {}}
        form={{}}
        setForm={() => {}}
        dialogRef={dialogRef} // Pass the mocked ref
      />
    );
      
      // Verify that the title is rendered
      const titleElement = screen.getByText('Challenge Configuration');
      expect(titleElement).toBeInTheDocument();
  
      // Verify that the Close button is rendered
      const closeButton = screen.getByText('Close');
      expect(closeButton).toBeInTheDocument();
    });
  
    it('shows and hides the modal correctly', () => {
      // Use state variables to simulate toggling the modal
      let isModalOpen = false;
      const setToggleModal = (value) => {
        isModalOpen = value;
      };
  
      render(
        <ChallengeConfigModal
          toggleChallengeConfigModal={isModalOpen}
          setToggleChallengeConfigModal={setToggleModal}
          form={{}}
          setForm={() => {}}
        />
      );
  
      // Verify that the dialog is initially closed
      const dialog = screen.queryByRole('dialog');
      expect(dialog).not.toBeInTheDocument();
  
      // Simulate clicking a button to open the modal
      const openButton = screen.getByText('Open Modal');
      userEvent.click(openButton);
  
      // Verify that the dialog is now open
      expect(dialog).toBeInTheDocument();
  
      // Simulate clicking the Close button to hide the modal
      const closeButton = screen.getByText('Close');
      userEvent.click(closeButton);
  
      // Verify that the dialog is closed again
      expect(dialog).not.toBeInTheDocument();
    });
  
    // Add more test cases as needed
  });