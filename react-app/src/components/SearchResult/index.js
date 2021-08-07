import MapContainer from "../Maps"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getBusinesses } from "../../store/business"
import { Link } from 'react-router-dom';
import style from '../Food/Food.module.css'
import logoStyle from '../BusinessPage/BusinessPage.module.css'


// function SearchResult({ searchLocation, apiKey, userLocation }) {
//     console.log(searchLocation)
//     return (null)
// }

function SearchResult({ apiKey, searchState, searchLocation, userLocation }) {
    const [searchResultBusinesses, setSearchResultBusinesses] = useState([])
    const [message, setMessage] = useState('')
    const [catName, setCatName] = useState('')

    const dispatch = useDispatch()
    const businesses = useSelector(state => Object.values(state.businesses));

    // console.log(searchLocation.catId, 'CATMAN')

    useEffect(async () => {

        const allBusinesses = await dispatch(getBusinesses())
        // setSearchResultBusinesses(allBusinesses.filter(business => business.category_id === 3 && business.now_open))
        const locationFilter = async (businesses) => {

            const newArr = []

            if (!searchLocation.catId) {
                for (let index = 0; index < allBusinesses.length; index++) {
                    let business = allBusinesses[index]
                    // (async function (business) {
                    if (business.now_open) {
                        // if (business.now_open) {
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
                                // console.log('biz state', obj.address_components[0].long_name, searchState)
                                if (obj.address_components[0].long_name === searchState) {
                                    // console.log(business)
                                    newArr.push(business)
                                }
                            }
                        }
                    }

                }
            } else {

                for (let index = 0; index < allBusinesses.length; index++) {
                    let business = allBusinesses[index]
                    // (async function (business) {
                    if (business.category_id === searchLocation.catId && business.now_open) {
                        // if (business.now_open) {
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
                                // console.log('biz state', obj.address_components[0].long_name, searchState)
                                if (obj.address_components[0].long_name === searchState) {
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


        if (filteredByState.length) {

            setMessage('')
            setSearchResultBusinesses(await locationFilter(allBusinesses))
            if (!searchLocation.catId) {
                setCatName('All Pop-ups')
            } else if (searchLocation.catId === 1) {
                setCatName('Mobile Restaurants')
            } else if (searchLocation.catId === 2) {
                setCatName('Retail Pop-up')
            } else if (searchLocation.catId === 3) {
                setCatName('Pop-up Events')
            }

        }
        else {
            setMessage(`No results matching your search criteria/category, here's a complete list of pop-ups that are now open!`)
            // setSearchResultBusinesses(allBusinesses.filter(business => business.category_id === 3 && business.now_open))
            setSearchResultBusinesses(allBusinesses.filter(business => business.now_open))
        }

    }, [dispatch, userLocation, searchLocation, searchState])


    const formatter = (url1, url2) => {
        return `url(${url1}), url(${url2})`
    }


    return (
        <div className={style.outerContainer}>
            <div className={style.leftSide}>
                <div className={style.scrollable}>
                    <div className={style.listHeader}>
                        {!message ? (

                            <h1 className={style.listH1}>Now Open, {catName} in {searchState}</h1>


                        ) :
                            <h1 className={style.listH1}>{message}</h1>

                        }

                    </div>
                    {searchResultBusinesses && searchResultBusinesses.map(business => (

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
                                    {business?.reviews.length ? business.reviews.length : 'No reviews'}

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
                    {!searchResultBusinesses.length &&
                        <div className={style.businessCard}>
                            <div className={style.innerCard}>
                                <h1 className={style.businessCardName}>Sorry no results at this time...</h1>
                            </div>
                        </div>
                    }
                    <div className={style.invisDiv}></div>
                </div>
            </div>
            <MapContainer foodBusinesses={searchResultBusinesses} searchLocation={searchLocation} containerStyle={{
                width: '100%',
                // height: '600px',
                // height: '800px',
            }} />
            {/* <div className={style.flexColumn}>
                <h1>All SearchResult</h1>
                {searchResultBusinesses && searchResultBusinesses.map(business => (
                    <div key={business.id}>
                        {business.name}
                    </div>
                ))}
            </div> */}
        </div >
    )
}

export default SearchResult
