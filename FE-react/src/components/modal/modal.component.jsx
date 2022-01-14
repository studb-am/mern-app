import React from 'react';
import {
  Modal as MuiModal,
  CardContent,
  Box,
  Button,
} from '@mui/material';

import {StyledCard, StyledCardHeader} from './modal.styles';
import Map from '../map/map.component';

const Modal = props => {
  const {open, onClose, title, location} = props;

  return (
    <MuiModal open={open} onClose={onClose}>
      <StyledCard>
        <StyledCardHeader title={title} />
        <CardContent sx={{ height: '95%'}}>
          <Map location={location} />
          <Box padding={3} textAlign="center">
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Box>
        </CardContent>
      </StyledCard>
    </MuiModal>
  );
};

export default Modal;
