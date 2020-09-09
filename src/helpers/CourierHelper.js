export function getCouriers(keycloak, signal) {
    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/couriers?active=true', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
                return data['hydra:member'];
            }
        ).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function getCourierPosition(keycloak, signal, courierId) {
    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/positions', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
                return data['hydra:member'];
            }
        ).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function addCourier(keycloak, signal, data) {
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + keycloak.token
        },
        body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        }),
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/couriers', requestOptions)
        .then(results => {
            return results.json();
        }).then((data) => {
                return data;
            }
        ).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}