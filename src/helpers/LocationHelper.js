export function storeLocation(keycloak, apiEndpoint, signal, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            courier: '/couriers/' + data.courier,
            tmstp: Date.now().toString(),
            lat: data.lat.toString(),
            lng: data.lng.toString()
        }),
        signal: signal
    };
    return fetch(apiEndpoint + '/positions', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            console.log(data);
            return data;
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}
