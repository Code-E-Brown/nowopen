import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';

import Food from '.';

const FoodWrapper = () => {
    const key = useSelector((state) => state.maps.key);
    const [userLocation, setUserLocation] = useState('')
    const [userState, setUserState] = useState('')

    const dispatch = useDispatch();
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    if (!key) {
        return null;
    }

    navigator.geolocation.getCurrentPosition(position => {
        if (position) {
            setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        }
    })

    if (userLocation) {

        (async function () {

            const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.lat},${userLocation.lng}&key=${key}`)
            const json = await result.json()
            const locationArray = json.results
            // console.log('********', json.results)
            for (let i = 0; i < locationArray.length; i++) {
                const obj = locationArray[i];
                // console.log(obj.types[0], 'OBJ')
                // console.log(obj.types[0], 'OBJ')
                if (obj.types[0] === 'administrative_area_level_1') {
                    return setUserState(obj.address_components[0].long_name)
                }
            }

        })();
    }


    return (
        <>
            {userState &&
                <Food
                    apiKey={key}
                    userLocation={userLocation}
                    userState={userState}
                />
            }
        </>
    );
};

export default FoodWrapper;
