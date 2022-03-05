import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '../test-utils';
import NavBar from '../../src/components/nav/NavBar.jsx';
import { UserInfoProvider } from '../../src/contexts/UserContext';


//Mocked log in
jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }) => children,
  withAuthenticationRequired: ((component, _) => component),
  useAuth0: () => {
    return {
      isLoading: false,
      user: { sub: "foobar" },
      isAuthenticated: true,
      loginWithRedirect: jest.fn()
    };
  }
}));

const MockNavBar = () => {

  return (
    <UserInfoProvider>
      <NavBar />
    </UserInfoProvider>
  );
};


describe('NavBar', () => {


  test('NavBar should exist', () => {
    render(<MockNavBar />);
    // expect(screen.getByText(/Studio/i)).toBeInTheDocument();
    // expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
    expect(screen.getByRole(/logo/i)).toBeInTheDocument();


  });


});