import style from './BusinessPage.module.css'
import { Link } from 'react-router-dom';
import MapContainer from '../Maps';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { getBusinesses } from '../../store/business';

function BusinessPage() {
    const { id } = useParams();
    const businessId = id;
    const dispatch = useDispatch()
    // const [currentBusiness, setCurrentBusiness] = useState({})

    const currentBusiness = useSelector(state => state.businesses[businessId]);

    useEffect(() => {
        dispatch(getBusinesses())

    }, [dispatch])

    return (
        <div>
            <div className={style.imageBox}>
                <div className={style.infoFlex}>
                    <div className={style.infoBox}>
                        <div className={style.nameBox}>
                            <h1 className={style.bizName}>
                                {currentBusiness?.name}
                            </h1>
                        </div>
                        <div className={style.ratingBox}>
                            ⭐⭐⭐⭐⭐ 57 reviews
                        </div>
                        {currentBusiness?.now_open ? (
                            <>
                                <div className={style.openStatus}>
                                    Now Open!
                                </div>
                                <div className={style.locationInfo}>
                                    <Link to='#'>
                                        Located at: 555 E street, Washington D.C
                                    </Link>
                                </div>
                            </>
                        ) : <div className={style.closedStatus}>
                            Closed
                        </div>}
                    </div>
                </div>
            </div>
            <div className={style.infoSection}>
                {/* <MapContainer containerStyle={{
                    width: '250px',
                    height: '250px',
                }} /> */}
            </div>
            <div className={style.infoSection}>
                
            </div>
        </div>
    )
}

export default BusinessPage
