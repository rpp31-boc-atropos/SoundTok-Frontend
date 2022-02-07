/**
 * @jest-environment jsdom
 */


import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../../test/test-utils';
import NavBar from './NavBar';


test('Heading should exist', () => {
  render(<NavBar />);
  expect(screen.getByRole('heading')).toHaveTextContent('SoundTok');
});