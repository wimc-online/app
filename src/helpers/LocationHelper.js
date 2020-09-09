export function storeLocation(keycloak, signal, data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            courier: '/couriers/' + data.courier,
            tmstp: '@' + Math.floor(Date.now() / 1000).toString(),
            lat: data.lat.toString().slice(0,9),
            lng: data.lng.toString().slice(0,9)
        }),
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/positions', requestOptions)
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
