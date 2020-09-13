import React, {useEffect, useState, useRef} from 'react';
// @ts-ignore
import Leaflet from 'leaflet';
import {IonButton, IonLoading} from "@ionic/react";
// @ts-ignore
import {Map, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Control from 'react-leaflet-control';
import {storeLocation} from "../../helpers/LocationHelper";
import {KeycloakInstance} from "keycloak-js";
import {getUserDetailedData} from "../../helpers/KeycloakHelper";
import {getCouriers} from "../../helpers/CourierHelper";
import keycloak from "../../keycloak";

interface ContainerProps {
    keycloak: KeycloakInstance,
}

const CourierPositionsMap: React.FC<ContainerProps> = ({keycloak}) => {
        const [couriers, setCouriers] = useState([]);
        const [positions, setPositions] = useState<any>({});
        const [initialized, setInitialized] = useState(false);
        const mapRef = useRef(null);
        const abortController = new AbortController();

        const center = {
            lat: 50.061,
            lng: 19.938
        };

        const lookUpForCouriers = () => {

        }
        useEffect(() => {
            if (!initialized) {
                getCouriers(keycloak, abortController.signal, true).then(response => {
                    setCouriers(response);
                    if (response.length > 0) {
                        response.map((courier: any, i: number) => {
                            setPositions({[`${courier.id}`]: courier.lastPosition})
                        });
                        setInitialized(true);
                    }
                })
            } else {
                const interval = setInterval(() => {
                    getCouriers(keycloak, abortController.signal, true).then(response => {
                        setCouriers(response);
                        if (response.length > 0) {
                            response.map((courier: any, i: number) => {
                                setPositions({[`${courier.id}`]: `${courier.lastPosition}`})
                            });
                        }
                    })
                }, 10000);
                return () => {
                    abortController.abort();
                    if (typeof interval !== "undefined") {
                        clearInterval(interval);
                    }
                }
            }
        }, [initialized]);

        let DefaultIcon = Leaflet.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconSize: [24, 36],
            iconAnchor: [12, 36]
        });

        const resetView = () => {
            if (null !== mapRef.current) {
                // @ts-ignore
                mapRef.current.leafletElement.flyTo([lat, lng], 16);
            }
        };

        const fakedCourierLocations = {}

        setTimeout(() => {
            if (mapRef.current) {
                // @ts-ignore
                mapRef.current.leafletElement.invalidateSize();
            }
        }, 1000);

        const RenderCourierMarker: React.FC<{ positions: any }> = ({positions}) => {
            if (positions !== undefined) {
                return (
                    <>
                        {positions.map((position: any, i: number) => {
                            return (
                                <div key={i}>
                                    {/*<Popup key={"popup" + i} position={{lat: position.lat, lng: position.lng}}/>*/}
                                    <Marker position={{lat: position.lat, lng: position.lng}} title={position.courier.id}
                                            icon={DefaultIcon}/>
                                </div>
                            )
                        })}
                    </>
                )
            } else {
                return (<></>)
            }
        }

        if (initialized) {
            return (
                <div>
                    <Map center={center} zoom={13} ref={mapRef} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {positions !== undefined
                            ? <RenderCourierMarker positions={positions}/>
                            : <></>
                        }
                        {/*<Control position="topleft">*/}
                        {/*    <button onClick={() => resetView()}>*/}
                        {/*        Reset View*/}
                        {/*    </button>*/}
                        {/*</Control>*/}
                    </Map>
                </div>
            )
        } else {
            return (
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={true}
                    message={'Please wait...'}
                    duration={5000}
                />
            );
        }
    }
;

export default CourierPositionsMap;
