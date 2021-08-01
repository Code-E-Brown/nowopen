import MapContainer from "../Maps"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { getBusinesses } from "../../store/business"
import style from './Food.module.css'
import { Link } from 'react-router-dom';
import logoStyle from '../BusinessPage/BusinessPage.module.css'

function Food({ apiKey, userState, userLocation }) {
    const [foodBusinesses, setFoodBusinesses] = useState([])
    const [newFoodBz, setNewFoodBz] = useState([])
    // const [userLocation, setUserLocation] = useState('')
    // const [userState, setUserState] = useState('')

    const dispatch = useDispatch()
    // const locationFilter = async (business) => {

    //     const newArr = []

    //     if (business.category_id === 1 && business.now_open) {

    //         const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${business.current_lat},${business.current_long}&key=${apiKey}`)
    //         const json = await result.json()
    //         const locationArray = json.results
    //         // console.log('********', json.results)
    //         for (let i = 0; i < locationArray.length; i++) {
    //             const obj = locationArray[i];
    //             // console.log(obj.types[0], 'OBJ')
    //             // console.log(obj.types[0], 'OBJ')
    //             if (obj.types[0] === 'administrative_area_level_1') {
    //                 console.log('biz state', obj.address_components[0].long_name)
    //                 console.log('userState', userState)
    //                 console.log('compare', userState, obj.address_components[0].long_name, obj.address_components[0].long_name === userState)
    //                 if (obj.address_components[0].long_name === userState) {
    //                     console.log("ARE YOUY HERE???")

    //                     newArr.push(business)
    //                     return newArr
    //                 }

    //             }
    //         }
    //     }

    // }
    const businesses = useSelector(state => Object.values(state.businesses));
    // const businesses = useSelector(state => Object.values(state.businesses).filter((business) => locationFilter(business)));



    useEffect(async () => {

        const allBusinesses = await dispatch(getBusinesses())
        setFoodBusinesses(allBusinesses.filter(business => business.category_id === 1 && business.now_open))
        // const locationFilter = async (businesses) => {
        // if (allBusinesses.length) {

        //     const newArr = []
        //     for (let index = 0; index < allBusinesses.length; index++) {
        //         let business = allBusinesses[index]
        //         // (async function (business) {
        //         if (business.category_id === 1 && business.now_open) {
        //             // console.log('test')

        //             const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${business.current_lat},${business.current_long}&key=${apiKey}`)
        //             const json = await result.json()
        //             const locationArray = json.results
        //             // console.log('********', json.results)
        //             for (let i = 0; i < locationArray.length; i++) {
        //                 const obj = locationArray[i];
        //                 // console.log(obj.types[0], 'OBJ')
        //                 // console.log(obj.types[0], 'OBJ')
        //                 if (obj.types[0] === 'administrative_area_level_1') {
        //                     console.log('biz state', obj.address_components[0].long_name)
        //                     if (obj.address_components[0].long_name === userState) {
        //                         console.log(business)
        //                         newArr.push(business)
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     console.log(newArr, 'hi')
        // }

        //     return newArr
        // }
        // setFoodBusinesses(await locationFilter(allBusinesses))
        // let res = await locationFilter(allBusinesses)
        // await console.log("PLEASE", res)
        // await console.log(newArr, 'bingo baby')



        // const locationFilter = async (businesses) => {

        //     const newArr = []

        //     businesses.forEach(business => {
        //         (async function () {
        //             if (business.category_id === 1 && business.now_open) {

        //                 const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${business.current_lat},${business.current_long}&key=${apiKey}`)
        //                 const json = await result.json()
        //                 const locationArray = json.results
        //                 // console.log('********', json.results)
        //                 for (let i = 0; i < locationArray.length; i++) {
        //                     const obj = locationArray[i];
        //                     // console.log(obj.types[0], 'OBJ')
        //                     // console.log(obj.types[0], 'OBJ')
        //                     if (obj.types[0] === 'administrative_area_level_1') {
        //                         console.log('biz state', obj.address_components[0].long_name)
        //                         if (obj.address_components[0].long_name === userState) {
        //                             newArr.push(business)
        //                         }
        //                     }
        //                 }
        //             }
        //             return false
        //         })();
        //     })
        //     console.log(newArr)
        // }
        // setFoodBusinesses(allBusinesses.filter(business => locationFilter(business)))
        // navigator.geolocation.getCurrentPosition(position => {
        //     if (position) {
        //         setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        //     }
        // })
    }, [dispatch])

    // if (!businesses) {
    //     return null
    // }

    // const locationFilter = async (businesses) => {

    //     const newArr = []
    //     for (let index = 0; index < businesses.length; index++) {
    //         let business = businesses[index]
    //         // (async function (business) {
    //         if (business.category_id === 1 && business.now_open) {

    //             const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${business.current_lat},${business.current_long}&key=${apiKey}`)
    //             const json = await result.json()
    //             const locationArray = json.results
    //             // console.log('********', json.results)
    //             for (let i = 0; i < locationArray.length; i++) {
    //                 const obj = locationArray[i];
    //                 // console.log(obj.types[0], 'OBJ')
    //                 // console.log(obj.types[0], 'OBJ')
    //                 if (obj.types[0] === 'administrative_area_level_1') {
    //                     console.log('biz state', obj.address_components[0].long_name)
    //                     if (obj.address_components[0].long_name === userState) {
    //                         newArr.push(business)
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return newArr

    // }


    // console.log("END RESULT", trying)




    // const locationFilter = async (business) => {
    //     if (business.category_id === 1 && business.now_open) {

    //         const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${business.current_lat},${business.current_long}&key=${apiKey}`)
    //         const json = await result.json()
    //         const locationArray = json.results
    //         // console.log('********', json.results)
    //         for (let i = 0; i < locationArray.length; i++) {
    //             const obj = locationArray[i];
    //             // console.log(obj.types[0], 'OBJ')
    //             // console.log(obj.types[0], 'OBJ')
    //             if (obj.types[0] === 'administrative_area_level_1') {
    //                 console.log('biz state', obj.address_components[0].long_name)
    //                 if (obj.address_components[0].long_name === userState) {
    //                     return true
    //                 }
    //             }
    //         }
    //     }
    //     return false
    // }

    // if (businesses.length) {
    //     console.log(businesses, '**')
    //     setFoodBusinesses(businesses.filter(business => locationFilter(business)))
    // }


    // if (userLocation) {
    //     // console.log(userLocation)
    //     (async function () {

    //         const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.lat},${userLocation.lng}&key=${apiKey}`)
    //         const json = await result.json()
    //         const locationArray = json.results
    //         // console.log('********', json.results)
    //         for (let i = 0; i < locationArray.length; i++) {
    //             const obj = locationArray[i];
    //             // console.log(obj.types[0], 'OBJ')
    //             // console.log(obj.types[0], 'OBJ')
    //             if (obj.types[0] === 'administrative_area_level_1') {
    //                 return setUserState(obj.address_components[0].long_name)
    //             }
    //         }

    //     })();
    // }

    // console.log(userState)


    return (
        <div className={style.outerContainer}>
            <div className={style.leftSide}>
                <div className={style.scrollable}>
                    <div className={style.listHeader}> <h1 className={style.listH1}>The Best 10 Mobile Restaurants in Your Area</h1></div>
                    {foodBusinesses && foodBusinesses.map(business => (

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
                    {!foodBusinesses.length &&
                        // <div className={style.businessCard}>
                        <div className={style.businessCard}>
                            <div className={style.innerCard}>
                                <h1 className={style.businessCardName}>Sorry no results at this time...</h1>
                            </div>
                        </div>
                        // </div>
                    }
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
