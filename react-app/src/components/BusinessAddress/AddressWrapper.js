import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';

import BusinessAddress from '.';

const AddressWrapper = ({currentBusiness, currentLat, currentLong}) => {
    const key = useSelector((state) => state.maps.key);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    if (!key) {
        return null;
    }

    return (
        <BusinessAddress
            apiKey={key}
            currentBusiness={currentBusiness}
            currentLat={currentLat}
            currentLong={currentLong}
        />
    );
};

export default AddressWrapper;
