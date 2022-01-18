import React, { useState, useReducer } from 'react';
import {
    FormControl,
    InputAdornment,
    OutlinedInput,
    IconButton,
    Typography,
    InputLabel,
    Button,
    TextField,
    Stack,
    Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validate, VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../assets/validators';

const initialState = {
    email: {
        value: '',
        hasBeenFocused: false,
        isValid: false
    },
    password: {
        value: '',
        hasBeenFocused: false,
        isValid: false
    },
    name: {
        value: '',
        hasBeenFocused: false,
        isValid: false
    },
    meta: {
        loginIsValid: false,
        signUpIsValid: false,
    }
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'ON_CHANGE':
            let loginIsValid = true;
            let signUpIsValid = true;
            const currentIsValid = validate(action.val, action.validators);            
            for (const inputId in state) {
                if (inputId !== 'meta') {
                    if (inputId === action.inputId) {
                        if (inputId !== 'name' && action.isLogin) {
                            loginIsValid = loginIsValid && currentIsValid;
                        }
                        signUpIsValid = signUpIsValid && currentIsValid;
                    } else {
                        if (inputId !== 'name' && action.isLogin) {
                            loginIsValid = loginIsValid && state[inputId].isValid;
                        }
                        signUpIsValid = signUpIsValid && state[inputId].isValid;
                    }
                }
            }
            return {
                ...state,
                [action.inputId]: {
                    value: action.val,
                    hasBeenFocused: true,
                    isValid: currentIsValid
                },
                meta: {
                    ...state.meta,
                    loginIsValid,
                    signUpIsValid
                }
            }
        default:
            return state;
    }
}

const AuthPage = props => {

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [state, dispatch] = useReducer(formReducer, initialState);

    console.log(state);

    return <div className="formContainer">
        <Typography variant="h6" sx={{ padding: 3 }}>
            {isLogin ? "Login to the app" : "Signup"}
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
            {!isLogin && <TextField
                id="name"
                label="Your Name"
                fullWidth
                error={!state.name.isValid && state.name.hasBeenFocused}
                helperText={
                    !state.name.isValid &&
                    state.name.hasBeenFocused &&
                    'Please provide a name!'
                }
                value={state.name.value}
                onChange={evt =>
                    dispatch({
                        type: 'ON_CHANGE',
                        val: evt.target.value,
                        inputId: 'name',
                        isLogin: isLogin,
                        validators: [VALIDATOR_REQUIRE()],
                    })}
            />}
            <TextField
                id="email"
                label="Email"
                fullWidth
                error={!state.email.isValid && state.email.hasBeenFocused}
                helperText={
                    !state.email.isValid &&
                    state.email.hasBeenFocused &&
                    'Please provide a valid email address!'
                }
                value={state.email.value}
                onChange={evt =>
                    dispatch({
                        type: 'ON_CHANGE',
                        val: evt.target.value,
                        inputId: 'email',
                        isLogin: isLogin,
                        validators: [VALIDATOR_EMAIL()],
                    })}
            />
            <FormControl sx={{ m: 1, width: '80%', marginLeft: '10%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={state.password.value}
                    onChange={evt => dispatch({
                        type: 'ON_CHANGE',
                        val: evt.target.value,
                        inputId: 'password',
                        isLogin: isLogin,
                        validators: [VALIDATOR_MINLENGTH(5)]
                    })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(prev => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Stack direction="column" sx={{ m: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Button
                    variant="contained"
                    disabled={isLogin ? !state.meta.loginIsValid : !state.meta.signUpIsValid}
                    sx={{ marginLeft: '30%', marginRight: '30%', marginBottom: 2 }}
                    onClick={() => { }}
                >
                    {isLogin ? "Login" : "SignUp"}
                </Button>
                <Button
                    variant="outlined"
                    sx={{ marginLeft: '30%', marginRight: '30%' }}
                    onClick={() => setIsLogin(prev => !prev)}
                >
                    {isLogin ? "Switch to SignUp" : "Switch to Login"}
                </Button>
            </Stack>
        </Box>
    </div>
}

export default AuthPage;