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
        is_processing: data.isProcessing
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

    let url = '';
    if (data.courierId) {
        url = process.env.REACT_APP_API_ENDPOINT + '/couriers/' + data.courierId + '/tasks/' + data.taskId + '/subtasks'
    } else {
        url = process.env.REACT_APP_API_ENDPOINT + '/tasks/' + data + '/subtasks'
    }

    return fetch(url, requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
            if (data['hydra:member'] !== undefined) {
                return data['hydra:member'];
            } else {
                return data;
            }
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}

export function finishTask(keycloak, signal, taskId) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            isProcessing: false
        }),
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/tasks/' + taskId, requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
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

export function finishSubTask(keycloak, signal, subTaskId) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': 'Bearer ' + keycloak.token,
        },
        body: JSON.stringify({
            isFinished: true
        }),
        signal: signal
    };
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/subtasks/' + subTaskId, requestOptions)
        .then(results => {
            return results.json();
        }).then(data => {
                getSubTasks(keycloak, signal, data.task.id).then(
                    result => {
                        if (result.length === 1) {
                            finishTask(keycloak, signal, data.task.id);
                        }
                    }
                )
            }
        ).catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Uh oh, an error!', err);
            }
        });
}