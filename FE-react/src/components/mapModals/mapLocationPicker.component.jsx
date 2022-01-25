import React, { useState } from "react";
import {
    Modal as MuiModal,
    CardContent,
    Box,
    Button,
} from '@mui/material';

import { StyledCard, StyledCardHeader } from './mapModal.styles';
import { Map, Marker } from 'open-map-gl';

import './mapModal.css';


const MapLocationPicker = props => {

    const { open, onClose, title, onLocationChange } = props;
    const [currLoc, setCurrLoc] = useState(null);


    return <MuiModal open={open} onClose={onClose}>
        <StyledCard>
            <StyledCardHeader title={title} />
            <CardContent sx={{ height: '95%' }}>
                <Map
                    centerCoords={{ lat: 44.8336, lng: 7.7610 }}
                    initialZoom={14}
                    mapStyle={process.env.REACT_APP_MAP_STYLE}
                    mapClassName="map"
                    mapContainerClassName="map-wrap"
                    minZoom={9}
                    maxZoom={18}
                    navigationControl="top-right"
                    onClick={evt => {
                        setCurrLoc(evt.lngLat)
                    }}
                >
                    {currLoc && <Marker
                        coords={{ lat: currLoc.lat, lng: currLoc.lng }}
                        options={{
                            color: '#3FB1CE',
                            draggable: false
                        }}
                    />}
                </Map>
                <Box padding={3} textAlign="center">
                    <Button variant="contained" disabled={!currLoc} onClick={() => {
                        onLocationChange(currLoc);
                        onClose();
                    }}>Save</Button>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                </Box>
            </CardContent>
        </StyledCard>
    </MuiModal>
}

export default MapLocationPicker;