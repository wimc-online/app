import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonAlert, IonButton} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";
import {finishSubTask, getSubTasks, getTasks, getTasksForCourier} from "../../helpers/TaskHelper";
import {KeycloakInstance} from "keycloak-js";
import RouteSubTask from "./RouteSubTask";
import {useHistory} from "react-router";

interface ContainerProps {
    keycloak: KeycloakInstance,
    taskId: string
}

const PrintSubTasks: React.FC<ContainerProps> = ({keycloak, taskId}) => {
    const [tasks, setTasks] = useState([]);
    const [subTasks, setSubTasks] = useState<any>({});
    const [initialized, setInitialized] = useState(false);
    const abortController = new AbortController();
    const history = useHistory();

    const finishSubTaskAction = (subTaskId: string) => {
        finishSubTask(keycloak, abortController.signal, subTaskId).then(result => {
                history.push('/page/Dashboard')
            }
        );
    }

    useEffect(() => {
        if (!initialized) {
            getSubTasks(keycloak, abortController.signal, {
                // @ts-ignore
                courierId: keycloak.idTokenParsed.sub,
                taskId: taskId
            }).then(response => {
                setSubTasks(response);
                setInitialized(true);
            })
        }
    }, [initialized]);

    if (typeof subTasks != "undefined" && subTasks.length > 0 && initialized) {
        return (
            <div>
                {subTasks.map((subTask: any, i: number) => {
                    return (
                        <div key={i}>
                            <p>
                                SubTaskID: {subTask.id} <br/>
                                Destination: {subTask.delivery.address}
                            </p>
                            {!subTask.isFinished
                                ?
                                <>
                                    <IonButton expand={"full"} onClick={() => finishSubTaskAction(subTask.id)}>Finish
                                        task</IonButton>
                                    <RouteSubTask subtask={subTask}/>
                                </>
                                : <></>}
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <IonAlert
                isOpen={true}
                cssClass='my-custom-class'
                header={'There\'s nothing yet :('}
                message={'There are no active tasks at this moment'}
                buttons={['Copy that']}
            />
        );
    }
};

export default PrintSubTasks;
