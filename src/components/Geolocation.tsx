import React, {useEffect, useState, useRef} from 'react';
// @ts-ignore
import Leaflet from 'leaflet';
import {IonButton, IonLoading} from "@ionic/react";
// @ts-ignore
import {Map, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import './Geolocation.scss';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Control from 'react-leaflet-control';
import {storeLocation} from "../helpers/LocationHelper";
import {KeycloakInstance} from "keycloak-js";

interface ContainerProps {
    keycloak: KeycloakInstance
}

const Geolocation: React.FC<ContainerProps> = ({keycloak}) => {
    const [lat, setLat] = useState<number>(0);
    const [lng, setlng] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [initialized, setInitialized] = useState(false);
    const map = useRef(null);
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();

    const containerStyle = {
        width: '100%',
        height: '100vh',
    };

    const center = {
        lat: 50.061,
        lng: 19.938
    };

    let DefaultIcon = Leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [24, 36],
        iconAnchor: [12, 36]
    });

    const resetView = () => {
        if (null !== map.current) {
            // @ts-ignore
            map.current.leafletElement.flyTo([lat, lng], 16);
        }
    };

    const updatePosition = (newLat: number, newLng: number) => {
        // @ts-ignore
        let courierId = keycloak.profile.attributes.courierId[0];
        storeLocation(keycloak, apiEndpoint, abortController.signal, {
            courier: courierId,
            lat: newLat,
            lng: newLng
        })
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            if (initialized) {
                const interval = setInterval(() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                        if (typeof position.coords != 'undefined') {
                            setLat(lat => (position.coords.latitude));
                            setlng(position.coords.longitude);
                            setAccuracy(position.coords.accuracy);
                        }
                        updatePosition(position.coords.latitude, position.coords.longitude);
                    }, (err) => {
                        console.log(err)
                    });
                }, 5000);
                return () => clearInterval(interval)
            } else {
                navigator.geolocation.getCurrentPosition((position) => {
                    if (typeof position.coords != 'undefined') {
                        setLat(position.coords.latitude);
                        setlng(position.coords.longitude);
                        setAccuracy(position.coords.accuracy);
                    }
                    // @ts-ignore
                    map.current.leafletElement.flyTo([position.coords.latitude, position.coords.longitude], 16);
                }, (err) => {
                    console.log(err)
                });
                setInitialized(true);
            }
        } else {
            console.log("Not Available");
        }
    }, [initialized]);

    if (lat != 0 && lng != 0) {
        return (
            <div>
                <Map center={center} zoom={13} ref={map}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Control position="topleft">
                        <button onClick={() => resetView()}>
                            Reset View
                        </button>
                    </Control>
                    <Marker position={{lat, lng}} icon={DefaultIcon}/>
                    <Circle center={{lat, lng}} radius={accuracy}
                            options={{color: '#595959', fillColor: '#595959', fillOpacity: '0.35'}}/>
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

export default Geolocation;
