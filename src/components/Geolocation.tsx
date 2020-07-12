import React, {useEffect, useState} from 'react';

const Geolocation: React.FC = () => {
    const [lat, setLat] = useState<number>(0);
    const [long, setLong] = useState<number>(0);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const interval = setInterval(() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position.coords);
                    if (typeof position.coords != 'undefined') {
                        setLat(position.coords.latitude);
                        setLong(position.coords.longitude);
                    }
                });
            }, 5000);
            return () => clearInterval(interval)
        } else {
            console.log("Not Available");
        }
    }, []);

    return (
        <div>
            Your location is: {lat} {long}
        </div>
    )
};

export default Geolocation;
