import React, { useState } from 'react';

import { useFetch } from '../../assets/custom-hooks';
import { DUMMY_PLACES } from './userPlaces.data';
import UserPlacesPage from './userPlaces.component';

const UserPlacesPageContainer = props => {

    const [places, setPlaces] = useState([]);
    const { fetchRequest, loading, error, clearError } = useFetch();


    return <UserPlacesPage places={DUMMY_PLACES} {...props} />
}

export default UserPlacesPageContainer;