import { validate } from '../../assets/validators';

export const formReducer = (state, action) => {
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
};

export const initialState = {
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