import React, {Component, useEffect, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import keycloak from "../keycloak";
import "../helpers/CourierHelper";
import {getCouriers} from "../helpers/CourierHelper";

interface ContainerProps {
    keycloak: KeycloakInstance;
}

const ApiCall: React.FC<ContainerProps> = ({keycloak}) => {
    const [couriers, setCouriers] = useState([]);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");

    const addCourier = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + keycloak.token
            },
            body: JSON.stringify({})
        };
        fetch(apiEndpoint + '/couriers', requestOptions)
            .then(results => {
                return results.json();
            }).then((data) => {
            getCouriers(keycloak, apiEndpoint).then(response => setCouriers(response));
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getCouriers(keycloak, apiEndpoint).then(response => setCouriers(response));
        }, 10000);
        return () => clearInterval(interval)
    }, []);

    if (couriers.length > 0) {
        return (
            <div>
                <ul>
                    {couriers.map((courier: any, i: number) => {
                        return (<li key={i}>{courier.id}</li>)
                    })}
                </ul>
                <button type="button" onClick={addCourier}>
                    Add Courier
                </button>
            </div>
        )
    } else {
        return (<div></div>)
    }
};

export default ApiCall;
