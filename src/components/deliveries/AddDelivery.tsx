import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import {IonButton, IonLoading} from "@ionic/react";
import ReactLeafletSearch from "react-leaflet-search";
// @ts-ignore
import {Map, TileLayer, Marker, Popup, Circle, withLeaflet} from 'react-leaflet';
import "./AddDelivery.scss";
import {add} from "ionicons/icons";
import {createDelivery} from "../../helpers/DeliveryHelper";
import {Redirect} from "react-router";


interface ContainerProps {
    keycloak: KeycloakInstance,
    deliveries?: never[]
}

const AddDelivery: React.FC<ContainerProps> = ({keycloak, deliveries}) => {
    const [address, setAddress] = useState("");
    const apiEndpoint = (process.env.NODE_ENV === "development" ? "https://api.wimc.localhost" : "https://api.wimc.online");
    const abortController = new AbortController();
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [mapLoaded, setMapLoaded] = useState(false);


    // create map
    const mapRef = useRef(null);
    useEffect(() => {
        return () => {
            abortController.abort();
        }
    });

    const deliverySubmit = () => {
        if (address.length === 0) {
            alert('Set address');
        } else {
            createDelivery(keycloak, apiEndpoint, abortController.signal, {
                address: address,
                lat: lat.toString(),
                lng: lng.toString()
            }).then(response => {
                console.log(response);
                window.location.href = '/page/Deliveries';
            });
        }
    };
    const center = {
        lat: 50,
        lng: 20
    };

    const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch);
    const confirmAddress = (SearchInfo: any) => {
        createDelivery(keycloak, apiEndpoint, abortController.signal, {
            address: SearchInfo.info,
            lat: SearchInfo.latLng.lat.toString(),
            lng: SearchInfo.latLng.lng.toString()
        }).then(response => {
            window.location.href = '/page/Deliveries';
        });
    };
    const myPopup = (SearchInfo: any) => {
        return (
            <Popup autoClose={false} closeOnClick={false} closeButton={false}>
                <div>
                    <p>I am a custom popUp</p>
                    <IonButton color="medium" type="submit" onClick={() => confirmAddress(SearchInfo)}>Confirm address</IonButton>
                </div>
            </Popup>
        );
    };

    setTimeout(() => {
        if (mapRef.current) {
            // @ts-ignore
            mapRef.current.leafletElement.invalidateSize();
        }
    }, 1000);

    return (
        <div>
            <Map center={center} zoom={12} className="form-map" ref={mapRef}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ReactLeafletSearchComponent position="topleft" popUp={myPopup} zoom={17}/>
            </Map>
        </div>
    )
};

export default AddDelivery;
