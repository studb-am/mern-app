import React from 'react';
import { useParams } from 'react-router-dom';

import UpdatePlacePage from './updatePlace.component';
import { DUMMY_PLACES } from '../userPlaces/userPlaces.data';

const UpdatePlaceContainer = props => {
    const placeId = useParams().placeId;
    const selectedPlace = DUMMY_PLACES.filter(place => place.id === placeId)[0];
    return <UpdatePlacePage {...props} selectedPlace = {selectedPlace} />
}

export default UpdatePlaceContainer;