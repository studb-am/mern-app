import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Header from '../components/header/header.component';
//import { default as UsersPage } from './users/users.container';
//import { default as UserPlacesPage } from './userPlaces/userPlaces.container';
//import NewPlacePage from './newPlace/newPlace.component';
//import { default as UpdatePlacePage } from './updatePlace/updatePlace.container';
//import HomePage from './home/home.component';
//import AuthPage from './auth/auth.component';
//import PrivateRoute from '../components/privateRoute/privateRoute.component';
import { AuthContext } from './auth/auth.context';
import { theme } from '../assets/util';

//code splitting for production
const UsersPage = React.lazy(() => import('./users/users.container'));
const UserPlacesPage = React.lazy(() => import('./userPlaces/userPlaces.container'));
const NewPlacePage = React.lazy(() => import('./newPlace/newPlace.component'));
const UpdatePlacePage = React.lazy(() => import('./updatePlace/updatePlace.container'));
const HomePage = React.lazy(() => import('./home/home.component'));
const AuthPage = React.lazy(() => import('./auth/auth.component'));
const PrivateRoute = React.lazy(() => import('../components/privateRoute/privateRoute.component'));

let timeoutLogger;

const Navigator = props => {
  const [token, setToken] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, currToken, expirationDate) => {
    setUserId(uid);
    setToken(currToken);
    const newExpDate = expirationDate || new Date(new Date.getTime() + 1000 * 60 * 60).toISOString();
    setExpDate(newExpDate);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: currToken,
      expirationDate: newExpDate
    }));
    console.log('logged In!');
  }, []);
  const logout = useCallback(() => {
    console.log('logged Out');
    localStorage.removeItem('userData');
    setToken(null);
    setExpDate(null);
    setUserId(null);
  }, []);

  //Auto-login: controllo la presenza di un token valido
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData?.token && new Date(storedUserData.expirationDate) > new Date()) {
      login(storedUserData.userId, storedUserData.token, storedUserData.expirationDate);
    }
  }, []);
  useEffect(() => {
    if (expDate && token) {
      const remainingTime = new Date(expDate).getTime() - new Date().getTime();
      timeoutLogger = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(timeoutLogger)
    }

  }, [token, expDate])

  return (
    <AuthContext.Provider value={{ userIsLogged: !!token, login, logout, userId, token }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Suspense fallback={<div><h2>Loading...</h2></div>}>
            <Routes>

              <Route path="/" exact element={<HomePage />} />
              <Route path="/users" exact element={<UsersPage />} />
              <Route path="/places/user/:userId" exact element={<UserPlacesPage />} />
              <Route path="/new-place" exact element={<PrivateRoute />}>
                <Route path="/new-place" exact element={<NewPlacePage />} />
              </Route>
              <Route path="/update-place/:placeId" exact element={<PrivateRoute />}>
                <Route path="/update-place/:placeId" exact element={<UpdatePlacePage />} />
              </Route>
              <Route path="/authenticate" exact element={!!token ? <Navigate to="/" /> : <AuthPage />} />
              <Route path="*" element={<h2>Nothing found</h2>} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default Navigator;
