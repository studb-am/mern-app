import React from 'react';
import {
  Drawer as MuiDrawer,
  Box,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {Person, FmdGood, Login} from '@mui/icons-material';

import { menuItems } from '../../assets/util';

const Drawer = props => {
  const {anchor, open, openDrawerHandler} = props;

  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={() => openDrawerHandler (false)}
    >
      <Box
        sx={{width: 250}}
        role="presentation"
        onClick={() => openDrawerHandler (false)}
        onKeyDown={() => openDrawerHandler (false)}
      >
        {menuItems.map ((item, index) => {
          return (
            <ListItemButton key={index}>
              <ListItemIcon>
                {index === 0 ? <Person /> : index === 1 ? <FmdGood /> : <Login />}
              </ListItemIcon>
              <ListItemText>
                {item}
              </ListItemText>
            </ListItemButton>
          );
        })}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
