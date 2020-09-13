import React, {useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import "../../helpers/CourierHelper";
import {getCouriers, addCourier} from "../../helpers/CourierHelper";
import {
    IonButton, IonGrid, IonRow, IonCol, IonAlert, IonList, IonListHeader, IonContent, CreateAnimation, IonLoading
} from "@ionic/react";
import PrintCouriers from "./PrintCouriers";
import CourierPositionsMap from "./../locations/CourierPositionsMap";
import AddCourierForm from './AddCourierForm';
import PrintCouriersList from "./PrintCouriersList";

interface ContainerProps {
    keycloak: KeycloakInstance;
}

const CourierCenter: React.FC<ContainerProps> = ({keycloak}) => {
    const [couriers, setCouriers] = useState<[]>([]);
    const [unactiveCouriers, setUnactiveCouriers] = useState<[]>([]);
    const [initialized, setInitialized] = useState(false);
    const abortController = new AbortController();
    const isEqual = require("react-fast-compare");

    useEffect(() => {
        if (!initialized) {
            getCouriers(keycloak, abortController.signal, true).then(response => {
                if (!isEqual(response, couriers)) {
                    setCouriers(response);
                }
                getCouriers(keycloak, abortController.signal, false).then(response => {
                    if (!isEqual(response, unactiveCouriers)) {
                        setUnactiveCouriers(response);
                    }
                    setInitialized(true);
                })
            });
        } else {
            const interval = setInterval(() => {
                getCouriers(keycloak, abortController.signal, true).then(response => {
                    if (response !== undefined) {
                        if (!isEqual(couriers, response)) {
                            setCouriers(response)
                        }
                        getCouriers(keycloak, abortController.signal, false).then(response => {
                            if (!isEqual(response, unactiveCouriers)) {
                                setUnactiveCouriers(response);
                            }
                        })
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

    if (initialized) {
        return (
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <IonButton routerLink='/page/Couriers/add' expand="full">Add Courier</IonButton>
                        <IonButton routerLink='/page/CouriersMap' expand="full">Show couriers on map</IonButton>
                    </IonCol>
                    <IonCol size="12">
                        {initialized && typeof couriers !== undefined && couriers.length > 0
                            ?
                            <IonList className={"ion-margin-bottom"}>
                                <IonListHeader>
                                    Available Couriers list
                                </IonListHeader>
                                <PrintCouriersList couriers={couriers}/>
                            </IonList>
                            :
                            <IonList className={"ion-margin-bottom"}>
                                <IonListHeader>
                                    There are no available couriers yet!
                                </IonListHeader>
                            </IonList>
                        }
                        {initialized && typeof unactiveCouriers !== undefined && unactiveCouriers.length > 0
                            ?
                            <IonList className={"ion-margin-bottom"}>
                                <IonListHeader>
                                    Unavailable Couriers list
                                </IonListHeader>
                                <PrintCouriersList couriers={unactiveCouriers}/>
                            </IonList>
                            :
                            <IonList className={"ion-margin-bottom"}>
                                <IonListHeader>
                                    There are no couriers in the system yet!
                                </IonListHeader>
                            </IonList>
                        }
                    </IonCol>
                </IonRow>
            </IonGrid>
        )
    } else {
        return (
            <IonLoading
                isOpen={!initialized}
                message={'Please wait...'}
            />
        )
    }
};

export default CourierCenter;
