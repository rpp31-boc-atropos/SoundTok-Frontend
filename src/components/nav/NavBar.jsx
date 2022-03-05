import React from "react";
import Search from "./SearchBar.jsx";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserInfo } from "../../contexts/UserContext.jsx";
import ProfilePicture from "../ProfilePicture.jsx";

import {
  MdAccountBox,
  MdMicNone,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";

const NavBar = () => {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  const { username, profilePic } = useUserInfo();

  return (
    <div className="nav">
      <div className="logo" role="logo">
        <Link to="/">SoundTok</Link>
      </div>

      <Search />

      <div
        className="controls"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginRight: "12px",
          }}
        >
          <Link to="/studio">
            <MdMicNone size={25} alt="Studio" />
          </Link>
        </div>

        {!isLoading && !isAuthenticated && (
          <div
            style={{
              marginRight: "12px",
            }}
          >
            <Link to={`/profile/${username}`}>
              <MdAccountBox
                size={25}
                alt="Profile"
                style={{
                  marginRight: "12px",
                }}
              />
            </Link>
            <MdOutlineLogin
              size={25}
              alt="Login"
              style={{
                marginRight: "12px",
                cursor: "pointer",
              }}
              onClick={() => loginWithRedirect()}
            />
          </div>
        )}

        {!isLoading && isAuthenticated && (
          <div>
            <ProfilePicture
              username={username}
              profilePicture={profilePic}
              size={"25"}
            />
            {/* <button onClick={() => logout()}>Out</button> */}
            <MdOutlineLogout
              size={25}
              alt="Logout"
              style={{
                marginRight: "12px",
                cursor: "pointer",
              }}
              onClick={() => logout()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
