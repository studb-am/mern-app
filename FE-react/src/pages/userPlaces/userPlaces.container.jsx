import React from 'react';

import { DUMMY_PLACES } from './userPlaces.data';
import UserPlacesPage from './userPlaces.component';

const UserPlacesPageContainer = props => {
    return <UserPlacesPage places={DUMMY_PLACES} {...props} />
}

export default UserPlacesPageContainer;