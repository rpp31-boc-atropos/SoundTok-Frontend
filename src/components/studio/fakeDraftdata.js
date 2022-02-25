const fakeData = [
  { // Draft 1
    name: 'Awesome Song 1',
    date: 'February 14th, 2022',
    tracks: [
      {
        src: 'https://res.cloudinary.com/poyraz96/video/upload/v1645737985/mxuhko4whtywpotscyl5.mp3',
        name: 'Vocals',
        gain: 0.5,
      },
      {
        src: 'https://res.cloudinary.com/poyraz96/video/upload/v1645737985/mxuhko4whtywpotscyl5.mp3',
        name: 'Drums',
        start: 8.5,
        fadeIn: {
          duration: 0.5,
        },
        fadeOut: {
          shape: 'logarithmic',
          duration: 0.5,
        },
      },
      {
        src: 'https://res.cloudinary.com/poyraz96/video/upload/v1645737985/mxuhko4whtywpotscyl5.mp3',
        name: 'Guitar',
        start: 23.5,
        fadeOut: {
          shape: 'linear',
          duration: 0.5,
        },
        cuein: 15,
      }
    ]
  },
  { // Draft 2
    name: 'More Awesomer',
    date: 'February 13th, 2022',
    tracks: [
      {
        src: 'https://res.cloudinary.com/poyraz96/video/upload/v1645737985/mxuhko4whtywpotscyl5.mp3',
        name: 'Drums',
        start: 8.5,
        fadeIn: {
          duration: 0.5,
        },
        fadeOut: {
          shape: 'logarithmic',
          duration: 0.5,
        },
      },
      {
        src: 'https://res.cloudinary.com/poyraz96/video/upload/v1645737985/mxuhko4whtywpotscyl5.mp3',
        name: 'Vocals',
        gain: 0.5,
      },
      {
        src: 'https://res.cloudinary.com/poyraz96/video/upload/v1645737985/mxuhko4whtywpotscyl5.mp3',
        name: 'Guitar',
        start: 23.5,
        fadeOut: {
          shape: 'linear',
          duration: 0.5,
        },
        cuein: 15,
      }
    ]
  },
  { // Draft 3
    name: 'Remix',
    date: 'February 12th, 2022',
    tracks: [
      {
        src: 'https://res.cloudinary.com/poyraz96/video/upload/v1645737985/mxuhko4whtywpotscyl5.mp3',
        name: 'Drums',
        start: 8.5,
        fadeIn: {
          duration: 0.5,
        },
        fadeOut: {
          shape: 'logarithmic',
          duration: 0.5,
        },
      }
    ]
  },
  { // Draft 4
    name: 'Empty Track',
    date: 'February 11th, 2022',
  },
  { // Draft 4
    name: 'Empty Track',
    date: 'February 1th, 2022',
  },
  { // Draft 4
    name: 'Empty Track',
    date: 'February 11th, 2022',
  },
  { // Draft 4
    name: 'Empty Track',
    date: 'February 11th, 2022',
  },
  { // Draft 4
    name: 'Empty Track',
    date: 'February 11th, 2022',
  }
];

export default fakeData;