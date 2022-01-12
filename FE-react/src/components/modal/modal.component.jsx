import React from 'react';
import {Modal as MuiModal, Box, Button, useMediaQuery} from '@mui/material';

import {StyledCard, StyledCardHeader} from './modal.styles';
import {IS_MOBILE_SMALL_VIEW_DEF} from '../../assets/util';

const Modal = props => {
  const {open, onClose, title} = props;
  const isMobileView = useMediaQuery (IS_MOBILE_SMALL_VIEW_DEF);

  return (
    <MuiModal open={open} onClose={onClose}>
      <StyledCard isMobileView={isMobileView}>
        <StyledCardHeader title={title} />
        <Box sx={{bgcolor: 'lavender', height: '70%'}} />
        <Box padding={3} textAlign='center' justifyContent="center">
            <Button variant="contained" onClick={onClose}>Close</Button>
        </Box>
      </StyledCard>
    </MuiModal>
  );
};

export default Modal;
