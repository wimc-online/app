import React, {useEffect, useState, useRef} from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonCol, IonGrid,
    IonIcon,
    IonLoading, IonModal,
    IonProgressBar, IonRow
} from "@ionic/react";
import {storeLocation} from "../../helpers/LocationHelper";
import {KeycloakInstance} from "keycloak-js";
import {airplaneOutline, checkmarkOutline, closeOutline, sadOutline} from "ionicons/icons";
import "./LocationWatch.scss";

interface ContainerProps {
    keycloak: KeycloakInstance
}

const LocationWatch: React.FC<ContainerProps> = ({keycloak}) => {
    const [initialized, setInitialized] = useState(false);
    const abortController = new AbortController();
    const ls = require('local-storage');

    const updatePosition = (newLat: number, newLng: number) => {
        ls.set('CourierLat', newLat);
        ls.set('CourierLng', newLng);
        storeLocation(keycloak, abortController.signal, {
            courier: keycloak.subject,
            lat: newLat,
            lng: newLng
        })
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            if (initialized) {
                const interval = setInterval(() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                        if (typeof position.coords !== undefined) {
                            updatePosition(position.coords.latitude, position.coords.longitude);
                        }
                    }, (err) => {
                        console.log(err)
                    });
                }, 10000);
                return () => clearInterval(interval)
            } else {
                navigator.geolocation.getCurrentPosition((position) => {
                    if (typeof position.coords !== undefined) {
                        setInitialized(true);
                    }
                }, (err) => {
                    console.log(err)
                });
            }
        } else {
            console.log("Not Available");
        }
    }, [initialized]);

    if (initialized) {
        return (
            <></>
        )
    } else {
        return (
            <IonModal isOpen={false} cssClass='no-location-popup'>
                <IonGrid>
                    <IonRow className="ion-text-center">
                        <IonCol size="12" class="ion-align-self-start">
                            <h2 className="ion-padding-end">
                                Cannot retrieve location!
                            </h2>
                        </IonCol>
                        <IonCol size="12">
                            <h4>
                                Please allow location for our app.
                            </h4>
                        </IonCol>
                        <IonCol size="12">
                            <IonIcon md={sadOutline} className="icon-big"/>
                        </IonCol>
                        <IonCol size="12" class="ion-align-self-end">
                            <IonButton onClick={() => keycloak.logout()} expand={"full"}>Show Modal</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonModal>
        );
    }
};

export default LocationWatch;
