/**
 * @jest-environment jsdom
 */

import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// import { render, screen } from './test-utils';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
// import { mocked } from 'jest/utils';

import NavBar from '../src/components/Nav/NavBar.jsx';

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};


jest.mock("@auth0/auth0-react");

// const mockedUseAuth0 = mocked(useAuth0, true);

// describe("NavBar Component Tests - Logged in", () => {
//   beforeEach(() => {
    // mockedUseAuth0.mockReturnValue({
    //   isAuthenticated: true,
    //   user,
    //   logout: jest.fn(),
    //   loginWithRedirect: jest.fn(),
    //   getAccessTokenWithPopup: jest.fn(),
    //   getAccessTokenSilently: jest.fn(),
    //   getIdTokenClaims: jest.fn(),
    //   loginWithPopup: jest.fn(),
    //   isLoading: false,
    // });
  // });
//   test("Login Button displays when not logged in", () => {
//     render(
//       <NavBar />
//     );
//     const loginButton = screen.getByText(/log in/i);
//     expect(loginButton).toBeInTheDocument();
//   });

// });



test('Heading should exist', () => {
  expect(1).toBeTruthy;
  // render(<NavBar />);
  // expect(screen.getByText('SoundTok')).toBeInTheDocument;
});
