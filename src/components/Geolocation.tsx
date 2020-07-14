import React, {useEffect, useState} from 'react';
import {GoogleMap, LoadScript, Marker, Circle} from '@react-google-maps/api';
import {IonLoading} from "@ionic/react";

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]

const Geolocation: React.FC = () => {
    const [lat, setLat] = useState<number>(0);
    const [lng, setlng] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [map, setMap] = React.useState(null);

    const containerStyle = {
        width: '100%',
        height: '100vh',

    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     map.fitBounds(bounds);
    //     setMap(map)
    // }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

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
                Your location is: {lat} {lng}
                <LoadScript
                    googleMapsApiKey="AIzaSyAMU9h-nOctkpZGvz5G2a3vwtc0vTD7IkE"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                            lat: lat,
                            lng: lng
                        }}
                        zoom={13}
                        onUnmount={onUnmount}
                        options={{styles: mapStyle}}
                    >
                        <Marker
                            title={'Your current location'}
                            label={'You'}
                            position={{lat: lat, lng: lng}}/>

                        <Circle
                            radius={accuracy}
                            center={{lat: lat, lng: lng}}
                            options={{
                                strokeColor: "#595959",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#595959",
                                fillOpacity: 0.35
                            }}
                        />
                        { /* Child components, such as markers, info windows, etc. */}
                        <></>
                    </GoogleMap>
                </LoadScript>
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
