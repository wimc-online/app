import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import "./AddTask.scss";
import {IonLoading} from "@ionic/react";


interface ContainerProps {
    keycloak: KeycloakInstance,
}

const AddTask: React.FC<ContainerProps> = ({keycloak}) => {
    const [courier, setCourier] = useState("");
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [couriers, setCouriers] = useState([]);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const taskSelectRef = useRef() as MutableRefObject<HTMLLabelElement>;

    const addTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': 'Bearer ' + keycloak.token,
            },
            body: JSON.stringify({
                courier: '/couriers/' + courier,
                isProcessing: false
            })
        };
        fetch(apiEndpoint + '/tasks', requestOptions)
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
        })
    };

    const getCouriers = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': 'Bearer ' + keycloak.token,
            }
        };
        fetch(apiEndpoint + '/couriers', requestOptions)
            .then(results => {
                return results.json();
            }).then(data => {
            setCouriers(data['hydra:member']);
            console.log(data['hydra:member']);
        })
    };

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
        getCouriers();
        getTasks();
    }, []);

    // @ts-ignore
    const taskSubmit = (evt) => {
        evt.preventDefault();
        if (courier.length === 0) {

        } else {
            addTask();
        }
    };
    // @ts-ignore
    const subtaskSubmit = (evt) => {
        evt.preventDefault();
    };

    // @ts-ignore
    const onCourierStateChange = (e) => {
        if (e.target.value !== '') {
            setCourier(e.target.value);
            taskSelectRef.current.classList.remove("d-none");
        } else {
            taskSelectRef.current.classList.add("d-none");
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
                    <label id="taskId" ref={taskSelectRef} className='d-none'>
                        Task:<br/>
                        <select value={task} id="" onChange={e => setTask(e.target.value)}>
                            <option value="">Select task</option>
                            {tasks.map((task: any, i: number) => {
                                return (
                                    <option key={i} value={task.id}>{task.id}</option>
                                )
                            })}
                        </select>
                    </label> <br/>
                    <input type="submit" value="Submit"/>
                </form>

                <form onSubmit={subtaskSubmit} className={task.length === 0 ? 'd-none' : ''}>
                    <label>
                        Task name:
                        <input type="text" value={task} onChange={e => setTask(e.target.value)}/>
                    </label> <br/>
                    <label>
                        Task:<br/>
                        <select value={task} id="" onChange={e => setTask(e.target.value)}>
                            <option value="">Select task</option>
                            {tasks.map((task: any, i: number) => {
                                return (
                                    <option key={i} value={task.id}>{task.id}</option>
                                )
                            })}
                        </select>
                    </label> <br/>
                    <input type="submit" value="Submit"/>
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
