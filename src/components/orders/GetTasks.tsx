import React, {useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../../keycloak";


interface ContainerProps {
    keycloak: KeycloakInstance,
}

const AddTask: React.FC<ContainerProps> = ({keycloak}) => {
    const [tasks, setTasks] = useState([]);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");

    const getTasks = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': 'Bearer ' + keycloak.token,
            }
        };
        fetch(apiEndpoint + '/tasks', requestOptions)
            .then(results => {
                return results.json();
            }).then(data => {
            setTasks(data['hydra:member'])
        })
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            const interval = setInterval(() => {
                getTasks();
            }, 5000);
            return () => clearInterval(interval)
        } else {
            console.log("Not Available");
        }
    }, []);

    return (
        <div>
            {tasks.map((task: any, i: number) => {
                console.log(task);
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
