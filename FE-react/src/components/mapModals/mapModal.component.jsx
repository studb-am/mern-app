import React from 'react';
import {
  Modal as MuiModal,
  CardContent,
  Box,
  Button,
} from '@mui/material';

import { StyledCard, StyledCardHeader } from './mapModal.styles';
import { Map, Marker } from 'open-map-gl';

import './mapModal.css';

const MapModal = props => {
  const { open, onClose, title, location } = props;

  return (
    <MuiModal open={open} onClose={onClose}>
      <StyledCard>
        <StyledCardHeader title={title} />
        <CardContent sx={{ height: '95%' }}>
          <Map
            centerCoords={{ lat: location.lat, lng: location.lng }}
            initialZoom={14}
            mapStyle={process.env.REACT_APP_MAP_STYLE}
            mapClassName="map"
            mapContainerClassName="map-wrap"
            minZoom={9}
            maxZoom={18}
            navigationControl="top-right"
          >
            <Marker
              coords={{ lat: location.lat, lng: location.lng }}
              options={{
                color: '#3FB1CE',
                draggable: false
              }}
            />
          </Map>
          <Box padding={3} textAlign="center">
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Box>
        </CardContent>
      </StyledCard>
    </MuiModal>
  );
};

export default MapModal;
