export function getDeliveries(keycloak, apiEndpoint, signal) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(apiEndpoint + '/deliveries', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data;
        }
    )
}

export function createDelivery(keycloak, apiEndpoint, signal, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            address: data.address,
            lat: data.lat,
            lng: data.lng
        }),
        signal: signal
    };
    return fetch(apiEndpoint + '/deliveries', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data;
        }
    )
}
