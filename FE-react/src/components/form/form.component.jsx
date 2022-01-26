import React, { useState, useReducer } from 'react';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import './form.css';

import {
  validate,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../assets/validators';

import MapLocationPicker from '../mapModals/mapLocationPicker.component';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
      let formIsValid = true;
      let currentIsValid = false;
      if (action.inputId === 'location') {
        if (action.val && action.val.lat && action.val.lng) {
          currentIsValid = true
        }
      } else {
        currentIsValid = validate(action.val, action.validators);
      }
      for (const inputId in state) {
        if (inputId !== 'meta') {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && currentIsValid;
          } else {
            formIsValid = formIsValid && state[inputId].isValid;
          }
        }
      }
      return {
        ...state,
        [action.inputId]: {
          value: action.val,
          hasBeenFocued: true,
          isValid: currentIsValid,
        },
        meta: {
          ...state.meta,
          isValid: formIsValid
        }

      };
    default:
      return state;
  }
};

const Form = props => {

  const { initialState, action } = props
  const [state, dispatch] = useReducer(formReducer, initialState);

  const [isMapOpen, setIsMapOpen] = useState(false);

  const formHandler = event => {
    event.preventDefault();
    console.log(state);
  };

  return (
    <div className="formContainer">
      <Typography variant="h6" sx={{ padding: 3 }}>
        {action === "new-place" ? "Insert information to add a new place" : "Edit information of the existing place"}
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '80%',
            marginLeft: '10%',
            height: '5%',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="title"
          label="Title"
          fullWidth
          error={!state.title.isValid && state.title.hasBeenFocused}
          helperText={
            !state.title.isValid &&
            state.title.hasBeenFocued &&
            'Title must not be empty!'
          }
          value={state.title.value}
          onChange={evt =>
            dispatch({
              type: 'ON_CHANGE',
              val: evt.target.value,
              inputId: 'title',
              validators: [VALIDATOR_REQUIRE()],
            })}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          fullWidth
          error={!state.description.isValid && state.description.hasBeenFocused}
          helperText={
            !state.description.isValid &&
            state.description.hasBeenFocued &&
            'Please provide a description with at least 5 characters!'
          }
          value={state.description.value}
          onChange={evt =>
            dispatch({
              type: 'ON_CHANGE',
              val: evt.target.value,
              inputId: 'description',
              validators: [VALIDATOR_MINLENGTH(5)],
            })}
        />
        {action === 'new-place' && <Stack direction="row" spacing={10} sx={{ marginTop: '2%', alignItems: 'center', marginLeft: '10%'}}>
          <Button
            variant="text"
            onClick={() => setIsMapOpen(true)}
          >Pick up the location
          </Button>
          {state.location.value && <p>LATITUDE: {state.location.value.lat}; LONGITUDE: {state.location.value.lng} </p>}
        </Stack>}
        <Button
          variant="contained"
          disabled={!state.meta.isValid}
          sx={{ marginLeft: '41%', marginRight: '30%', marginTop: '3%' }}
          onClick={formHandler}
        >
          {action === 'new-place' ? "Add new place" : "Save changes"}
        </Button>
      </Box>
      <MapLocationPicker
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        title={state.title.value}
        onLocationChange={currLoc => {
          dispatch({
            type: 'ON_CHANGE',
            val: currLoc,
            inputId: 'location',
            validators: []
          })
        }}
      />
    </div>
  );
};

export default Form;
