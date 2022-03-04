import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import Profile from '../../src/pages/Profile.jsx';


describe('Profile Page', () => {

  test('Profile should exist', () => {
    render(<Profile />);
    // expect(screen.getByRole('heading')).toBeInTheDocument;
    //Nothing to test for here?
  });
});


