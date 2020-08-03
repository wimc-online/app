import React, {useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../../keycloak";
import {getTasks} from "../../helpers/TaskHelper";


interface ContainerProps {
    keycloak: KeycloakInstance,
}

const AddTask: React.FC<ContainerProps> = ({keycloak}) => {
    const [tasks, setTasks] = useState([]);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();

    useEffect(() => {
        getTasks(keycloak, apiEndpoint, abortController.signal).then(response => setTasks(response));
        const interval = setInterval(() => {
            getTasks(keycloak, apiEndpoint, abortController.signal).then(response => setTasks(response));
        }, 10000);
        return () => {
            clearInterval(interval);
            abortController.abort();
        }
    }, []);

    return (
        <div>
            {tasks.map((task: any, i: number) => {
                return (
                    <ul key={i}>
                        <li>Task id: {task.id}</li>
                        <li>Courier: {task.courier}</li>
                        <li>Is processing?: {task.isProcessing ? 'yes' : 'no'}</li>
                    </ul>
                )
            })}
        </div>
    )
};

export default AddTask;
