import React, {useState} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material';

import Modal from '../modal/modal.component';

const PlaceItem = props => {
  const {id, title, description, location, imageUrl} = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleModalOpen = bool => setIsOpen(bool);

  return (
    <Card sx={{width: '100%', maxWidth: 450, marginBottom: 4}}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => toggleModalOpen(true)}>View Map</Button>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
      <Modal 
        open={isOpen}
        onClose={() => toggleModalOpen(false)}
        title={title}
      />
    </Card>
  );
};

export default PlaceItem;
