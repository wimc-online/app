import React, {useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
import {IonButton, IonCol, IonGrid, IonIcon, IonLoading, IonModal, IonRow} from "@ionic/react";
import ReactLeafletSearch from "react-leaflet-search";
// @ts-ignore
import {Map, TileLayer, Popup, CircleMarker, withLeaflet} from 'react-leaflet';
import "./AddDelivery.scss";
import {createDelivery} from "../../helpers/DeliveryHelper";
import AddDeliveryTutorialModal from "../tutorials/AddDeliveryTutorialModal";


interface ContainerProps {
    keycloak: KeycloakInstance,
    deliveries?: never[]
}

const AddDelivery: React.FC<ContainerProps> = ({keycloak, deliveries}) => {
    const [address, setAddress] = useState("");
    const abortController = new AbortController();
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    // create map
    const mapRef = useRef(null);
    useEffect(() => {
        return () => {
            abortController.abort();
        }
    }, []);

    const center = {
        lat: 50.0619,
        lng: 19.9375
    };

    const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch);
    const confirmAddress = (SearchInfo: any) => {
        createDelivery(keycloak, abortController.signal, {
            address: SearchInfo.info,
            lat: SearchInfo.latLng.lat.toString(),
            lng: SearchInfo.latLng.lng.toString()
        }).then(response => {
            window.location.href = '/page/Deliveries';
        });
    };
    const myPopup = (SearchInfo: any) => {
        return (
            <Popup autoClose={false} closeOnClick={false} closeButton={false} className="mapPopup" attribution={{minWidth: 200}}>
                <h4>Is this what you are looking for?</h4>
                {SearchInfo.info}
                <IonButton type="submit" expand="full" onClick={() => confirmAddress(SearchInfo)}>
                    Confirm address
                </IonButton>
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
            <AddDeliveryTutorialModal/>
            <Map center={center} zoom={16} className="form-map" ref={mapRef} useFlyTo={true}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ReactLeafletSearchComponent position="topright" openSearchOnLoad={true} popUp={myPopup} zoom={17}/>
            </Map>
        </div>
    )
};

export default AddDelivery;
