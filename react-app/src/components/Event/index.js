import MapContainer from "../Maps"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getBusinesses } from "../../store/business"
import { Link } from 'react-router-dom';
import style from '../Food/Food.module.css'
import logoStyle from '../BusinessPage/BusinessPage.module.css'



function Event({ apiKey, userState, userLocation }) {
    const [eventBusinesses, setEventBusinesses] = useState([])
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const businesses = useSelector(state => Object.values(state.businesses));

    useEffect(async () => {

        const allBusinesses = await dispatch(getBusinesses())
        // setEventBusinesses(allBusinesses.filter(business => business.category_id === 3 && business.now_open))
        const locationFilter = async (businesses) => {

            const newArr = []

            for (let index = 0; index < allBusinesses.length; index++) {
                let business = allBusinesses[index]
                // (async function (business) {
                if (business.category_id === 3 && business.now_open) {
                    // console.log('test')

                    const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${business.current_lat},${business.current_long}&key=${apiKey}`)
                    const json = await result.json()
                    const locationArray = json.results
                    // console.log('********', json.results)
                    for (let i = 0; i < locationArray.length; i++) {
                        const obj = locationArray[i];
                        // console.log(obj.types[0], 'OBJ')
                        // console.log(obj.types[0], 'OBJ')
                        if (obj.types[0] === 'administrative_area_level_1') {
                            // console.log('biz state', obj.address_components[0].long_name, userState)
                            if (obj.address_components[0].long_name === userState) {
                                // console.log(business)
                                newArr.push(business)
                            }
                        }
                    }
                }

            }
            // console.log(newArr, 'hi')

            return newArr
        }

        const filteredByState = await locationFilter(allBusinesses)


        if (filteredByState.length) {

            setMessage('')
            setEventBusinesses(await locationFilter(allBusinesses))

        }
        else {
            setMessage(`No results in your area, here's a complete list of pop-up events that are now open!`)
            setEventBusinesses(allBusinesses.filter(business => business.category_id === 3 && business.now_open))
        }

    }, [dispatch, userLocation, userState])


    const formatter = (url1, url2) => {
        return `url(${url1}), url(${url2})`
    }


    return (
        <div className={style.outerContainer}>
            <div className={style.leftSide}>
                <div className={style.scrollable}>
                    <div className={style.listHeader}>
                        {!message ? (
                            <h1 className={style.listH1}>Now Open, Pop-up Events in {userState}</h1>

                        ) :
                            <h1 className={style.listH1}> {message}</h1>

                        }

                    </div>
                    {eventBusinesses && eventBusinesses.map(business => (

                        <div className={style.businessCard} key={business.id}>
                            <div className={style.innerCard}>
                                <div className={style.businessImage} style={{ backgroundImage: formatter(business?.card_image, 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') }}>

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
