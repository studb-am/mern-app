import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Header from '../components/header/header.component';
import UsersPage from "./users/users.component";
import HomePage from "./home/home.component";

const Navigator = props => {
    return <div>
        <Header />
        <Router>
            <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/users" exact element={<UsersPage />} />
                <Route path="*" element={<h2>Nothing found</h2>} />
            </Routes>
        </Router>
    </div>
}

export default Navigator;