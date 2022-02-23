/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from './test-utils';
import Controls from '../src/components/audioPlayer/Controls';
import { PlayerProvider } from '../src/contexts/player/playerContext';

const MockControls = () => {

  return (
    <PlayerProvider>
      <Controls />
    </PlayerProvider>
  );
};


describe('Audio Player', () => {

  //jsdom doesn't support any media operations

  window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
  window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };

  test('Audio Player Controls default settings', () => {

    render(<MockControls />);
    const playButton = screen.getByRole('play');
    const currentTime = screen.queryByRole('currentTime');
    const totalTime = screen.queryByRole('totalTime');
    // const volume = screen.getByRole('volume');

    expect(playButton).toHaveClass('ri-play-circle-fill');
    expect(currentTime).toHaveTextContent('0:00');
    expect(totalTime).toHaveTextContent('0:00');
    // expect(volume).toBeInTheDocument;
    expect(screen.queryByRole('songTitle')).not.toBeInTheDocument;

  });


  test('Audio Player settings when clicking the contorl buttons', () => {

    render(<MockControls />);

    const playButton = screen.getByRole('play');
    const nextButton = screen.getByRole('next');
    const prevButton = screen.getByRole('prev');
    const repeatButton = screen.getByRole('repeat');
    const randomButton = screen.getByRole('random');
    // const totalTime = screen.getByRole('totalTime');
    // const currentTime = screen.queryByRole('currentTime');
    // const progressBar = screen.getByRole('progressBar');

    fireEvent.click(playButton);
    expect(playButton).toHaveClass('ri-pause-circle-fill');

    fireEvent.click(repeatButton);
    expect(repeatButton).toHaveClass('active');

    fireEvent.click(randomButton);
    expect(randomButton).toHaveClass('active');

    fireEvent.click(nextButton);
    expect(screen.queryByRole('songTitle')).toBeInTheDocument;

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    expect(screen.queryByRole('songTitle')).not.toBeInTheDocument;

  });

});












// /**
//  * @jest-environment jsdom
//  */

// import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// import { render, screen, fireEvent } from './test-utils';
// import Controls from '../src/components/audioPlayer/Controls';

// test('Audio Player Controls default settings', () => {

//   render(<Controls />);
//   expect(screen.queryByRole('songTitle')).not.toBeInTheDocument;
//   expect(screen.getAllByText('0:00')).toHaveLength(2);
// });


// test('Should play a song when the button is clicked', async () => {



//   render(<Controls />);

//   const nextButton = screen.getByRole('next');
//   const prevButton = screen.getByRole('prev');
//   // const progressInput = screen.getByRole('progressBar');

//   fireEvent.click(nextButton);
//   const songTitle1 = screen.queryByRole('songTitle');
//   // expect(screen.queryByRole('songTitle')).toBeInTheDocument;

//   expect(songTitle1).toBeInTheDocument;
//   fireEvent.click(prevButton);
//   expect(songTitle1).not.toBeInTheDocument;

//   const currentTime = screen.getByRole('currentTime');
//   fireEvent.change(currentTime, { target: { value: '2.5' } });
//   expect(currentTime).not.toBe('0:00');


//   // const volume = screen.getByRole('volume');
//   // fireEvent.change(volume, { target: { value: '50' } });
//   // console.log(volume)


// });