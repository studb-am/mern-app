import React from "react";

import UsersPage from "./users.component";
import AlertError from "../../components/alerts/alert-error.component";
import Loading from "../../components/alerts/loading.component";

import { useFetchData } from "../../assets/custom-hooks";

const UsersPageContainer = props => { 

    const { data, loading, error, clearError } = useFetchData('http://locomovolt.com:4000/api/users');

    if (error) {
        return <AlertError onClose={clearError} error={error} />
    }

    if (loading) {
        return <Loading loading={loading} />
    }

    return data && <UsersPage {...props} users={data.users} />

}

/*
import { useFetch } from "../../assets/custom-hooks";

const UsersPageContainer = props => {

    const [users, setUsers] = useState([]);
    const {fetchRequest, loading, error, clearError} = useFetch();

    useEffect(() => {
        fetchRequest('http://locomovolt.com:4000/api/users')
        .then(data => setUsers(data.users));
    }, [fetchRequest]);

    if (error) {
        return <AlertError onClose={clearError} error={error} />
    }

    if (loading) {
        return <Loading loading={loading} />
    }

    return <UsersPage {...props} users={users} />
}
*/

export default UsersPageContainer;
