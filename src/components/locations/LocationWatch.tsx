import React, {useEffect, useState, useRef} from 'react';
import {IonLoading} from "@ionic/react";
import {storeLocation} from "../../helpers/LocationHelper";
import {KeycloakInstance} from "keycloak-js";

interface ContainerProps {
    keycloak: KeycloakInstance
}

const LocationWatch: React.FC<ContainerProps> = ({keycloak}) => {
    const [initialized, setInitialized] = useState(false);
    const abortController = new AbortController();

    const updatePosition = (newLat: number, newLng: number) => {
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
                            console.log(position.coords.latitude, position.coords.longitude);
                        }
                        updatePosition(position.coords.latitude, position.coords.longitude);
                    }, (err) => {
                        console.log(err)
                    });
                }, 5000);
                return () => clearInterval(interval)
            } else {
                navigator.geolocation.getCurrentPosition((position) => {
                    if (typeof position.coords !== undefined) {
                        console.log(position.coords.latitude, position.coords.longitude);
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
            <IonLoading
                isOpen={true}
                message={'Cannot retrieve location'}
            />
        );
    }
};

export default LocationWatch;
