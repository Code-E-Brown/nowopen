import MapContainer from "../Maps"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getBusinesses } from "../../store/business"
import style from './Food.module.css'
import { Link } from 'react-router-dom';

function Food() {
    const [foodBusinesses, setFoodBusinesses] = useState([])

    const dispatch = useDispatch()
    const businesses = useSelector(state => Object.values(state.businesses));

    useEffect(async () => {

        const allBusinesses = await dispatch(getBusinesses())
        setFoodBusinesses(allBusinesses.filter(business => business.category_id === 1))

    }, [dispatch])



    return (
        <div className={style.outerContainer}>
            <div className={style.leftSide}>
                <div className={style.scrollable}>
                    <div className={style.listHeader}> <h1 className={style.listH1}>The Best 10 Restaurants in Your Area</h1></div>
                    {foodBusinesses && foodBusinesses.map(business => (

                            <div className={style.businessCard} key={business.id}>
                                <div className={style.innerCard}>
                                    <div className={style.businessImage}>

                                    </div>
                                    <Link className={style.businessCardLink} to={`/businesses/${business.id}`}>
                                        <h1 className={style.businessCardName}>{business.name}</h1>
                                    </Link>
                                    <div className={style.ratingsDiv}>
                                        ⭐⭐⭐⭐⭐ 5
                                    </div>
                                    <div className={style.descriptionBox}>
                                        {business.description}
                                    </div>
                                </div>
                            </div>

                    ))}
                    <div className={style.businessCard}>
                        <div className={style.innerCard}>
                            <h1 className={style.businessCardName}>Test business with a much longer name than you had hoped for</h1>
                        </div>
                    </div>
                    <div className={style.invisDiv}></div>
                </div>
            </div>
            <MapContainer foodBusinesses={foodBusinesses} containerStyle={{
                width: '100%',
                // height: '600px',
                // height: '800px',
            }} />
            {/* <div className={style.flexColumn}>
                <h1>All Food</h1>
                {foodBusinesses && foodBusinesses.map(business => (
                    <div key={business.id}>
                        {business.name}
                    </div>
                ))}
            </div> */}
        </div >
    )
}

export default Food
