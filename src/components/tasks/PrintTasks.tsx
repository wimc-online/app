import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonAlert} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";
import {getSubTasks, getTasks, getTasksForCourier} from "../../helpers/TaskHelper";
import {KeycloakInstance} from "keycloak-js";
import PrintSubTasks from "./PrintSubTasks";


interface ContainerProps {
    keycloak: KeycloakInstance
}

const PrintTasks: React.FC<ContainerProps> = ({keycloak}) => {
    const [tasks, setTasks] = useState([]);
    const [subTasks, setSubTasks] = useState<any>({});
    const [initialized, setInitialized] = useState(false);
    const abortController = new AbortController();
    useEffect(() => {
        if (!initialized) {
            getTasksForCourier(keycloak, abortController.signal, {
                // @ts-ignore
                courierId: keycloak.idTokenParsed.sub
            }).then(response => {
                if (response.length > 0) {
                    setTasks(response);
                }
                setInitialized(true);
            });
        }
    }, [initialized]);

    if (typeof tasks != "undefined" && tasks.length > 0 && initialized) {
        return (
            <div>
                {tasks.map((task: any, i: number) => {
                    return (
                        <IonCard key={i}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Task id: {task.id}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {/*Courier: {task.courier.id} <br/>*/}
                                Is processing?:
                                {task.isProcessing
                                    ? <IonIcon slot="start" icon={checkmarkOutline}/>
                                    : <IonIcon icon={closeOutline}/>}
                                <PrintSubTasks keycloak={keycloak} taskId={task.id}/>
                            </IonCardContent>
                        </IonCard>
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

export default PrintTasks;
