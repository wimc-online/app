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
import {getCourierPosition} from "../../helpers/CourierHelper";
import keycloak from "../../keycloak";

interface ContainerProps {
    keycloak: KeycloakInstance,
    couriers: []
}

const CourierPositionsMap: React.FC<ContainerProps> = ({couriers}) => {
    const [lat, setLat] = useState<number>(0);
    const [lng, setlng] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [positions, setPositions] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const mapRef = useRef(null);
    const abortController = new AbortController();

    const center = {
        lat: 50.061,
        lng: 19.938
    };

    useEffect(() => {
        if (!initialized) {
            {
                couriers.map((courier: any, i: number) => {
                    getCourierPosition(keycloak, abortController.signal, courier.id).then(result => {
                            setPositions(result);
                        }
                    );
                })
                setInitialized(true);
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

    const RenderCourierMarker: React.FC<{ positions: any }> = ({positions}) => (
        <>
            {positions.map((position: any, i: number) => {
                return (
                    <div key={i}>
                        {/*<Popup key={"popup" + i} position={{lat: position.lat, lng: position.lng}}/>*/}
                        <Marker position={{lat: position.lat, lng: position.lng}} title={position.courier.id} icon={DefaultIcon}/>
                    </div>
                )
            })}
        </>
    )

    if (initialized) {
        return (
            <div>
                <Map center={center} zoom={13} ref={mapRef} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {positions !== undefined && positions.length > 0
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
};

export default CourierPositionsMap;
