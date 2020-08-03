import React, {Component, useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../keycloak";
import "../helpers/CourierHelper";
import {getCouriers, addCourier} from "../helpers/CourierHelper";

interface ContainerProps {
    keycloak: KeycloakInstance;
}

const ApiCall: React.FC<ContainerProps> = ({keycloak}) => {
    const [couriers, setCouriers] = useState([]);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();

    const handleAddCourierButton = () => {
        addCourier(keycloak, apiEndpoint, abortController.signal).then(response => {
            getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => setCouriers(response));
        });
    };

    useEffect(() => {
        getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => setCouriers(response));
        const interval = setInterval(() => {
            getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => setCouriers(response));
        }, 10000);
        return () => {
            abortController.abort();
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            {couriers.length > 0 ?
                <ul>
                    {couriers.map((courier: any, i: number) => {
                        console.log(courier);
                        return (<li key={i}>{courier.id}</li>)
                    })}
                </ul>
                : <></>
            }
            <button type="button" onClick={handleAddCourierButton}>
                Add Courier
            </button>
        </div>
    )
};

export default ApiCall;
