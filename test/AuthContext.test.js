/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../src/contexts/AuthContext.jsx';

describe('AuthProvider', () => {
  it('login is false by default', () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => <span>Is logged in: {value.login.toString()}</span>}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(screen.getByText('Is logged in: false')).toBeTruthy();
  });
});
