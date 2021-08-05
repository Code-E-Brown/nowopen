import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = ({ containerStyle, foodBusinesses, singleBusiness }) => {
    const key = useSelector((state) => state.maps.key);
    const dispatch = useDispatch();
    // console.log('here', singleBusiness)
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }

    }, [dispatch, key]);

    if (!key) {
        return null;
    }

    return (
        <Maps
            apiKey={key}
            singleBusiness={singleBusiness}
            containerStyle={containerStyle}
            foodBusinesses={foodBusinesses} />
    );
};

export default MapContainer;
