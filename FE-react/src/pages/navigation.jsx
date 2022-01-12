import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import Header from '../components/header/header.component';
import {default as UsersPage} from './users/users.container';
import {default as UserPlacesPage} from './userPlaces/userPlaces.container';
import HomePage from './home/home.component';
import { theme } from '../assets/util'; 

const Navigator = props => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/users" exact element={<UsersPage />} />
          <Route path="/:userId/places" exact element={<UserPlacesPage />} />
          <Route path="*" element={<h2>Nothing found</h2>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default Navigator;
