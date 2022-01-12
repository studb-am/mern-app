import React from 'react';
import {useMediaQuery} from '@mui/material';

import PlaceItem from '../../components/placeItem/placeItem.component';
import {IS_MOBILE_SMALL_VIEW_DEF} from '../../assets/util';

const UserPlacesPage = props => {
    const { places }= props;
    const isMobile = useMediaQuery(IS_MOBILE_SMALL_VIEW_DEF);

    return <div style={{display: 'flex',justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', padding: 25}}>
    {!isMobile && <div style={{flex:1}}></div>}
    <div style={{ flex: 1}}>
        {places.map(place => <PlaceItem key={place.id} {...place} />)}
    </div>
    {!isMobile && <div style={{flex: 1}}></div>}
    </div>
}

export default UserPlacesPage;