import React from "react";

import UsersPage from "./users.component";
import { DUMMY_USERS } from './users.data';

const UsersPageContainer = props => {
    return <UsersPage {...props} users={DUMMY_USERS} />
}

export default UsersPageContainer;