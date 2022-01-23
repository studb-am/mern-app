export const authenticate = async (isLogin, state, auth) => {
    if (isLogin) { //verifico se l'utente è loggato al fine di fare rispettivamente le operazioni di login o signup

    } else {
        try {
            const response = await fetch('http://locomovolt.com:4000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: state.name.value,
                    email: state.name.email,
                    password: state.name.password
                })
            });
            const data = await response.json();
            console.log(data);
            auth.login();
        } catch (err) {
            console.log('ERROR', err.message);
        }
    }
}