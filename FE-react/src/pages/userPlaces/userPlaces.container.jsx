import React, { useState } from 'react';

import { DUMMY_PLACES } from './userPlaces.data';
import UserPlacesPage from './userPlaces.component';

const UserPlacesPageContainer = props => {

    const [places, setPlaces] = useState([]);



    return <UserPlacesPage places={DUMMY_PLACES} {...props} />
}

export default UserPlacesPageContainer;