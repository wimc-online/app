import React from "react";
// @ts-ignore
import {Marker} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// @ts-ignore
import Leaflet from 'leaflet';

const RenderCourierMarker: React.FC<{ positions: any }> = ({positions}) => {
    let DefaultIcon = Leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [24, 36],
        iconAnchor: [12, 36]
    });

    if (positions !== undefined) {
        return (
            <>
                {Object.entries(positions).map(([key, value], index) => {
                    return (
                        <div key={index}>
                            // @ts-ignore
                            <Marker position={{lat: value.lat, lng: value.lng}} title={key}
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

export default RenderCourierMarker