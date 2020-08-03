export function getTasks(keycloak, apiEndpoint, signal) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(apiEndpoint + '/tasks', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data['hydra:member'];
        }
    )
}