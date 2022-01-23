import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Header from '../components/header/header.component';
import { default as UsersPage } from './users/users.container';
import { default as UserPlacesPage } from './userPlaces/userPlaces.container';
import NewPlacePage from './newPlace/newPlace.component';
import { default as UpdatePlacePage } from './updatePlace/updatePlace.container';
import HomePage from './home/home.component';
import AuthPage from './auth/auth.component';
import PrivateRoute from '../components/privateRoute/privateRoute.component';
import { AuthContext } from './auth/auth.context';
import { theme } from '../assets/util';

const Navigator = props => {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const login = useCallback(() => setUserIsLogged(true), []);
  const logout = useCallback(() => { console.log('loggedOut'); setUserIsLogged(false) }, []);

  return (
    <AuthContext.Provider value={{ userIsLogged, login, logout }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/users" exact element={<UsersPage />} />
            <Route path="/:userId/places" exact element={<UserPlacesPage />} />
            <Route path="/new-place" exact element={<PrivateRoute />}>
              <Route path="/new-place" exact element={<NewPlacePage />} />
            </Route>
            <Route path="/update-place/:placeId" exact element={<PrivateRoute />}>
              <Route path="/update-place/:placeId" exact element={<UpdatePlacePage />} />
            </Route>
            <Route path="/authenticate" exact element={userIsLogged ? <Navigate to="/" /> : <AuthPage />} />
            <Route path="*" element={<h2>Nothing found</h2>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default Navigator;
