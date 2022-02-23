/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from './test-utils';
import Hashtag from '../src/pages/Hashtag.jsx';
import { PlayerProvider } from '../src/contexts/player/playerContext';


const MockHashtag = () => {

  return (
    <PlayerProvider>
      <Hashtag />
    </PlayerProvider>
  );
};

describe('Hashtag Page', () => {

  test('Hashtag should exist', () => {
    render(<MockHashtag />);
    expect(screen.getByRole('heading')).toBeInTheDocument;
    expect(screen.getAllByRole('photoCardPlay')).toBeInTheDocument;
  });


});


