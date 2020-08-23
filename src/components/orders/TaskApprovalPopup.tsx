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
    IonProgressBar
} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";
import {getCouriers} from "../../helpers/CourierHelper";
import {getTasks, confirmTask} from "../../helpers/TaskHelper";
import {getDeliveries} from "../../helpers/DeliveryHelper";
import {KeycloakInstance} from "keycloak-js";
import "./TaskApprovalPopup.scss";


interface ContainerProps {
    keycloak: KeycloakInstance
}

const PrintTasks: React.FC<ContainerProps> = ({keycloak}) => {
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
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
        confirmTask(keycloak, apiEndpoint, abortController.signal, taskId);
    };

    useEffect(() => {
        if (!showModal) {
            getTasks(keycloak, apiEndpoint, abortController.signal).then(response => {
                abortController.abort();
                setTasks(response);
                if (response.length > 0) {
                    handleModal(true);
                }
            });
            const interval = setInterval(() => {
                getTasks(keycloak, apiEndpoint, abortController.signal).then(response => {
                    setTasks(response);
                    if (response.length > 0) {
                        handleModal(true);
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
                        <h2>New tasks available</h2>
                        {tasks.map((task: any, i: number) => {
                            return (
                                <IonCard key={i}>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Task id: {task.id}
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Is processing?:
                                        {task.isProcessing
                                            ? <IonIcon slot="start" icon={checkmarkOutline}/>
                                            : <IonIcon icon={closeOutline}/>}
                                        <IonButton onClick={() => confirmTaskHandler(task["@id"])} color="success">Accept</IonButton>
                                    </IonCardContent>
                                </IonCard>
                            )
                        })}
                        <div className="button-wrapper">
                            <IonProgressBar value={0.5} type="indeterminate" ref={progressElement}></IonProgressBar>
                        </div>
                    </IonModal>
                </IonContent>
            </div>
        )
    } else {
        return (<></>);
    }
};

export default PrintTasks;
