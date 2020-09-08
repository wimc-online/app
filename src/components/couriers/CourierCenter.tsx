import React, {useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import "../../helpers/CourierHelper";
import {getCouriers, addCourier} from "../../helpers/CourierHelper";
import {
    IonButton, IonGrid, IonRow, IonCol, IonAlert
} from "@ionic/react";
import PrintCouriers from "./PrintCouriers";
import CourierPositionsMap from "./../locations/CourierPositionsMap";
import AddCourierForm from './AddCourierForm';

interface ContainerProps {
    keycloak: KeycloakInstance;
}

const CourierCenter: React.FC<ContainerProps> = ({keycloak}) => {
    const [couriers, setCouriers] = useState<[]>([]);
    const [initialized, setInitialized] = useState(false);
    const abortController = new AbortController();
    const isEqual = require("react-fast-compare");

    useEffect(() => {
        if (!initialized) {
            getCouriers(keycloak, abortController.signal).then(response => {
                setCouriers(response);
                setInitialized(true);
            });
        } else {
            const interval = setInterval(() => {
                getCouriers(keycloak, abortController.signal).then(response => {
                    if (response !== undefined) {
                        if (!isEqual(couriers, response)) {
                            setCouriers(response)
                        }
                    }
                });
            }, 10000);
            return () => {
                abortController.abort();
                if (typeof interval !== "undefined") {
                    clearInterval(interval);
                }
            }
        }

    }, [initialized]);

    const RenderElements = () => {
        return (
            <div>
                <PrintCouriers couriers={couriers}/>
                <CourierPositionsMap keycloak={keycloak} couriers={couriers}/>
            </div>
        )
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol size="12">
                    <AddCourierForm keycloak={keycloak} />
                    {initialized && typeof couriers !== undefined && couriers.length > 0 ?
                        <RenderElements />
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
