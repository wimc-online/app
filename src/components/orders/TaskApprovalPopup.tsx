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
import {getTasks} from "../../helpers/TaskHelper";
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
        console.log(progressElement);
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

    useEffect(() => {
        if (!showModal) {
            getTasks(keycloak, apiEndpoint, abortController.signal).then(response => {
                abortController.abort();
                setTasks(response);
                handleModal(true);
            });
            const interval = setInterval(() => {
                getTasks(keycloak, apiEndpoint, abortController.signal).then(response => setTasks(response));
                handleModal(true);
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
                                        Courier: {task.courier} <br/>
                                        Is processing?:
                                        {task.isProcessing
                                            ? <IonIcon slot="start" icon={checkmarkOutline}/>
                                            : <IonIcon icon={closeOutline}/>}
                                    </IonCardContent>
                                </IonCard>
                            )
                        })}
                        <div className="button-wrapper">
                            <IonProgressBar value={0.5} type="indeterminate" ref={progressElement}></IonProgressBar>
                            <IonButton onClick={() => handleModal(false)} color="success">Accept</IonButton>
                            <IonButton onClick={() => handleModal(false)} color="danger">Dissmiss</IonButton>
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
