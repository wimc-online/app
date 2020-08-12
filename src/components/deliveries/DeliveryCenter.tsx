import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import {IonLoading} from "@ionic/react";
import PrintDeliveries from "./PrintDeliveries";
import {getDeliveries} from "../../helpers/DeliveryHelper";
import AddDelivery from "./AddDelivery";


interface ContainerProps {
    keycloak: KeycloakInstance,
}

const TaskCenter: React.FC<ContainerProps> = ({keycloak}) => {
    const [deliveries, setDeliveries] = useState([]);
    const [deliveriesLoaded, setDeliveriesLoaded] = useState(false);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();

    useEffect(() => {
        getDeliveries(keycloak, apiEndpoint, abortController.signal).then(response => {
            setDeliveries(response['hydra:member']);
            setDeliveriesLoaded(true);
        });
        const interval = setInterval(() => {
        }, 10000);
        return () => {
            abortController.abort();
            clearInterval(interval);
        }
    }, []);

    if (typeof deliveries !== undefined && deliveriesLoaded) {
        return (
            <div>
                <PrintDeliveries deliveries={deliveries}/>
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
