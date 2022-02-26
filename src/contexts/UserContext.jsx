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
  const [isNewProfile, setIsNewProfile] = React.useState(false); //rk added

  // TODO: Add selectedUser for Rick to query on

  // QUERY FOR USER PROPIC AND USERNAME HERE USING EMAIL
  React.useEffect(() => {
    if (isAuthenticated) {
      const email = user.email;
      setEmail(email);
      axios
        .get('https://api.soundtok.live/getUserData', {
          params: { email },
        })
        .then((response) => {
          const data = response.data[0];
          setUsername(data.username);
          setProfilePic(data.profilePicture);
          setUserBio(data.userBio);
          return;
        })
        .catch((error) => {
          console.log(error);
        });
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
    isNewProfile,
    setIsNewProfile
  };

  return (
    <UserInfoContext.Provider value={userInfoContextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfo = () => React.useContext(UserInfoContext);

export { UserInfoProvider, useUserInfo };
