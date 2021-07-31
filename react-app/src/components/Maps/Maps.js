import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AiTwotoneHome } from 'react-icons/ai'

// const containerStyle = {
//     width: '400px',
//     height: '400px',
// };

// const center = {
//     lat: 39.0945659,
//     lng: -77.0956978,
// };

const Maps = ({ apiKey, containerStyle, singleBusiness, foodBusinesses }) => {

    const [currentLat, setCurrentLat] = useState(null)
    const [currentLong, setCurrentLong] = useState(null)
    const [center, setCenter] = useState({ lat: 38.9072, lng: 77.0369 })
    const [selectedLocation, setSelectedLocation] = useState({})
    const [selectedBusiness, setSelelectedBusiness] = useState({})



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            if (position) {
                
                setCurrentLat(position.coords.latitude)
                setCurrentLong(position.coords.longitude)
                setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })

            }
        })


        // const center = {
        //     lat: currentLat,
        //     lng: currentLong,
        // };
    }, [selectedLocation])

    // console.log(containerStyle)
    if (!containerStyle) {
        containerStyle = {
            width: '400px',
            height: '400px',
        }
    }

    useEffect(() => {

        if (singleBusiness) {
            setCenter({ lat: +singleBusiness.current_lat, lng: +singleBusiness.current_long })
            // console.log(singleBusiness, 'HERERERER')
            // setCenter({ lat: +singleBusiness.current_lat, lng: +singleBusiness.current_long })
        }
    }, [singleBusiness])

    const handleSelect = item => {
        if (item.lat) {

            // setSelectedLocation(item)
        } else {


            const clickedCoords = {
                lat: +item.current_lat,
                lng: +item.current_long
            }

            setSelectedLocation(clickedCoords)
            setSelelectedBusiness(item)
        }
    }


    // const trying = {
    //     lat: 39.0493,
    //     lng: -77.1179,
    // }

    // if (!containerStyle) {
    //     containerStyle = {
    //         width: '100vw',
    //         height: '450px',
    //     };

    // }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });


    // let iconMarker = new window.google.maps.MarkerImage(
    //     'https://image.flaticon.com/icons/png/128/2625/2625344.png',
    //     null, /* size is determined at runtime */
    //     null, /* origin is 0,0 */
    //     null, /* anchor is bottom center of the scaled image */
    //     new window.google.maps.Size(32, 32)
    // );


    return (
        <>
            {isLoaded && (

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}

                    zoom={12}
                >
                    <Marker key='userMarker'
                        position={center}
                        onClick={() => handleSelect(center)}


                        scaledSize={new window.google.maps.Size(15, 25)}
                        icon={singleBusiness ? null : new window.google.maps.MarkerImage(
                            'http://www.clker.com/cliparts/5/v/V/e/t/J/simple-red-house-hi.png',
                            null, /* size is determined at runtime */
                            null, /* origin is 0,0 */
                            null, /* anchor is bottom center of the scaled image */
                            new window.google.maps.Size(32, 32)
                        )}
                    />
                    {foodBusinesses && foodBusinesses.map(business =>
                        business.current_lat && business.now_open ?

                            <Marker key={business.id}
                                onClick={() => handleSelect(business)}
                                position={{
                                    lat: +business.current_lat,
                                    lng: +business.current_long,
                                }}
                            />
                            : null)}

                    {selectedLocation.lat && (
                        <InfoWindow
                            position={selectedLocation}
                            onCloseClick={() => setSelectedLocation({})}
                        ><div><h1>
                            <Link to={`businesses/${selectedBusiness.id}`}>
                                {selectedBusiness.name}
                            </Link>
                        </h1>
                                <h2>Now open!</h2>
                                <p>{selectedBusiness.description}</p>
                                <a href={`https://www.google.com/maps/dir/${center.lat},${center.lng}/${selectedBusiness.current_lat},${selectedBusiness.current_long}`} target="_blank" rel="noopener noreferrer">Get directions!</a>
                            </div></InfoWindow>
                    )}


                </GoogleMap>

            )
            }
        </>
    );
};

export default React.memo(Maps);
