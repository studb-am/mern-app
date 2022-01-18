import { createContext } from "react";

export const AuthContext = createContext({
    userIsLogged: false,
    login: () => {},
    logout: () => {}
});