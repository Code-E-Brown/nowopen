import MapContainer from "../Maps"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getBusinesses } from "../../store/business"
import { Link } from 'react-router-dom';
import style from '../Food/Food.module.css'


function Event() {
    const [eventBusinesses, setEventBusinesses] = useState([])

    const dispatch = useDispatch()
    const businesses = useSelector(state => Object.values(state.businesses));

    useEffect(async () => {

        const allBusinesses = await dispatch(getBusinesses())
        setEventBusinesses(allBusinesses.filter(business => business.category_id === 3))

    }, [dispatch])



    return (
        <div className={style.outerContainer}>
            <div className={style.leftSide}>
                <div className={style.scrollable}>
                    <div className={style.listHeader}> <h1 className={style.listH1}>The Best 10 Pop-up Events in Your Area</h1></div>
                    {eventBusinesses && eventBusinesses.map(business => (

                        <div className={style.businessCard} key={business.id}>
                            <div className={style.innerCard}>
                                <div className={style.businessImage}>

                                </div>
                                <Link className={style.businessCardLink} to={`/businesses/${business.id}`}>
                                    <h1 className={style.businessCardName}>{business.name}</h1>
                                </Link>
                                <div className={style.ratingsDiv}>
                                    {business.rating === 1 ? <>⭐</> : null}
                                    {business.rating === 2 ? <>⭐⭐</> : null}
                                    {business.rating === 3 ? <>⭐⭐⭐</> : null}
                                    {business.rating === 4 ? <>⭐⭐⭐⭐</> : null}
                                    {business?.rating === 5 ? <>⭐⭐⭐⭐⭐</> : null}
                                    {business?.reviews.length}

                                </div>
                                <div className={style.descriptionBox}>
                                    {business.description}
                                </div>
                            </div>
                        </div>

                    ))}
                    {!eventBusinesses.length &&
                        <div className={style.businessCard}>
                            <div className={style.innerCard}>
                                <h1 className={style.businessCardName}>Sorry no results at this time...</h1>
                            </div>
                        </div>
                    }
                    <div className={style.invisDiv}></div>
                </div>
            </div>
            <MapContainer foodBusinesses={eventBusinesses} containerStyle={{
                width: '100%',
                // height: '600px',
                // height: '800px',
            }} />
            {/* <div className={style.flexColumn}>
                <h1>All Event</h1>
                {eventBusinesses && eventBusinesses.map(business => (
                    <div key={business.id}>
                        {business.name}
                    </div>
                ))}
            </div> */}
        </div >
    )
}

export default Event
