import React from 'react';
import { useParams } from 'react-router-dom';

import UpdatePlacePage from './updatePlace.component';
import Loading from '../../components/alerts/loading.component';
import AlertError from '../../components/alerts/alert-error.component';
import { useFetchData } from '../../assets/custom-hooks';

const UpdatePlaceContainer = props => {

    const placeId = useParams().placeId;
    const { data, error, loading, clearError } = useFetchData(`http://locomovolt.com:4000/api/places/place/${placeId}`)

    if (loading) {
        return <Loading loading={loading} />
    }

    if (error) {
        return <AlertError error={error} onClose={clearError} />
    }

    return data && <UpdatePlacePage {...props} selectedPlace={data.place} />
}

export default UpdatePlaceContainer;