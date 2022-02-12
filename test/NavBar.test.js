/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from './test-utils';
import NavBar from '../src/components/Nav/NavBar.jsx';

test('Heading should exist', () => {
  render(<NavBar />);
  expect(screen.getByText('SoundTok')).toBeInTheDocument;
  // expect(screen.getByRole('heading')).toHaveTextContent('SoundTok');
});
