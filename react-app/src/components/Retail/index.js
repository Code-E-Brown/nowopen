import MapContainer from "../Maps"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getBusinesses } from "../../store/business"
import { Link } from 'react-router-dom';
import style from '../Food/Food.module.css'
import logoStyle from '../BusinessPage/BusinessPage.module.css'



function Retail() {
    const [retailBusinesses, setRetailBusinesses] = useState([])

    const dispatch = useDispatch()
    const businesses = useSelector(state => Object.values(state.businesses));

    useEffect(async () => {

        const allBusinesses = await dispatch(getBusinesses())
        setRetailBusinesses(allBusinesses.filter(business => business.category_id === 2 && business.now_open))

    }, [dispatch])



    return (
        <div className={style.outerContainer}>
            <div className={style.leftSide}>
                <div className={style.scrollable}>
                    <div className={style.listHeader}> <h1 className={style.listH1}>The Best 10 Retail Pop-ups in Your Area</h1></div>
                    {retailBusinesses && retailBusinesses.map(business => (

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
                                {business.now_open ?
                                    <div className={logoStyle.openStatus}>
                                        Open
                                    </div>
                                    :
                                    <div className={logoStyle.closedStatus}>
                                        Closed
                                    </div>
                                }
                            </div>
                        </div>

                    ))}
                    {!retailBusinesses.length &&
                        <div className={style.businessCard}>
                            <div className={style.innerCard}>
                                <h1 className={style.businessCardName}>Sorry no results at this time...</h1>
                            </div>
                        </div>
                    }
                    <div className={style.invisDiv}></div>
                </div>
            </div>
            <MapContainer foodBusinesses={retailBusinesses} containerStyle={{
                width: '100%',
                // height: '600px',
                // height: '800px',
            }} />
            {/* <div className={style.flexColumn}>
                <h1>All Retail</h1>
                {retailBusinesses && retailBusinesses.map(business => (
                    <div key={business.id}>
                        {business.name}
                    </div>
                ))}
            </div> */}
        </div >
    )
}

export default Retail
