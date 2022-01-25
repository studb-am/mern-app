import React, { useState, useReducer, useContext } from 'react';
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

import AlertError from '../../components/alerts/alert-error.component';
import Loading from '../../components/alerts/loading.component';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../assets/validators';
import { AuthContext } from './auth.context';
import { initialState, formReducer } from './auth.functions';
import { useFetch } from '../../assets/custom-hooks';

const AuthPage = props => {

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [state, dispatch] = useReducer(formReducer, initialState);
    const { fetchRequest, loading, error, clearError } = useFetch();
    const auth = useContext(AuthContext);

    const authenticate = (isLogin, state, auth) => {
        if (isLogin) {
            fetchRequest(
                'http://locomovolt.com:4000/api/users/login',
                'POST',
                { 'Content-Type': 'application/json' },
                JSON.stringify({
                    email: state.email.value,
                    password: state.password.value
                })
            )
                .then(data => auth.login());
        } else {
            fetchRequest(
                'http://locomovolt.com:4000/api/users/signup',
                'POST',
                { 'Content-Type': 'application/json' },
                JSON.stringify({
                    name: state.name.value,
                    email: state.email.value,
                    password: state.password.value
                })
            )
                .then(data => auth.login());
        }
    }

    return <div className="formContainer">
        { error && <AlertError onClose={clearError} error={error} /> }
        <Loading loading={loading} />
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
                    onClick={() => authenticate(isLogin, state, auth)}
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