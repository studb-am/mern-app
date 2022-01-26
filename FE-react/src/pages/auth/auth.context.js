import { createContext } from "react";

export const AuthContext = createContext({
    userIsLogged: false,
    userId: null,
    login: () => {},
    logout: () => {}
});