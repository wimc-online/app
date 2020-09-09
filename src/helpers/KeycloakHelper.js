export function getToken() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'client_secret': process.env.REACT_APP_KEYCLOAK_SERCET,
            'grant_type': 'client_credentials',
            'client_id': 'admin-cli'
        }),
    };
    return fetch('https://auth.wimc.online/auth/realms/' + process.env.REACT_APP_KEYCLOAK_REALM + '/protocol/openid-connect/token', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
                return data.access_token;
            }
        )
}

export function getUserDetailedData(userId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return getToken().then((token) => {
        requestOptions.headers.Authorization = 'Bearer ' + token;
        return fetch('https://auth.wimc.online/auth/admin/realms/' + process.env.REACT_APP_KEYCLOAK_REALM + '/users/' + userId, requestOptions)
            .then(results => {
                return results.json();
            }).then(data => {
                    return data;
                }
            )
    });
}
