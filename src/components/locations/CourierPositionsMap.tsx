import React, {useEffect, useState, useRef} from 'react';
// @ts-ignore
import {IonLoading} from "@ionic/react";
// @ts-ignore
import {Map, TileLayer} from 'react-leaflet';
import {KeycloakInstance} from "keycloak-js";
import {getCouriers} from "../../helpers/CourierHelper";
import RenderCourierMarker from './RenderCourierMarker';

interface ContainerProps {
    keycloak: KeycloakInstance,
}

const CourierPositionsMap: React.FC<ContainerProps> = ({keycloak}) => {
        const [couriers, setCouriers] = useState([]);
        const [positions, setPositions] = useState({});
        const [initialized, setInitialized] = useState(false);
        const mapRef = useRef(null);
        const abortController = new AbortController();

        const center = {
            lat: 50.061,
            lng: 19.938
        };

        useEffect(() => {
            if (!initialized) {
                getCouriers(keycloak, abortController.signal, true).then(response => {
                    setCouriers(response);
                    if (response.length > 0) {
                        let positionHelperArray = {};
                        response.map((courier: any, i: number) => {
                            // @ts-ignore
                            positionHelperArray[courier.id] = courier.lastPosition
                            if (Object.keys(positionHelperArray).length === response.length) {
                                setPositions(positionHelperArray);
                                setInitialized(true);
                            }
                        });
                    }
                })
            } else {
                const interval = setInterval(() => {
                    getCouriers(keycloak, abortController.signal, true).then(response => {
                        setCouriers(response);
                        let positionHelperArray = {};
                        response.map((courier: any, i: number) => {
                            // @ts-ignore
                            positionHelperArray[courier.id] = courier.lastPosition
                            if (Object.keys(positionHelperArray).length === response.length) {
                                setPositions(positionHelperArray);
                                setInitialized(true);
                            }
                        });
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


        setTimeout(() => {
            if (mapRef.current) {
                // @ts-ignore
                mapRef.current.leafletElement.invalidateSize();
            }
        }, 1000);

        if (initialized) {
            return (
                <div>
                    <Map center={center} zoom={13} ref={mapRef} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {positions !== undefined && Object.keys(positions).length > 0
                            ? <RenderCourierMarker positions={positions}/>
                            : <></>
                        }
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
