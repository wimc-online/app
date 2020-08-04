import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import "./AddTask.scss";
import {IonButton, IonLoading} from "@ionic/react";


interface ContainerProps {
    keycloak: KeycloakInstance,
    tasks: never[]
}

const AddSubTask: React.FC<ContainerProps> = ({keycloak, tasks}) => {
    const [task, setTask] = useState("");
    const [taskName, setTaskName] = useState("");
    const taskSelectRef = useRef() as MutableRefObject<HTMLLabelElement>;
    const taskFormRef = useRef() as MutableRefObject<HTMLFormElement>;

    useEffect(() => {
        return () => {}
    }, []);

    // @ts-ignore
    const subtaskSubmit = (evt) => {
        evt.preventDefault();
    };

    if (tasks.length > 0) {
        return (
            <div>
                <form onSubmit={subtaskSubmit} ref={taskFormRef}>
                    <label>
                        Subtask name:
                        <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                    </label> <br/>
                    <label ref={taskSelectRef}>
                        Task ID:<br/>
                        <select value={task} id="" onChange={e => setTask(e.target.value)}>
                            <option value="">Select task</option>
                            {tasks.map((task: any, i: number) => {
                                return (
                                    <option key={i} value={task.id}>{task.id}</option>
                                )
                            })}
                        </select>
                    </label> <br/>
                    <IonButton color="medium" type="submit">Add Subtask</IonButton>
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

export default AddSubTask;
