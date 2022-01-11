import React from 'react';
import {Grid, Box, useMediaQuery} from '@mui/material';

import {
  IS_MOBILE_MED_VIEW_DEF,
  IS_MOBILE_SMALL_VIEW_DEF,
} from '../../assets/util';
import {default as Card} from '../../components/card/card.component';
import {gridContainerStyle, gridStyle} from './user.styles';

const UsersPage = props => {
  const {users} = props;
  const isMobile = useMediaQuery (IS_MOBILE_SMALL_VIEW_DEF);
  const isMobile2 = useMediaQuery (IS_MOBILE_MED_VIEW_DEF);

  const gridDimensionByMedia = () => {
    let dimension = 3; //dimensione da assegnare se viene superato IS_MOBILE_MED_VIEW_DEF
    if (isMobile2) {
      dimension = 6;
    }
    if (isMobile) {
      dimension = 12;
    }
    return dimension;
  };

  return (
    <Box sx={gridContainerStyle}>
      <Grid container sx={gridStyle}>
        {users.map (user => {
          return (
            <Grid item xs={gridDimensionByMedia()} key={user.id}>
              <Card user={user} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default UsersPage;
