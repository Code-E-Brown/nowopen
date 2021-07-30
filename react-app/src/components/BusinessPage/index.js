import style from './BusinessPage.module.css'
import { Link } from 'react-router-dom';
import MapContainer from '../Maps';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { getBusinesses, editBusiness } from '../../store/business';

import { FiStar } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';


function BusinessPage() {
    const { id } = useParams();
    const businessId = id;
    const dispatch = useDispatch()

    const [singleBusiness, setSingleBusiness] = useState({})
    const [isOpen, setIsOpen] = useState('')
    const [currentLat, setCurrentLat] = useState('')
    const [currentLong, setCurrentLong] = useState('')
    const [currentlatLng, setCurrentLatLng] = useState('')
    const [toggleLocationEdit, setToggleLocationEdit] = useState(false)
    const [locationNote, setLocationNote] = useState('')
    const [liveRating, setLiveRating] = useState(null)
    const [reviewText, setReviewText] = useState('')

    const currentBusiness = useSelector(state => state.businesses[businessId]);
    const user = useSelector(state => state.session.user)

    useEffect(async () => {
        const result = await dispatch(getBusinesses())
        const currentBiz = result.find(business => business.id === +businessId)
        setSingleBusiness(result.find(business => business.id === +businessId))

        // console.log('**************', result)
        // if (currentBiz) {
        //     setIsOpen(currentBiz.now_open)
        // }
    }, [dispatch, isOpen])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            if (position) {
                // console.log(position, '******GOPLDLAKSJDHKLASDHJAKSDJH')
                setCurrentLat(position.coords.latitude)
                setCurrentLong(position.coords.longitude)
                setCurrentLatLng({ lat: position.coords.latitude, lng: position.coords.longitude })

            }
        })


        // const center = {
        //     lat: currentLat,
        //     lng: currentLong,
        // };
    }, [])


    const handleGoLive = (e) => {
        e.preventDefault()
        // setIsOpen(!singleBusiness.now_open)
        const changeOpenStatus = {
            ...currentBusiness,
            now_open: currentBusiness.now_open === true ? false : true,
            current_lat: currentBusiness.now_open === true ? null : currentLat,
            current_long: currentBusiness.now_open === true ? null : currentLong,
            location_description: null,
        }
        dispatch(editBusiness(changeOpenStatus))

    }

    const handleLocationNoteSave = (e) => {
        e.preventDefault()
        setToggleLocationEdit(!toggleLocationEdit)

        const changeOpenStatus = {
            ...currentBusiness,
            location_description: locationNote,
        }
        dispatch(editBusiness(changeOpenStatus))
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()

        const newReview = {
            text: reviewText,
            rating: liveRating,
            business_id: +businessId,
            user_id: user.id
        }
        console.log("*NEW REVIEW READY TO ROLL*", newReview)
    }

    const handleReviewCancel = (e) => {
        setLiveRating(null)
        setReviewText('')
    }


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
                                    <a href={`https://www.google.com/maps/dir/${+currentBusiness.current_lat},${+currentBusiness.current_long}/${currentLat},${currentLong}`} target="_blank" rel="noopener noreferrer">
                                        Located at: 555 E street, Washington D.C
                                    </a>
                                    <div className={style.flexColumn}>
                                        <div className={style.photoButtonBox}>
                                            <Link to='#'>
                                                See all Photos
                                            </Link>
                                        </div>
                                        {user && user.id === currentBusiness?.user_id ? (
                                            <div className={style.editButtonBox}>
                                                <Link to={`/businesses/${currentBusiness.id}/edit`}>
                                                    Edit
                                                </Link>
                                            </div>

                                        )
                                            : null}
                                    </div>

                                </div>
                            </>
                        ) :
                            <>
                                <div className={style.closedStatus}>
                                    Closed
                                </div>
                                <div className={style.locationInfoInvis}>
                                    <div></div>
                                    <div className={style.flexColumn}>

                                        <div className={style.photoButtonBox}>
                                            <Link to='#'>
                                                See all Photos
                                            </Link>
                                        </div>
                                        {user && user.id === currentBusiness?.user_id ? (
                                            <div className={style.editButtonBox}>
                                                <Link to={`/businesses/${currentBusiness.id}/edit`}>
                                                    Edit
                                                </Link>
                                            </div>

                                        )

                                            : null}

                                    </div>

                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>
            {
                (currentBusiness?.now_open) && user ? user.id != currentBusiness.userId : (currentBusiness?.now_open) ? (
                    <>
                        <div className={style.infoSection}>

                            <MapContainer singleBusiness={currentBusiness} containerStyle={{
                                // width: '800px',
                                width: '400px',
                                height: '350px',
                            }} />

                            {/* <h1 className={style.glowStatus} contenteditable spellcheck="false">open</h1> */}

                            {/* <div className={style.bizLocationDescription}>
                                <h1>Location note:</h1>
                                {currentBusiness.location_description}
                            </div> */}
                            <div className={style.bizLocationDescription}>
                                <h1>Location note:</h1>
                                {currentBusiness?.location_description}
                            </div>
                        </div>
                    </>
                ) : null
            }
            {user && currentBusiness?.user_id === user?.id ? (
                <>
                    <div className={style.infoSection}>
                        {currentBusiness?.now_open &&
                            <MapContainer singleBusiness={currentBusiness} containerStyle={{
                                width: '400px',
                                height: '350px',
                            }} />
                        }

                        {currentBusiness?.now_open ?
                            <h1 onClick={handleGoLive} className={style.glowStatus} contenteditable spellcheck="false">open</h1>
                            :
                            <h1 onClick={handleGoLive} className={style.glowStatusClosed} contenteditable spellcheck="false">closed</h1>

                        }

                        {currentBusiness?.now_open &&
                            <div className={style.bizLocationDescription}>
                                <h1>Location note:</h1>
                                <div>
                                    {currentBusiness.location_description}
                                </div>
                                {toggleLocationEdit &&
                                    <div>
                                        <textarea onChange={e => setLocationNote(e.target.value)} placeholder='Add a few notes so people know how to find you!'>{currentBusiness.location_description}</textarea>
                                    </div>
                                }
                                {toggleLocationEdit === true ?
                                    <button onClick={handleLocationNoteSave}>Save note!</button>
                                    :
                                    <button onClick={e => setToggleLocationEdit(!toggleLocationEdit)}>Update location note!</button>
                                }
                            </div>
                        }
                    </div>
                </>
            ) : null}
            <div className={style.infoSection}>
                <div className={style.descriptionArea}>
                    " {currentBusiness?.description}
                </div>
            </div>
            <div className={style.infoSectionColumn}>
                <h1>Reviews:</h1>
                <div className={style.reviewBox}>
                    {user && user.id != currentBusiness?.user_id ? (

                        < div className={style.leaveReviewCard}>
                            Leave a review
                            {liveRating === 1 ? (
                                <>
                                    <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />
                                </>
                            ) : null}
                            {liveRating === 2 ? (
                                <>
                                    <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />
                                </>
                            ) : null}
                            {liveRating === 3 ? (
                                <>
                                    <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />

                                </>
                            ) : null}
                            {liveRating === 4 ? (
                                <>
                                    <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />

                                </>
                            ) : null}
                            {liveRating === 5 ? (
                                <>
                                    <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                    <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                </>
                            ) : null}

                            {!liveRating &&
                                <>
                                    <FiStar onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                    <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />
                                </>
                            }
                            {liveRating &&
                                <div>
                                    <textarea onChange={e => setReviewText(e.target.value)} value={reviewText}></textarea>
                                    <div>
                                        <button onClick={handleReviewSubmit}>Submit review</button>
                                        <button onClick={handleReviewCancel}>Cancel</button>
                                    </div>
                                </div>
                            }


                        </div>)
                        : null}
                    <div className={style.reviewCard}>
                        square
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BusinessPage
