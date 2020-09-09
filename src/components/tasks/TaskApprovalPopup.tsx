import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonContent,
    IonModal,
    IonButton,
    IonProgressBar, IonRow, IonGrid, IonCol
} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";
import {getCouriers} from "../../helpers/CourierHelper";
import {getTasks, confirmTask, getTasksForCourier} from "../../helpers/TaskHelper";
import {getDeliveries} from "../../helpers/DeliveryHelper";
import {KeycloakInstance} from "keycloak-js";
import "./TaskApprovalPopup.scss";


interface ContainerProps {
    keycloak: KeycloakInstance
}

const PrintTasks: React.FC<ContainerProps> = ({keycloak}) => {
    const [tasks, setTasks] = useState([]);
    const abortController = new AbortController();
    const [showModal, setShowModal] = useState(false);
    const progressElement = useRef() as MutableRefObject<HTMLIonProgressBarElement>;

    const handleModal = (enable: boolean) => {
        if (enable) {
            if (!showModal) {
                setShowModal(true);
            }
        } else {
            if (showModal) {
                setShowModal(false);
            }
        }
    };

    const confirmTaskHandler = (taskId: string) => {
        confirmTask(keycloak, abortController.signal, taskId).then(result => setShowModal(false));
    };

    useEffect(() => {
        if (!showModal) {
            getTasksForCourier(keycloak, abortController.signal, {
                // @ts-ignore
                courierId: keycloak.idTokenParsed.sub,
                is_processing: false
            }).then(response => {
                // abortController.abort();
                if (response !== undefined) {
                    setTasks(response);
                    if (response.length > 0) {
                        handleModal(true);
                    }
                }
            });
            const interval = setInterval(() => {
                getTasksForCourier(keycloak, abortController.signal, {
                    // @ts-ignore
                    courierId: keycloak.idTokenParsed.sub,
                    is_processing: false
                }).then(response => {
                    if (response !== undefined) {
                        setTasks(response);
                        if (response.length > 0) {
                            handleModal(true);
                        }
                    }
                });
            }, 10000);
            return () => {
                abortController.abort();
                clearInterval(interval);
            }
        }
        return () => {
            abortController.abort();
        }
    }, [showModal]);

    if (typeof tasks != "undefined") {
        return (
            <div>
                <IonContent>
                    <IonModal isOpen={showModal} cssClass='task-approval-popup'>
                        <IonGrid>
                            <IonRow className="ion-text-center">
                                <IonCol size="12" class="ion-align-self-start">
                                    <h2 className="ion-padding-end">
                                        New tasks available
                                    </h2>
                                </IonCol>
                                <IonCol size={"12"}>
                                    {tasks.map((task: any, i: number) => {
                                        return (
                                            <IonCard key={i}>
                                                <IonCardHeader>
                                                    <IonCardTitle>
                                                        Task id: {task.id}
                                                    </IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <p className="ion-padding-bottom">
                                                        Is processing?:&nbsp;
                                                        {task.isProcessing
                                                            ? <>Yes, it is!</>
                                                            : <>No, it doesn't :(</>}
                                                    </p>
                                                    <IonProgressBar value={0.5} type="indeterminate"
                                                                    ref={progressElement}></IonProgressBar>
                                                    <IonButton onClick={() => confirmTaskHandler(task["@id"])}
                                                               expand={"full"}>Accept</IonButton>
                                                </IonCardContent>
                                            </IonCard>
                                        )
                                    })}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonModal>
                </IonContent>
            </div>
        )
    } else {
        return (<></>);
    }
};

export default PrintTasks;
