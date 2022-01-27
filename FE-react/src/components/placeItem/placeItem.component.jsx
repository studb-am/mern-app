import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Typography,
  Modal
} from '@mui/material';

import { modalStyle } from './placeItem.styles';
import MapModal from '../mapModals/mapModal.component';
import { AuthContext } from '../../pages/auth/auth.context';

const PlaceItem = props => {
  const { id, title, description, location, imageUrl, onDeletePlace } = props;
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);

  const auth = useContext(AuthContext);

  return (
    <Card sx={{ width: '100%', maxWidth: 450, marginBottom: 4 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Button size="small" onClick={() => setIsMapOpen(true)}>View Map</Button>
        {auth.userIsLogged && <Link to={`/update-place/${id}`} style={{ textDecoration: 'none' }}><Button size="small">Edit</Button></Link>}
        {auth.userIsLogged && <Button size="small" onClick={() => setIsDelOpen(true)}>Delete</Button>}
      </CardActions>
      <MapModal
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        title={title}
        location={location}
      />
      <Modal
        hideBackdrop
        open={isDelOpen}
        onClose={() => setIsDelOpen(false)}
      >
        <Box sx={modalStyle}>
          <h2>Are you sure?</h2>
          <p>By confirming the operation, you will no longer able to see delete data</p>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <Button onClick={() => setIsDelOpen(false)} variant="outlined">No</Button>
            <Button onClick={() => {
              setIsDelOpen(false);
              onDeletePlace(id);
            }} variant="contained">Yes</Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
};

export default PlaceItem;
