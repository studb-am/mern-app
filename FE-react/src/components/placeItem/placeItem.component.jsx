import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  useMediaQuery
} from '@mui/material';

const PlaceItem = props => {
  const {id, title, description, location, imageUrl} = props;

  return (
    <Card sx={{width: '100%', maxWidth: 450 , marginBottom: 4}}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Map</Button>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default PlaceItem;
