import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '../test-utils';
import Hashtag from '../../src/pages/Hashtag.jsx';


describe('Hashtag Page', () => {

  test('Hashtag should exist', () => {
    render(<Hashtag />);
    expect(screen.getByRole('heading')).toBeInTheDocument;
    // expect(screen.getAllByRole('photoCardPlay')).toBeInTheDocument;
  });


});


