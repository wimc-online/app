import React, {useEffect, useState} from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonAlert,
    IonSelect, IonSelectOption, IonItem, IonLabel, IonCardSubtitle
} from "@ionic/react";
import {assignCourierToDelivery} from "../../helpers/DeliveryHelper";
import {getCouriers} from "../../helpers/CourierHelper";
import {KeycloakInstance} from "keycloak-js";
// @ts-ignore
import {Map, TileLayer, Marker} from 'react-leaflet';
// @ts-ignore
import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "./PrintDeliveries.scss"
import 'leaflet/dist/leaflet.css';
import {getUserDetailedData} from "../../helpers/KeycloakHelper";
import RenderAssignedCourier from './RenderAssignedCourier';

interface ContainerProps {
    deliveries?: never[],
    keycloak: KeycloakInstance,
}

const PrintDeliveries: React.FC<ContainerProps> = ({deliveries, keycloak}) => {
    const [courier, setCourier] = useState<any>({});
    const [delivery, setDelivery] = useState<string>('');
    const [couriers, setCouriers] = useState([]);
    const [loadMaps, setLoadMaps] = useState(false);
    const abortController = new AbortController();

    useEffect(() => {
        getCouriers(keycloak, abortController.signal, true).then(response => {
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

    useEffect(() => {
        setTimeout(() => {
            if (!loadMaps) {
                setLoadMaps(true);
            }
        }, 1000);
    }, [loadMaps]);

    let DefaultIcon = Leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [24, 36],
        iconAnchor: [12, 36]
    });

    // @ts-ignore
    const formSubmit = (evt) => {
        evt.preventDefault();
        assignCourierToDelivery(
            keycloak,
            abortController.signal,
            {courier: courier[delivery], delivery_id: delivery})
            .then(() => {
                    return (
                        <IonAlert
                            isOpen={true}
                            header={'Good job!'}
                            message={'Delivery has been successfully assigned!'}
                            buttons={['That\'s awesome!']}
                        />
                    );
                }
            ).catch(() => {
                return (<IonAlert
                    isOpen={true}
                    header={'Good job!'}
                    message={'Delivery has been successfully assigned!'}
                    buttons={['That\'s awesome!']}
                />)
            }
        )
    };

    const handleSelectChange = (e: CustomEvent, deliveryId: string) => {
        setCourier({[`${deliveryId}`]: e.detail.value});
        setDelivery(deliveryId);
    };

    const RenderForm: React.FC<{ deliveryId: string }> = ({deliveryId}) => {
        return (
            <form onSubmit={formSubmit}>
                <IonItem>
                    <IonLabel>Pick courier</IonLabel>
                    <IonSelect value={courier[deliveryId]} id={"courier-select-" + deliveryId}
                               placeholder="Select courier"
                               onIonChange={(e => {
                                   handleSelectChange(e, deliveryId);
                               })}>
                        {couriers.map((courier: any, i: number) => {
                            return (
                                <IonSelectOption key={i} value={courier["@id"]}>{courier.id}</IonSelectOption>
                            )
                        })}
                    </IonSelect>
                </IonItem>
                <IonButton expand="full" type="submit">Assign Courier</IonButton>
            </form>
        )
    };

    // @ts-ignore
    const RenderMap = ({lat, lng, index}) => {
        return (
            <Map center={{lat, lng}} zoom={16}
                 className="print-deliveries-map" useFlyTo={true} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={{lat, lng}} icon={DefaultIcon}/>
            </Map>
        )
    }

    if (typeof deliveries != "undefined" && deliveries.length !== 0) {
        return (
            <div>
                <h2>Current deliveries:</h2>
                {deliveries.map((delivery: any, i: number) => {
                    let deliveryId: string = delivery.id;
                    return (
                        <IonCard key={i}>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Delivery id: {delivery.id}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Address: {delivery.address} <br/>
                                {delivery.subtask != undefined
                                ? <>Is task finished: {delivery.subtask.isFinished ? "YES" : "NO"}</>
                                : <>Is task finished: Still open - no courier assigned</>
                                }
                                {loadMaps
                                    ? <RenderMap lat={delivery.lat} lng={delivery.lng} index={i}/>
                                    : <></>}
                                {delivery.subtask == undefined || delivery.subtask.task.courier == undefined
                                    ? <>
                                        {couriers.length > 0
                                            ? <RenderForm deliveryId={deliveryId}/>
                                            : <IonCardSubtitle>There are no accessible couriers right now.</IonCardSubtitle>}
                                    </>
                                    : <RenderAssignedCourier courierId={delivery.subtask.task.courier.id} deliveryId={delivery.id}/>
                                }

                            </IonCardContent>
                        </IonCard>
                    )
                })}
            </div>
        )
    } else {
        return (
            <IonAlert
                isOpen={true}
                cssClass='my-custom-class'
                header={'There\'s nothing yet :('}
                message={'There are no active deliveries at this moment'}
                buttons={['Copy that']}
            />
        );
    }
};

export default PrintDeliveries;
