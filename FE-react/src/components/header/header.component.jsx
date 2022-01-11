import React, {useState} from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '../drawer/drawer.component';
import {IS_MOBILE_SMALL_VIEW_DEF, menuItems} from '../../assets/util';

const Header = props => {
  //questa variabile mi permette di utilizzare l'hook della media query così da cambiare le visualizzazioni se lo schermo è desktop o mobile
  const isMobile = useMediaQuery (IS_MOBILE_SMALL_VIEW_DEF);

  //vado a definire una variabile di stato per il nostro Drawer
  const [drawerIsOpen, setDrawerIsOpen] = useState (false);
  const openDrawerHandler = status => {
    setDrawerIsOpen (status);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          {isMobile &&
            <IconButton
              size="large"
              edge="start"
              color="neutral"
              aria-label="menu"
              sx={{mr: 2}}
              onClick={() => openDrawerHandler (true)}
            >
              <MenuIcon />
            </IconButton>}
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            The MERN App
          </Typography>
          {isMobile &&
            <Drawer
              anchor="left"
              open={drawerIsOpen}
              openDrawerHandler={openDrawerHandler}
            />}
          {!isMobile &&
            <React.Fragment>
              {menuItems.map((menuItem, index) => <Button color="inherit" key={index.toString()}>{menuItem}</Button>)}
            </React.Fragment>}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
