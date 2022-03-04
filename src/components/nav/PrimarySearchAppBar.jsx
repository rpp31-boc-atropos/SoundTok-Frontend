import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';

import MicNoneIcon from '@mui/icons-material/MicNone';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserInfo } from '../../contexts/UserContext.jsx';
import SearchBar from './SearchBar.jsx';


export default function PrimarySearchAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="studio icon"
          color="inherit"
          component={Link}
          to="/studio">
          <MicNoneIcon />
        </IconButton>
        <p>Studio</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="profile icon"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="logout icon"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>

    </Menu>
  );

  const {loginWithRedirect, logout, isLoading, isAuthenticated} = useAuth0();

  const { username, profilePic } = useUserInfo();


  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        borderBottom:'red',
        borderLeftStyle: 'solid',
        borderLeftWidth: '0.1em'
      }}>
      <AppBar
        position="static"
        style={{ background: '#000000'}}
      >
        <Toolbar>

          <Typography
            variant="h6"
            noWrap
            // component="div"
            sx={{ display: 'block', width: '10em'}}
            component={Link}
            to="/"

          >
            SoundTok
          </Typography>

          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="Studio"
              color="inherit"
              component={Link}
              to="/studio"
            >
              <MicNoneIcon/>
            </IconButton>

            <IconButton
              size="large"
              aria-label="account of current user"
              color="inherit"
              component={Link}
              to="/profile"

            >
              <AccountCircle />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="login/out icon"
              color="inherit"
            >
              {!isLoading && !isAuthenticated && (
                <LoginIcon onClick={() => loginWithRedirect()} />
              )}

              {!isLoading && isAuthenticated && (
                <LogoutIcon onClick={() => logout()}/>
              )}

            </IconButton>

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
