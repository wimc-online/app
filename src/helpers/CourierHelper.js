export function getCouriers(keycloak, apiEndpoint, signal) {
    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(apiEndpoint + '/couriers', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
                return data['hydra:member'];
            }
        );
}

export function addCourier(keycloak, apiEndpoint, signal) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloak.token
        },
        body: JSON.stringify({}),
        signal: signal
    };
    return fetch(apiEndpoint + '/couriers', requestOptions)
        .then(results => {
            return results.json();
        }).then((data) => {
                return data;
            }
        );
}