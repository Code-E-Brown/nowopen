import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getKey } from '../../store/maps';

import SearchResult from '.';

const SearchResultWrapper = () => {
    const key = useSelector((state) => state.maps.key);
    const [userLocation, setUserLocation] = useState('')
    const [searchState, setSearchState] = useState('')

    let { lat, long, catId } = useParams()



    const dispatch = useDispatch();
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }



    }, [dispatch, key]);

    if (!userLocation) {

        navigator.geolocation.getCurrentPosition(position => {
            if (position) {
                setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
            }
        })
    }
    if (!key) {
        return null;
    }


    if (lat && long) {

        (async function () {

            const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${+lat},${+long}&key=${key}`)
            const json = await result.json()
            const locationArray = json.results
            // console.log('********', json.results)
            for (let i = 0; i < locationArray.length; i++) {
                const obj = locationArray[i];
                // console.log(obj.types[0], 'OBJ')
                // console.log(obj.types[0], 'OBJ')
                if (obj.types[0] === 'administrative_area_level_1') {
                    console.log("SEARCH STATE", obj.address_components[0].long_name)
                    return setSearchState(obj.address_components[0].long_name)
                }
            }

        })();
    }


    return (
        <>

            <SearchResult
                apiKey={key}
                userLocation={userLocation}
                searchLocation={{ lat: +lat, long: +long, catId: catId ? +catId : null,}}
                searchState={searchState}
            />

        </>
    );
};

export default SearchResultWrapper;
