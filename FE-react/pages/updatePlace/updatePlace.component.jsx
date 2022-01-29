import React from 'react';

import Form from '../../components/form/form.component';

const UpdatePlacePage = props => {
    const {selectedPlace} = props;

    const initialState = {
        title: {
          value: selectedPlace.title,
          hasBeenFocused: false,
          isValid: true,
        },
        description: {
          value:selectedPlace.description,
          hasBeenFocused: false,
          isValid: true,
        },
        location: {
          value: selectedPlace.location,
          isValid: true
        },
        meta: {
            placeId: selectedPlace.id,
            isValid: true
        }
        
      };

    return <Form 
      initialState={initialState}
      action="update-place"
    />
}

export default UpdatePlacePage;