import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";
import {getDeliveries, assignCourierToDelivery} from "../../helpers/DeliveryHelper";
import {getCouriers} from "../../helpers/CourierHelper";
import {KeycloakInstance} from "keycloak-js";


interface ContainerProps {
    deliveries?: never[],
    keycloak: KeycloakInstance,
}

const PrintDeliveries: React.FC<ContainerProps> = ({deliveries, keycloak}) => {
    const [courier, setCourier] = useState('');
    const [delivery, setDelivery] = useState<string>();
    const [couriers, setCouriers] = useState([]);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();


    useEffect(() => {
        getCouriers(keycloak, apiEndpoint, abortController.signal).then(response => {
            if (response !== undefined) {
                setCouriers(response);
            }
        });
        const interval = setInterval(() => {
        }, 10000);
        return () => {
            abortController.abort();
            clearInterval(interval);
        };
    }, []);

    // @ts-ignore
    const formSubmit = (evt) => {
        evt.preventDefault();
        assignCourierToDelivery(
            keycloak,
            apiEndpoint,
            abortController.signal,
            {courier: courier, delivery_id: delivery}).then(result => console.log(result));
    };

    // @ts-ignore
    const RenderForm = ({deliveryId}) => {
        return (
            <form onSubmit={formSubmit}>
                <label>
                    Courier:<br/>
                    <select value={courier} id=""
                            onChange={event => {
                                setCourier(event.target.value);
                                setDelivery(deliveryId);
                            }}>
                        <option value="">Select courier</option>
                        {couriers.map((courier: any, i: number) => {
                            return (
                                <option key={i} value={courier["@id"]}>{courier.id}</option>
                            )
                        })}
                    </select>
                </label> <br/>
                <IonButton color="medium" type="submit">Assign Courier</IonButton>
            </form>
        )
    };

    if (typeof deliveries != "undefined") {
        return (
            <div>
                {deliveries.map((delivery: any, i: number) => {
                    return (
                        <IonCard key={i}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Delivery id: {delivery.id}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Address: {delivery.address} <br/>
                                {couriers.length > 0
                                    ? <RenderForm deliveryId={delivery.id}/>
                                    : <></>}
                            </IonCardContent>
                        </IonCard>
                    )
                })}
            </div>
        )
    } else {
        return (<></>);
    }
};

export default PrintDeliveries;
