import React, {useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import "../../helpers/CourierHelper";
import {getCouriers, addCourier} from "../../helpers/CourierHelper";
import {
    IonButton, IonGrid, IonRow, IonCol, IonAlert
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
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <IonButton expand="full" onClick={handleAddCourierButton}>Add Courier</IonButton>
                </IonCol>
                <IonCol size="12">
                    {typeof couriers != "undefined" && couriers.length > 0 ?
                        <PrintCouriers couriers={couriers}/>
                        : <IonAlert
                            isOpen={true}
                            cssClass='my-custom-class'
                            header={'There\'s nothing yet :('}
                            message={'There are no active couriers at this moment'}
                            buttons={['Copy that']}
                        />
                    }
                </IonCol>
            </IonRow>
        </IonGrid>
    )
};

export default CourierCenter;
