# SoundTok, a place to share your sound

[https://soundtok.live](https://soundtok.live/#/)

Anyone, from the casual listener and discoverer of new music to the veteran producer, will find a community on SoundTok. Put together a new track by uploading audio files from your computer or loading from saved drafts and layering different sounds and effects. Once you're satisfied, post the song with a description, image, and hashtags so others can discover your music through the feed or search bar. Keep your profile up to date, so others know who you are as an artist.

# Table of Contents

- [Nav Bar](#navigation-bar)
- [Studio](#studio)
- [Feed](#feed)
- [Hashtag Page](#hashtag-page)
- [Profile](#profile)
- [Schema](#schema-design)
- [Authentication](#authentication)
- [Tech Stack](#tech-stack--libraries)
- [Contributors](#contributors)

## Navigation Bar
_Main Features_
- Navigate to the home page by clicking on the SoundTok logo.
- Login or signup by clicking on the Login icon.
- Navigate to the Studio page by clicking on the Studio icon. If not logged in, the user will be redirected to the log in page.
- Navigate to the Profile page by clicking on the Profile icon. If not logged in, the user will be redirected to the log in page. When logged in, the profile icon is replaced by user profile picture.
- Search a user (start with '@') or hashtag (default or start with '#') in the search bar. A list of matched results will be displayed in the search research popup page. Click on one of the matched results will take the user to the corresponding hashtag page or profile page.

![Screen Recording (Google Chrome)](https://user-images.githubusercontent.com/26532717/157350708-99d1dc8c-f243-4555-a430-1886a0c66f79.gif)


## Studio

_Main Features_

- Upload audio files from your computer or select a draft that you want to keep working on
- Add effects such as Fade-in, Fade-out & Reverb to individual tracks
- Highlight a section of a track and trim to shorten the overall length
- Download the the edited tracks as a single audio file
- Save current project as a draft

![studio-1](https://user-images.githubusercontent.com/81498700/157572777-2130d021-e653-48a6-8186-dbc9886117e3.gif)

## Feed

_Main Features_

- Post music by uploading an audio file, loading from drafts, or putting together a track in the studio
- Posts include can include a title, description (limited to 140 char), and image
- Explore others' musical projects, which are sorted with most recently posted on top
- Discover relevant music and artists when clicking on a hashtag
- Remix songs that pique your interest directly in the studio
- Save unfinished posts to drafts to revisit later
- Delete posts after publishing

![Screen Recording 2022-03-04 at 7 23 01 PM](https://user-images.githubusercontent.com/69382434/156866618-144e0a94-b6d1-4b46-bd25-63d14ce318de.gif)

## Hashtag Page

_Main Features_

- When a user clicks on or search for a hashtag, renders a list consisting of every post which contains the same hashtag
- Posts include project title, audio length, profile picture, username, and an expandable description
- Re-render the posts content when a user searches other hashtags from the page
- Add animated wave effect

<img width="1157" alt="BOC_hashtag" src="https://user-images.githubusercontent.com/83844510/157174776-bed212bf-a923-4939-a919-dee3a5707869.png">

## Profile

_Main Features_

- View user's profile picture and biography
- Edit own profile picture and biography
- View list of user's posts with relevant details
- View list of own drafts with relevant details
- Delete own songs and drafts
- Remix selected song directly in the studio

![image](https://user-images.githubusercontent.com/19396164/157341898-afd6697b-dce0-4806-a817-2d60b97b6756.png)


## Schema Design

<img width="879" alt="Screen Shot 2022-03-05 at 12 14 01 PM" src="https://user-images.githubusercontent.com/13864148/156893333-b053f28a-325c-475e-9faa-701246130abc.png">

The server utilizes a Postgres database on the backend with minimal JavaScript transformation.

## Authentication
Authentication uses Auth0 capabilities. It allows users to sign up and log in with username, email, and password, or through one of the social connections including Google, Facebook, and Twitter.

<img width="200" alt="Screen Shot 2022-03-08 at 6 18 09 PM" src="https://user-images.githubusercontent.com/26532717/157349844-02e9baee-db68-4759-a3f5-41d333c61488.png">
## Tech Stack & Libraries

_Deployment/Utility_

- Circle CI
- AWS EC2
- [Jest](https://jestjs.io/)
- [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Eslint](https://eslint.org/)


_Core Tech_

- [Node v16](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [Express v4](https://expressjs.com/)
- [React v17](https://reactjs.org/docs/getting-started.html)
- [Postgres v16](https://www.postgresql.org/docs/)

_Libraries_

- [Styled-components](https://styled-components.com/)
- [Luxon](https://moment.github.io/luxon/api-docs/index.html#duration)
- [Axios](https://www.npmjs.com/package/axios)
- [Auth0](https://auth0.com/docs/)
- [Cloudinary](https://cloudinary.com/documentation)
- [Linkify.js](https://linkify.js.org/docs/)

## Contributors

[@xoxohorses](https://github.com/xoxohorses) - **Product Manager/Software Engineer** (Feed, Design, Project Management)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Julie%20Yu-blue)](https://www.linkedin.com/in/juliemyu/)

[@roastnewt](https://github.com/roastnewt) - **Architecture Owner/Software Engineer** (Deployment, CI/CD, Studio drafts)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Clayton%20Watterson-blue)]()

[@imperium11](https://github.com/imperium11) - **UI Owner/Software Engineer** (Studio, Design)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Poyraz%20Akay-blue)](https://www.linkedin.com/in/poyraz-akay/)

[@Maggie-Mango](https://github.com/Maggie-Mango) - **Software Engineer** (Database design, Deployment, API tests)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Maggie%20Saldivia-blue)](https://www.linkedin.com/in/maggiesaldivia)

[@rita0927](https://github.com/rita0927) - **Software Engineer** (Soundbar, Hashtag page, tests)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yu%20Zhang-blue)](https://www.linkedin.com/in/yuzhang734680/)

[@yuanqiwang](https://github.com/yuanqiwang) - **Software Engineer** (Authentication, Navigation bar/search)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yuanqi%20Wang-blue)](https://www.linkedin.com/in/yuanqiw/)

[@rickkunz](https://github.com/rickkunz) - **Software Engineer** (Profile page)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rick%20Kunz-blue)](https://www.linkedin.com/in/rickckunz/)
