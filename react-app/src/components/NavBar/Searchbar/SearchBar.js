import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { getKey } from '../../store/maps';
import { getKey } from '../../../store/maps';

import Searchbar from '.';

const SearchContainer = () => {
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
        <Searchbar
            apiKey={key}
        />
    );
};

export default SearchContainer;
