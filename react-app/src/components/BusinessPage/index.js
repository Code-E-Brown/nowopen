import style from './BusinessPage.module.css'
import { Link } from 'react-router-dom';
import MapContainer from '../Maps';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { getBusinesses, editBusiness } from '../../store/business';
import { createReview, getReviews, deleteReview, editReview } from '../../store/review';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import AddressWrapper from '../BusinessAddress/AddressWrapper';

import { FiStar } from 'react-icons/fi';
import { RiMapPinUserFill } from 'react-icons/ri';
import { RiEdit2Line } from 'react-icons/ri';

import { BsStarFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';



function BusinessPage() {
    const { id } = useParams();
    const businessId = id;
    const dispatch = useDispatch()
    const history = useHistory()

    const [singleBusiness, setSingleBusiness] = useState({})
    const [isOpen, setIsOpen] = useState('')
    const [currentLat, setCurrentLat] = useState('')
    const [currentLong, setCurrentLong] = useState('')
    const [currentlatLng, setCurrentLatLng] = useState('')
    const [toggleLocationEdit, setToggleLocationEdit] = useState(false)
    const [locationNote, setLocationNote] = useState('')
    const [liveRating, setLiveRating] = useState(null)
    const [editLiveRating, setEditLiveRating] = useState(null)
    const [reviewText, setReviewText] = useState('')
    const [editReviewText, setEditReviewText] = useState('')
    const [editToggle, setEditToggle] = useState(false)
    const [editId, setEditId] = useState(null)
    const [locationErrors, setLocationErrors] = useState(null)
    const [createReviewErrors, setCreateReviewErrors] = useState(null)
    const currentBusiness = useSelector(state => state.businesses[businessId]);
    const currentReviews = useSelector(state => Object.values(state.reviews).filter(review => review.business_id === +businessId));

    const [editErrors, setEditErrors] = useState(null)


    const user = useSelector(state => state.session.user)

    useEffect(async () => {
        const result = await dispatch(getBusinesses())
        const reviews = await dispatch(getReviews(+businessId))
        const currentBiz = result.find(business => business.id === +businessId)
        if (!currentBiz) {
            history.push('/')
        }
        setSingleBusiness(result.find(business => business.id === +businessId))

        // console.log('**************', result)
        // if (currentBiz) {
        //     setIsOpen(currentBiz.now_open)
        // }
    }, [dispatch])

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



    const handleLocationNoteSave = async (e) => {
        e.preventDefault()


        const changeOpenStatus = {
            ...currentBusiness,
            location_description: locationNote,
        }
        const result = await dispatch(editBusiness(changeOpenStatus))
        if (result.errors) {
            setLocationErrors(result.errors)
        } else {
            setLocationErrors(null)
            setToggleLocationEdit(!toggleLocationEdit)
        }
    }

    const handleLocationNoteCancel = () => {
        setToggleLocationEdit(!toggleLocationEdit)
        setLocationErrors(null)
        setLocationNote(currentBusiness.location_description)
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()

        const newReview = {
            text: reviewText,
            rating: liveRating,
            business_id: +businessId,
            user_id: user.id
        }

        const result = await dispatch(createReview(newReview))
        if (!result.errors) {

            setLiveRating(null)
            setReviewText('')
            dispatch(getBusinesses())
            setCreateReviewErrors(null)
        } else {

            setCreateReviewErrors(result.errors)
        }

    }
    const handleEditReviewSubmit = async (e) => {
        e.preventDefault()

        const editedReview = {
            id: +e.target.id,
            text: editReviewText,
            rating: editLiveRating,
            business_id: +businessId,
            user_id: user.id
        }

        // console.log(editedReview)

        const result = await dispatch(editReview(editedReview))
        if (!result.errors) {
            setEditLiveRating(null)
            setEditReviewText('')
            setEditId(null)
            setEditToggle(false)
            setEditErrors(null)
            dispatch(getBusinesses())
        } else {
            // console.log(result.errors)
            setEditErrors(result.errors)
        }

    }

    const handleReviewCancel = (e) => {
        setLiveRating(null)
        setReviewText('')
        setCreateReviewErrors(null)
        setEditErrors(null)
    }
    const handleEditReviewCancel = (e) => {
        setEditLiveRating(null)
        setEditReviewText('')
        setEditToggle(false)
        setEditId(null)
        setEditErrors(null)
    }

    const handleReviewDelete = async e => {
        e.preventDefault()
        // console.log(+e.target.parentElement.parentElement.id)
        // console.log(e.target.id)
        await dispatch(deleteReview(+e.target.id))
        await dispatch(getBusinesses())
    }
    const handleReviewEdit = async e => {
        e.preventDefault()
        // console.log(+e.target.parentElement.parentElement.id)
        // await dispatch(deleteReview(+e.target.parentElement.parentElement.id))
        // await dispatch(getBusinesses())
    }

    const handleEditCancel = e => {
        e.preventDefault()
        setEditToggle(false)
        setEditId(null)
        setEditErrors(null)
    }
    const handleEditToggle = e => {
        e.preventDefault()
        // console.log(currentReviews, +e.target.id)
        const exactReview = currentReviews.find(review => review.id === +e.target.id)
        // console.log(exactReview)
        setEditId(+e.target.id)
        setEditReviewText(exactReview.text)
        setEditToggle(true)
    }

    const handleLocationEditToggle = (e) => {

        setToggleLocationEdit(!toggleLocationEdit)
        setLocationNote(currentBusiness.location_description)
    }

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

    return (
        <div>
            {currentBusiness &&
                <div className={style.imageBox} style={{ backgroundImage: formatter(currentBusiness?.banner_image, 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') }}>
                    <div className={style.infoFlex}>
                        <div className={style.infoBox}>
                            <div className={style.nameBox}>
                                <h1 className={style.bizName}>
                                    {currentBusiness?.name}
                                </h1>
                            </div>
                            <div className={style.ratingBox}>{catConverter(currentBusiness?.category_id)}</div>
                            {currentBusiness &&
                                <div className={style.ratingBox}>
                                    {currentBusiness?.rating === 1 ? <>???</> : null}
                                    {currentBusiness?.rating === 2 ? <>??????</> : null}
                                    {currentBusiness?.rating === 3 ? <>?????????</> : null}
                                    {currentBusiness?.rating === 4 ? <>????????????</> : null}
                                    {currentBusiness?.rating === 5 ? <>???????????????</> : null}
                                    {currentBusiness?.reviews.length} reviews
                                </div>
                            }
                            {currentBusiness?.now_open ? (
                                <>
                                    <div className={style.openStatus}>
                                        Now Open!
                                    </div>
                                    {/* <div className={style.ratingBox} style={{ margin: '-20' }}>hello</div> */}
                                    <div className={style.locationInfo}>
                                        {currentBusiness &&
                                            <AddressWrapper currentBusiness={currentBusiness} currentLat={currentLat} currentLong={currentLong} />
                                        }
                                        {/* <a href={`https://www.google.com/maps/dir/${+currentBusiness.current_lat},${+currentBusiness.current_long}/${currentLat},${currentLong}`} target="_blank" rel="noopener noreferrer">
                                        Located at: 555 E street, Washington D.C
                                    </a> */}

                                        <div className={style.flexColumn}>
                                            {/* <div className={style.photoButtonBox}>
                                                <Link to='#'>
                                                    See all Photos
                                                </Link>
                                            </div> */}
                                            {user && user.id === currentBusiness?.user_id ? (

                                                <div className={style.editButtonBox} style={{ position: 'relative', bottom: '18px' }}>
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

                                            {/* <div className={style.photoButtonBox}>
                                                <Link to='#'>
                                                    See all Photos
                                                </Link>
                                            </div> */}
                                            {user && user.id === currentBusiness?.user_id ? (
                                                <div className={style.editButtonBox} style={{ position: 'relative', bottom: '18px' }}>
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
            }
            {/* {currentBusiness?.now_open && user?.id != } */}
            {

                ((currentBusiness?.now_open) && user?.id != currentBusiness?.user_id) || currentBusiness?.now_open && !user ? (
                    <>
                        <div className={style.infoSection}>
                            {currentBusiness?.location_description ? (

                                <MapContainer singleBusiness={currentBusiness} containerStyle={{
                                    // width: '800px',
                                    width: '1000px',
                                    height: '350px',
                                }} />
                            )
                                :
                                <MapContainer singleBusiness={currentBusiness} containerStyle={{
                                    // width: '800px',
                                    width: '2000px',
                                    height: '350px',
                                }} />
                            }

                            {/* <h1 className={style.glowStatus} contenteditable spellcheck="false">open</h1> */}

                            {/* <div className={style.bizLocationDescription}>
                                <h1>Location note:</h1>
                                {currentBusiness.location_description}
                            </div> */}

                            {currentBusiness?.location_description &&
                                <div className={style.bizLocationDescription}>
                                    <div className={style.locationNote}>Location note:</div>
                                    <div className={style.outerDescBox}>
                                        <div className={style.innerDescBox} >
                                            {currentBusiness?.location_description}
                                        </div>
                                    </div>
                                </div>
                            }
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
                            <h1 onClick={handleGoLive} className={style.glowStatus}>open</h1>
                            :
                            <h1 onClick={handleGoLive} className={style.glowStatusClosed}>closed</h1>

                        }

                        {currentBusiness?.now_open &&
                            <div className={style.bizLocationDescription}>
                                <div className={style.locationNote}>Location note:</div>
                                <div className={style.outerDescBox}>

                                    {toggleLocationEdit ? (
                                        <div>
                                            {locationErrors && locationErrors.map(error => (
                                                <div style={{ color: 'red' }} key={error}>{error}</div>

                                            ))}
                                            <textarea className={style.noteText} onChange={e => setLocationNote(e.target.value)} value={locationNote} placeholder='Add a few notes so people know how to find you!'></textarea>
                                        </div>
                                    ) :

                                        <div className={style.innerDescBox} >
                                            {currentBusiness?.location_description}
                                        </div>
                                    }
                                </div>
                                {/* <div>
                                    {currentBusiness.location_description}
                                </div> */}
                                {/* {toggleLocationEdit &&
                                    <div>
                                        <textarea onChange={e => setLocationNote(e.target.value)} placeholder='Add a few notes so people know how to find you!'>{currentBusiness.location_description}</textarea>
                                    </div>
                                } */}
                                {toggleLocationEdit === true ?
                                    <>
                                        <div className={style.saveLocationButtonBox} >
                                            <button onClick={handleLocationNoteSave}>Save note!</button>
                                        </div>
                                        <div className={style.cancelLocationButtonBox} >
                                            <button onClick={handleLocationNoteCancel}>Cancel</button>
                                        </div>
                                    </>
                                    :
                                    <div className={style.locationButtonBox}>
                                        <button onClick={handleLocationEditToggle}>Update location note!</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </>
            ) : null
            }
            <div className={style.infoSection}>
                <div className={style.descriptionArea}>
                    - {currentBusiness?.description}
                </div>
            </div>
            <div className={style.infoSectionColumn}>
                <div className={style.reviewsHeader}>Reviews:</div>
                <div className={style.reviewBox}>
                    {user && user.id != currentBusiness?.user_id ? (

                        <div className={style.outerFix}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                                <div className={style.leaveReviewCard}>
                                    <div className={style.leaveReviewCardTwo}>


                                        <h1>
                                            Leave a review
                                        </h1>
                                        {liveRating === 1 ? (
                                            <div className={style.starBox}>
                                                <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />
                                            </div>
                                        ) : null}
                                        {liveRating === 2 ? (
                                            <div className={style.starBox}>
                                                <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />
                                            </div>
                                        ) : null}
                                        {liveRating === 3 ? (
                                            <div className={style.starBox}>
                                                <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />

                                            </div>
                                        ) : null}
                                        {liveRating === 4 ? (
                                            <div className={style.starBox}>
                                                <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />

                                            </div>
                                        ) : null}
                                        {liveRating === 5 ? (
                                            <div className={style.starBox}>
                                                <BsStarFill onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                                <BsStarFill onClick={e => setLiveRating(null)} style={{ color: 'yellow' }} />
                                            </div>
                                        ) : null}

                                        {!liveRating &&
                                            <div className={style.starBox}>
                                                <FiStar onClick={e => setLiveRating(1)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(2)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(3)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(4)} style={{ color: 'yellow' }} />
                                                <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />
                                            </div>
                                        }
                                        {liveRating &&
                                            <div>
                                                <div className={style.textAreaContainer}>
                                                    {createReviewErrors && createReviewErrors.map(error => (
                                                        <div style={{ marginBottom: '5px' }} key={error}>{error}</div>
                                                    ))}
                                                    <textarea placeholder='Share your experience!' className={style.textArea} onChange={e => setReviewText(e.target.value)} value={reviewText}></textarea>
                                                </div>
                                                <div className={style.buttonContainer}>
                                                    <button className={style.submitButton} onClick={handleReviewSubmit}>Submit review</button>
                                                    <button className={style.cancelButton} onClick={handleReviewCancel}>Cancel</button>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                        : null}
                    {currentReviews && currentReviews.map(review => (

                        <div key={review.id} className={style.outerFix}>
                            {editId != review.id ? (



                                <div className={style.reviewCard}>
                                    <div className={style.review}>
                                        {user && user.id === review.user_id ? (

                                            <div id={review.id} className={style.controlButtons}>

                                                {/* <MdDelete onClick={handleReviewDelete} className={style.trashCan} /> */}
                                                <div id={review.id} onClick={handleReviewDelete} className={style.trashCan}>delete</div>
                                                {/* <div id={review.id} className={style.editIconContainer}> */}
                                                {/* edit */}
                                                <div id={review.id} onClick={handleEditToggle} className={style.editIcon}>edit</div>
                                                {/* <RiEdit2Line onClick={handleEditToggle} className={style.editIcon} /> */}
                                                {/* </div> */}


                                            </div>
                                        )
                                            : null
                                        }

                                        <div className={style.reviewUser}>
                                            {/* <div> */}


                                            <div className={style.reviewIcon}>
                                                <RiMapPinUserFill />
                                            </div>
                                            <div className={style.user}>
                                                {review['user'].username}

                                                <div className={style.reviewStarBox}>
                                                    {review.rating === 1 &&
                                                        <>
                                                            <BsStarFill style={{ color: 'red' }} />

                                                        </>
                                                    }
                                                    {review.rating === 2 &&
                                                        <>
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />

                                                        </>
                                                    }
                                                    {review.rating === 3 &&
                                                        <>
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />

                                                        </>
                                                    }
                                                    {review.rating === 4 &&
                                                        <>
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                        </>
                                                    }
                                                    {review.rating === 5 &&
                                                        <>
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                            <BsStarFill style={{ color: 'red' }} />
                                                        </>
                                                    }
                                                </div>
                                            </div>

                                            {/* </div> */}
                                            {/* <div className={style.invisPush}></div> */}
                                        </div>

                                        <div className={style.reviewTextBox}>
                                            "{review.text}"
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className={style.leaveReviewCard}>
                                        <div className={style.leaveReviewCardTwo}>


                                            <h1>
                                                Change your mind? Edit your review:
                                            </h1>
                                            {editLiveRating === 1 ? (
                                                <div className={style.starBox}>
                                                    <BsStarFill onClick={e => setEditLiveRating(null)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(2)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(3)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(4)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setLiveRating(5)} style={{ color: 'yellow' }} />
                                                </div>
                                            ) : null}
                                            {editLiveRating === 2 ? (
                                                <div className={style.starBox}>
                                                    <BsStarFill onClick={e => setEditLiveRating(1)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(null)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(3)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(4)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(5)} style={{ color: 'yellow' }} />
                                                </div>
                                            ) : null}
                                            {editLiveRating === 3 ? (
                                                <div className={style.starBox}>
                                                    <BsStarFill onClick={e => setEditLiveRating(1)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(2)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(null)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(4)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(5)} style={{ color: 'yellow' }} />

                                                </div>
                                            ) : null}
                                            {editLiveRating === 4 ? (
                                                <div className={style.starBox}>
                                                    <BsStarFill onClick={e => setEditLiveRating(1)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(2)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(3)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(null)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(5)} style={{ color: 'yellow' }} />

                                                </div>
                                            ) : null}
                                            {editLiveRating === 5 ? (
                                                <div className={style.starBox}>
                                                    <BsStarFill onClick={e => setEditLiveRating(1)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(2)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(3)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(4)} style={{ color: 'yellow' }} />
                                                    <BsStarFill onClick={e => setEditLiveRating(null)} style={{ color: 'yellow' }} />
                                                </div>
                                            ) : null}

                                            {!editLiveRating &&
                                                <div className={style.starBox}>
                                                    <FiStar onClick={e => setEditLiveRating(1)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(2)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(3)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(4)} style={{ color: 'yellow' }} />
                                                    <FiStar onClick={e => setEditLiveRating(5)} style={{ color: 'yellow' }} />
                                                </div>
                                            }
                                            {!editLiveRating &&
                                                <button style={{ marginTop: '8px' }} className={style.cancelButton} onClick={handleEditCancel}>Cancel</button>
                                            }

                                            {editLiveRating &&
                                                <div>
                                                    <div className={style.textAreaContainer}>
                                                        {editErrors && editErrors.map(error => (
                                                            <div style={{ marginBottom: '5px' }} key={error}>{error}</div>
                                                        ))}
                                                        {/* <textarea placeholder='Share your experience!' className={style.textArea} onChange={e => setEditReviewText(e.target.value)} value={editReviewText.length ? editReviewText : review.text}></textarea> */}
                                                        <textarea placeholder='Share your experience!' className={style.textArea} onChange={e => setEditReviewText(e.target.value)} value={editReviewText}></textarea>
                                                    </div>
                                                    <div className={style.buttonContainer}>
                                                        <button className={style.submitButton} id={review.id} onClick={handleEditReviewSubmit}>Submit edit</button>
                                                        <button className={style.cancelButton} onClick={handleEditReviewCancel}>Cancel</button>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                            }

                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default BusinessPage
