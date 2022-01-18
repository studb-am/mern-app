import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '../drawer/drawer.component';
import MenuButton from '../menuButton/menuButton.component';
import { IS_MOBILE_SMALL_VIEW_DEF, menuItems } from '../../assets/util';
import { AuthContext } from '../../pages/auth/auth.context';

const Header = props => {
  //questa variabile mi permette di utilizzare l'hook della media query così da cambiare le visualizzazioni se lo schermo è desktop o mobile
  const isMobile = useMediaQuery(IS_MOBILE_SMALL_VIEW_DEF);
  //variabile di navigation
  const navigateTo = useNavigate();
  //variabile di contesto
  const auth = useContext(AuthContext);

  //vado a definire una variabile di stato per il nostro Drawer
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = status => {
    setDrawerIsOpen(status);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile &&
            <IconButton
              size="large"
              edge="start"
              color="neutral"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => openDrawerHandler(true)}
            >
              <MenuIcon />
            </IconButton>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The MERN App
          </Typography>
          {isMobile &&
            <Drawer
              anchor="left"
              open={drawerIsOpen}
              openDrawerHandler={openDrawerHandler}
            />}
          {!isMobile && menuItems.map((menuItem, index) => {
            if (menuItem.mode !== 'private' && menuItem.value === 'Authenticate' && auth.userIsLogged) {
              return <Button color="neutral" key={index.toString()} onClick={auth.logout}>Logout</Button>
            }

            if ((menuItem.mode === 'private' && auth.userIsLogged) || menuItem.mode === 'public') {
              return <MenuButton
                key={index.toString()}
                onClick={() => {
                  navigateTo(`/${menuItem.value.replace(" ", "-").toLowerCase()}`);
                }}
              >
                {menuItem.value.toUpperCase()}
              </MenuButton>
            }
            return;

          })
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
