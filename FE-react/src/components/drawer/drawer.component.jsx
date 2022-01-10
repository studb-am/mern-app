import React from 'react';
import {
  Drawer as MuiDrawer,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {Person, FmdGood} from '@mui/icons-material';

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
        {['User', 'Places'].map ((item, index) => {
          return (
            <ListItem button key={index}>
              <ListItemIcon>
                {index === 0 ? <Person /> : <FmdGood />}
              </ListItemIcon>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          );
        })}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
