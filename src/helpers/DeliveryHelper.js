export function getDeliveries(keycloak, signal) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/deliveries', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data;
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function getOpenDeliveries(keycloak, signal) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/deliveries', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data;
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function createDelivery(keycloak, signal, data) {
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
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/deliveries', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
                return data;
            }
        )
}

export function assignCourierToDelivery(keycloak, signal, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            courier: data.courier
        }),
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/deliveries/' + data.delivery_id + '/courier', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data;
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}
