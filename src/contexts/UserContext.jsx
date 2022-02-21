import * as React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const UserInfoContext = React.createContext();

const UserInfoProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(null);
  const [userBio, setUserBio] = React.useState(null);

  // QUERY FOR USER PROPIC AND USERNAME HERE USING EMAIL
  React.useEffect(() => {
    if (isAuthenticated) {
      const email = user.email;
      console.log({ email });
      // axios
      //   .post('http://54.91.250.255:1234/', { email })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {});
    } else {
      setUsername(null);
      setEmail(null);
      setProfilePic(null);
      setUserBio(null);
    }
  }, [isAuthenticated]);

  const userInfoContextValue = {
    username,
    setUsername,
    email,
    setEmail,
    profilePic,
    setProfilePic,
    userBio,
    setUserBio,
  };

  return (
    <UserInfoContext.Provider value={userInfoContextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfo = () => React.useContext(UserInfoContext);

export { UserInfoProvider, useUserInfo };
