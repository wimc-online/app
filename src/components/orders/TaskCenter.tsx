import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import "./AddTask.scss";
import {IonLoading} from "@ionic/react";
import AddTask from './AddTask';
import AddSubTask from './AddSubTask';
import {addTask, getTasks} from "../../helpers/TaskHelper";
import {getCouriers} from '../../helpers/CourierHelper';
import PrintTasks from "./PrintTasks";


interface ContainerProps {
    keycloak: KeycloakInstance,
}

const TaskCenter: React.FC<ContainerProps> = ({keycloak}) => {
    const [courier, setCourier] = useState("");
    const [tasks, setTasks] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();


    const addTaskHandler = () => {
        addTask(keycloak, apiEndpoint, abortController, {courier: courier}).then(response => console.log(response));
    };

    useEffect(() => {
        getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => setCouriers(response));
        getTasks(keycloak, apiEndpoint, abortController.signal).then(response => setTasks(response));
        // const interval = setInterval(() => {
        //     getTasks(keycloak, apiEndpoint, abortController.signal).then(response => setTasks(response));
        //     getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => setCouriers(response));
        // }, 10000);
        return () => {
            // abortController.abort();
            // clearInterval(interval);
        }
    }, []);

    if (typeof couriers !== undefined && couriers.length > 0) {
        return (
            <div>
                <PrintTasks tasks={tasks}/>
                {/*<AddTask keycloak={keycloak} couriers={couriers}/>*/}
                <AddSubTask keycloak={keycloak} tasks={tasks}/>
            </div>
        )
    } else {
        return (
            <IonLoading
                cssClass='my-custom-class'
                isOpen={true}
                message={'Please wait...'}
                duration={5000}
            />
        );
    }
};

export default TaskCenter;
