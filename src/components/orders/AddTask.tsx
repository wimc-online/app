import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import "./AddTask.scss";
import {IonButton, IonLoading} from "@ionic/react";
import AddSubTask from './AddSubTask';
import {addTask, getTasks} from "../../helpers/TaskHelper";
import { getCouriers } from '../../helpers/CourierHelper';


interface ContainerProps {
    keycloak: KeycloakInstance,
    tasks?: never[],
    couriers: never[]
}

const AddTask: React.FC<ContainerProps> = ({keycloak, tasks, couriers}) => {
    const [courier, setCourier] = useState("");
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();

    const addTaskHandler = () => {
        addTask(keycloak, apiEndpoint, abortController.signal, {courier: courier}).then(response => console.log(response));
    };

    useEffect(() => {

        return () => {
            abortController.abort();
        }
    }, []);

    // @ts-ignore
    const taskSubmit = (evt) => {
        evt.preventDefault();
        if (courier.length === 0) {

        } else {
            addTaskHandler();
        }
    };

    // @ts-ignore
    const onCourierStateChange = (e) => {
        if (e.target.value !== '') {
            setCourier(e.target.value);
        }
    };

    if (couriers.length > 0) {
        return (
            <div>
                <form onSubmit={taskSubmit}>
                    <label>
                        Courier:<br/>
                        <select value={courier} id="" onChange={onCourierStateChange}>
                            <option value="">Select courier</option>
                            {couriers.map((courier: any, i: number) => {
                                return (
                                    <option key={i} value={courier.id}>{courier.id}</option>
                                )
                            })}
                        </select>
                    </label> <br/>
                    <IonButton color="medium" type="submit">Add Task</IonButton>
                </form>
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

export default AddTask;
