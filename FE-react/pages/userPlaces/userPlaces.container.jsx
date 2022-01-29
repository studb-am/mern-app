import React from 'react';
import { useParams } from 'react-router-dom';

import UserPlacesPage from './userPlaces.component';
import { useFetchData } from '../../assets/custom-hooks';
import Loading from '../../components/alerts/loading.component';
import AlertError from '../../components/alerts/alert-error.component';

const UserPlacesPageContainer = props => {
    
    const { userId } = useParams();
    const { data, loading, error, clearError } = useFetchData(`http://locomovolt.com:4000/api/places/user/${userId}`);

    if (loading) {
        return <Loading loading={loading} />
    }

    if (error) {
        return <AlertError error={error} onClose={clearError} />
    }

    return data && <UserPlacesPage places={data.places} {...props} />
}

export default UserPlacesPageContainer;