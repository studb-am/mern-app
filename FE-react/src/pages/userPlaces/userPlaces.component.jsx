import React, { useState, useContext } from 'react';
import { useMediaQuery } from '@mui/material';

import PlaceItem from '../../components/placeItem/placeItem.component';
import { IS_MOBILE_SMALL_VIEW_DEF } from '../../assets/util';
import { useMutateData } from '../../assets/custom-hooks';
import { AuthContext } from '../auth/auth.context';



const UserPlacesPage = props => {
    const { places } = props;
    const isMobile = useMediaQuery(IS_MOBILE_SMALL_VIEW_DEF);
    const [remainingPlaces, setRemainingPlaces] = useState(places);

    const [mutateData, { error, clearError }] = useMutateData();

    const auth = useContext(AuthContext);

    const deletePlaceItem = (placeId) => {
        mutateData({
            url: `http://locomovolt.com:4000/api/places/place/${placeId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
            }
        }, 'DELETE')
            .then(data => {
                console.log(data.message);
                setRemainingPlaces(prev => prev.filter(place => place.id !== placeId));
            })
    }

    return <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', padding: 25 }}>
        {!isMobile && <div style={{ flex: 1 }}></div>}
        <div style={{ flex: 1 }}>
            {remainingPlaces.map(place => <PlaceItem key={place.id} {...place} onDeletePlace={deletePlaceItem} />)}
        </div>
        {!isMobile && <div style={{ flex: 1 }}></div>}
    </div>
}

export default UserPlacesPage;