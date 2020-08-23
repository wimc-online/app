import React, {Component, useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../../keycloak";
import "../../helpers/CourierHelper";
import {getCouriers, addCourier} from "../../helpers/CourierHelper";
import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent
} from "@ionic/react";
import PrintCouriers from "./PrintCouriers";

interface ContainerProps {
    keycloak: KeycloakInstance;
}

const CourierCenter: React.FC<ContainerProps> = ({keycloak}) => {
    const [couriers, setCouriers] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();

    const handleAddCourierButton = () => {
        addCourier(keycloak, apiEndpoint, abortController.signal).then(response => {
            getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => setCouriers(response));
        });
    };

    useEffect(() => {
        if (!initialized) {
            getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => {
                setCouriers(response);
                setInitialized(true);
            });
        } else {
            const interval = setInterval(() => {
                getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => setCouriers(response));
            }, 10000);
            return () => {
                abortController.abort();
                if (typeof interval !== "undefined") {
                    clearInterval(interval);
                }
            }
        }

    }, [initialized]);

    return (
        <div>
            {typeof couriers != "undefined" && couriers.length > 0 ?
                <PrintCouriers couriers={couriers}/>
                : <></>
            }
            <IonButton color="medium" type="button" onClick={handleAddCourierButton}>Add Courier</IonButton>
        </div>
    )
};

export default CourierCenter;
