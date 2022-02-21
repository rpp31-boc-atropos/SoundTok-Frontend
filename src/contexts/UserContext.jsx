// import * as React from 'react';

// export const UserInfoContext = React.createContext();

import * as React from 'react';

const UserInfoContext = React.createContext();

const UserInfoProvider = ({ children }) => {
  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(null);

  const userInfoContextValue = {
    username,
    setUsername,
    email,
    setEmail,
    profilePic,
    setProfilePic,
  };

  return (
    <UserInfoContext.Provider value={userInfoContextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfo = () => React.useContext(UserInfoContext);

export { UserInfoContext, UserInfoProvider, useUserInfo };
