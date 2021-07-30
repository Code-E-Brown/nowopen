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
    const [singleBusiness, setSingleBusiness] = useState({})

    const currentBusiness = useSelector(state => state.businesses[businessId]);

    useEffect(() => {
        const result = dispatch(getBusinesses())
        // setSingleBusiness(result.find(business => business.id === businessId))

        // console.log('**************', result)
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
                            {/* {currentBusiness?.rating === 1 ? <>⭐</> : null}
                            {currentBusiness?.rating === 2 ? <>⭐⭐</> : null}
                            {currentBusiness?.rating === 3 ? <>⭐⭐⭐</> : null}
                            {currentBusiness?.rating === 4 ? <>⭐⭐⭐⭐</> : null}
                            {currentBusiness?.rating === 5 ? <>⭐⭐⭐⭐⭐</> : null} */}
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
                                    <div className={style.flexColumn}>
                                        <div className={style.photoButtonBox}>
                                            <Link to='#'>
                                                See all Photos
                                            </Link>
                                        </div>
                                        <div className={style.editButtonBox}>
                                            <Link to={`/businesses/${currentBusiness.id}/edit`}>
                                                Edit
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </>
                        ) : <div className={style.closedStatus}>
                            Closed
                        </div>}
                    </div>
                </div>
            </div>
            {
                currentBusiness?.now_open ? (
                    <>
                        <div className={style.infoSection}>

                            <MapContainer singleBusiness={currentBusiness} containerStyle={{
                                // width: '800px',
                                width: '400px',
                                height: '350px',
                            }} />



                            {/* <div className={style.bizLocationDescription}>
                                <h1>Location note:</h1>
                                {currentBusiness.location_description}
                            </div> */}
                            <div className={style.bizLocationDescription}>
                                <h1>Location note:</h1>
                                {currentBusiness.location_description}
                            </div>
                        </div>
                    </>
                ) : null
            }
            <div className={style.infoSection}>

            </div>
        </div >
    )
}

export default BusinessPage
