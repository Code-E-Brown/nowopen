import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
    width: '100vw',
    height: '450px',
};

// const center = {
//     lat: 39.0945659,
//     lng: -77.0956978,
// };

const Maps = ({ apiKey }) => {

    const [currentLat, setCurrentLat] = useState(null)
    const [currentLong, setCurrentLong] = useState(null)


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setCurrentLat(position.coords.latitude)
            setCurrentLong(position.coords.longitude)
        })

    }, [])
    const center = {
        lat: currentLat,
        lng: currentLong,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                />
            )}
        </>
    );
};

export default React.memo(Maps);
