export function getTasks(keycloak, signal) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/tasks', requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data['hydra:member'];
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function getTasksForCourier(keycloak, signal, data) {
    const getParams = new URLSearchParams({
        is_processing: data.is_processing
    });
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/couriers/' + data.courierId + '/tasks?' + getParams, requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            return data['hydra:member'];
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function confirmTask(keycloak, signal, taskId) {
    let courierId = keycloak.idTokenParsed.sub;
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            courier: '/couriers/' + courierId,
            isProcessing: true
        }),
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + taskId, requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
                console.log(data);
            }
        ).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function getSubTasks(keycloak, signal, data) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/couriers/' + data.courierId + '/tasks/' + data.taskId + '/subtasks', requestOptions)
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