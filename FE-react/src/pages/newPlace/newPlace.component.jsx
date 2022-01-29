import React from 'react';

import Form from '../../components/form/form.component';

const initialState = {
  title: {
    value: '',
    hasBeenFocused: false,
    isValid: false,
  },
  description: {
    value: '',
    hasBeenFocused: false,
    isValid: false,
  },
  location: {
    value: null,
    isValid: false
  },
  imageUrl: {
    value: null,
    isValid: false
  },
  meta: {
    isValid: false,
  }
};

const NewPlacePage = props => {
  return <Form 
    initialState={initialState}
    action="new-place"
  />
};

export default NewPlacePage;
