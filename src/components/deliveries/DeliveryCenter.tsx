import React, {useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import {IonLoading} from "@ionic/react";
import PrintDeliveries from "./PrintDeliveries";
import {getDeliveries} from "../../helpers/DeliveryHelper";

interface ContainerProps {
    keycloak: KeycloakInstance,
}

const DeliveryCenter: React.FC<ContainerProps> = ({keycloak}) => {
    const [deliveries, setDeliveries] = useState([]);
    const [deliveriesLoaded, setDeliveriesLoaded] = useState(false);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();
    const isEqual = require("react-fast-compare");

    useEffect(() => {
        if (!deliveriesLoaded) {
            getDeliveries(keycloak, apiEndpoint, abortController.signal).then(response => {
                if (response !== undefined) {
                    setDeliveries(response['hydra:member']);
                    setDeliveriesLoaded(true);
                }
            });
        }
        const interval = setInterval(() => {
            getDeliveries(keycloak, apiEndpoint, abortController.signal).then(response => {
                if (response !== undefined) {
                    if (!isEqual(deliveries, response['hydra:member'])) {
                        setDeliveries(response['hydra:member']);
                    }
                }
            });
        }, 10000);
        return () => {
            abortController.abort();
            clearInterval(interval);
        }
    }, [deliveries]);

    if (typeof deliveries !== undefined && deliveriesLoaded) {
        return (
            <div>
                <PrintDeliveries deliveries={deliveries} keycloak={keycloak}/>
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

export default DeliveryCenter;
