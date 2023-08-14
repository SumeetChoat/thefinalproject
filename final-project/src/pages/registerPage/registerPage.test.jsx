import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vitest, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../App";
import registerPage from '.';

