/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from './test-utils';
import Controls from '../src/components/audioPlayer/Controls';

test('Audio Player Controls default settings', () => {

  render(<Controls />);
  expect(screen.queryByRole('songTitle')).not.toBeInTheDocument;
  expect(screen.getAllByText('0:00')).toHaveLength(2);
});


test('Should play a song when the button is clicked', async () => {



  render(<Controls />);

  const nextButton = screen.getByRole('next');
  const prevButton = screen.getByRole('prev');
  // const progressInput = screen.getByRole('progressBar');

  fireEvent.click(nextButton);
  const songTitle1 = screen.queryByRole('songTitle');
  // expect(screen.queryByRole('songTitle')).toBeInTheDocument;

  expect(songTitle1).toBeInTheDocument;
  fireEvent.click(prevButton);
  expect(songTitle1).not.toBeInTheDocument;

  const currentTime = screen.getByRole('currentTime');
  fireEvent.change(currentTime, { target: { value: '2.5' } });
  expect(currentTime).not.toBe('0:00');


  // const volume = screen.getByRole('volume');
  // fireEvent.change(volume, { target: { value: '50' } });
  // console.log(volume)


});