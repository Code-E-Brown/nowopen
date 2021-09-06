import MapContainer from "../Maps"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getBusinesses } from "../../store/business"
import { Link } from 'react-router-dom';
import style from '../Food/Food.module.css'
import logoStyle from '../BusinessPage/BusinessPage.module.css'
import AddressWrapper from "../BusinessAddress/AddressWrapper";


function Retail({ apiKey, userState, userLocation }) {
    const [retailBusinesses, setRetailBusinesses] = useState([])
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const businesses = useSelector(state => Object.values(state.businesses));

    useEffect(async () => {
        const myAbortController = new AbortController();

        const allBusinesses = await dispatch(getBusinesses())

        // setRetailBusinesses(allBusinesses.filter(business => business.category_id === 2 && business.now_open))
        const locationFilter = async (businesses) => {

            const newArr = []

            for (let index = 0; index < allBusinesses.length; index++) {
                let business = allBusinesses[index]
                // (async function (business) {
                if (business.category_id === 2 && business.now_open) {
                    // console.log('test')
                    if (business.current_lat & business.current_long) {
                        const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${business.current_lat},${business.current_long}&key=${apiKey}`, {
                            signal: myAbortController.signal
                        })
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

            }
            // console.log(newArr, 'hi')

            return newArr
        }

        const filteredByState = await locationFilter(allBusinesses)
        // console.log('FINALLY!!!!', filteredByState)

        if (filteredByState.length) {

            setMessage('')
            setRetailBusinesses(await locationFilter(allBusinesses))

        }
        else {
            setMessage(`No results in your area, here's a complete list of retail pop-ups that are now open!`)
            setRetailBusinesses(allBusinesses.filter(business => business.category_id === 2 && business.now_open))
        }



        return () => {
            myAbortController.abort();
        }

    }, [dispatch, userLocation, userState])

    const formatter = (url1, url2) => {

        return `url(${url1}), url(${url2})`
    }

    const catConverter = (id) => {
        if (id === '1' || id === 1) {
            return "Food"
        }
        if (id === '2' || id === 2) {
            return "Retail"
        }
        if (id === '3' || id === 3) {
            return "Event"
        }
    }

    // const imageChecker
    return (
        <div className={style.outerContainer}>
            <div className={style.leftSide}>
                <div className={style.scrollable}>
                    <div className={style.listHeader}>

                        {!message ? (
                            <h1 className={style.listH1}>Now Open, Retail Pop-Ups in {userState}</h1>

                        ) :
                            <h1 className={style.listH1}>{message}</h1>
                        }
                    </div>
                    {retailBusinesses && retailBusinesses.map(business => (

                        <div className={style.businessCard} key={business.id}>
                            <div className={style.innerCard}>


                                <div className={style.businessImage} style={{ backgroundImage: formatter(business?.card_image, 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260') }}>
                                    {/* <div className={style.businessImage} style={{ backgroundImage: `url(${business.card_image})`.ok ? `url(${business.card_image})` : 'url("https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")' }} > */}
                                    {/* <div className={style.businessImage} style={{ backgroundImage: formatter('https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') }}> */}

                                </div>
                                <Link className={style.businessCardLink} to={`/businesses/${business.id}`}>
                                    <h1 className={style.businessCardName}>{business.name}</h1>
                                </Link>
                                <div>{catConverter(business.category_id)}</div>
                                <div className={style.ratingsDiv}>
                                    {business.rating === 1 ? <>⭐</> : null}
                                    {business.rating === 2 ? <>⭐⭐</> : null}
                                    {business.rating === 3 ? <>⭐⭐⭐</> : null}
                                    {business.rating === 4 ? <>⭐⭐⭐⭐</> : null}
                                    {business?.rating === 5 ? <>⭐⭐⭐⭐⭐</> : null}
                                    {business?.reviews.length ? business.reviews.length : 'No reviews'}

                                </div>
                                <div className={style.descriptionBox}>
                                    {business.description}
                                </div>
                                <div className={style.address}>
                                    <AddressWrapper currentBusiness={business} currentLat={userLocation.lat} currentLong={userLocation.lng} />
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
