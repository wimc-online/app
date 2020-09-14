import React, {useEffect, useRef, useState} from 'react';
import {KeycloakInstance} from "keycloak-js";
// @ts-ignore
import {Map, TileLayer, Marker} from 'react-leaflet';
import Routing from "../../helpers/RoutingMachine";
import "./RouteSubTask.scss";
import {getSubTasks} from "../../helpers/TaskHelper";

interface delivery {
    lat: string,
    lng: string
}

interface subTask {
    delivery: delivery
}

interface ContainerProps {
    subtask: subTask
}

const RouteSubTask: React.FC<ContainerProps> = ({subtask}) => {
    const [position, setPosition] = useState({lat: 50.076057, lng: 20.011417});
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [mapInitialized, setMapInitialized] = useState<boolean>(false);
    const mapRef = useRef(null);
    const ls = require('local-storage');


    setTimeout(() => {
        if (mapRef.current) {
            // @ts-ignore
            mapRef.current.leafletElement.invalidateSize();
            setMapInitialized(true);
        }
    }, 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition({lat: ls.get('CourierLat'), lng: ls.get('CourierLng')});
        }, 5000);
        return () => clearInterval(interval)
    }, []);

    return (
        <>
            <Map center={{lat: 0,lng: 0}} ref={mapRef} scrollWheelZoom={false} className={"subtaskMap"}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {mapRef && mapRef.current !== null
                    ? <Routing map={mapRef.current}
                               from={position}
                               to={{lat: subtask.delivery.lat, lng: subtask.delivery.lng}}/>
                    : <></>}
            </Map>
        </>
    );
}

export default RouteSubTask;