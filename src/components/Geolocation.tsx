import React, {useEffect, useState} from 'react';
// @ts-ignore
import Leaflet from 'leaflet';
import {IonLoading} from "@ionic/react";
// @ts-ignore
import {Map, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import './Geolocation.scss';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Geolocation: React.FC = () => {
    const [lat, setLat] = useState<number>(0);
    const [lng, setlng] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);

    const containerStyle = {
        width: '100%',
        height: '100vh',
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    let DefaultIcon = Leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [24,36],
        iconAnchor: [12,36]
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            const interval = setInterval(() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    if (typeof position.coords != 'undefined') {
                        setLat(position.coords.latitude);
                        setlng(position.coords.longitude);
                        setAccuracy(position.coords.accuracy);
                    }
                });
            }, 5000);
            return () => clearInterval(interval)
        } else {
            console.log("Not Available");
        }
    }, []);

    if (lat != 0 && lng != 0) {
        return (
            <div>
                {/*Your location is: {lat} {lng}*/}
                <Map center={[lat, lng]} zoom={13}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={{lat, lng}} icon={DefaultIcon}/>
                    <Circle center={{lat, lng}} radius={accuracy} options={{color:'#595959', fillColor: '#595959', fillOpacity: '0.35'}}/>
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
