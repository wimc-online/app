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

export function addTask(keycloak, apiEndpoint, signal, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            courier: '/couriers/' + data.courier,
            isProcessing: false
        }),
        signal: signal
    };
    return fetch(apiEndpoint + '/tasks', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            console.log(data);
        }
    )
}