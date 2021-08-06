import { useState } from 'react';
import { getBusinesses } from '../../store/business';
import { useDispatch, useSelector } from 'react-redux'
import { createBusiness } from '../../store/business';
import style from "./CreateBusiness.module.css"
import preStyles from '../BusinessPage/BusinessPage.module.css'
import { useHistory } from 'react-router-dom';

function CreateBusiness() {
    const [currentSection, setSection] = useState('bizName');
    const [bizName, setBizName] = useState('')
    const [bizCategory, setBizCategory] = useState(null)
    const [bizDescription, setBizDescription] = useState('')
    const [bizCardImage, setBizCardImage] = useState('')
    const [bizBannerImage, setBizBannerImage] = useState('')
    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);

    const formContent = () => {


        const handleContinue = (e) => {
            e.preventDefault()
            if (currentSection === 'bizName') {
                setSection('chooseCategory')
            } else if (currentSection === 'chooseCategory') {
                setSection('finalize')
            }

        }
        const handleBack = (e) => {
            e.preventDefault()
            if (currentSection === 'chooseCategory') {
                setSection('bizName')
            }

        }
        const handleCreate = async (e) => {
            e.preventDefault()

            // const cardResult = await fetch(bizCardImage, {
            //     mode: "no-cors"
            // })

            // const bannerResult = await fetch(bizBannerImage, {
            //     mode: "no-cors"
            // })
            // console.log(cardResult.ok   )
            // console.log(bannerResult)
            const newBiz = {
                name: bizName,
                user_id: user.id,
                description: bizDescription,
                category_id: +bizCategory,
                // card_image: cardResult.ok ? bizCardImage : 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                card_image: bizCardImage ? bizCardImage : 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                // banner_image: bannerResult.ok ? bizBannerImage : 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                banner_image: bizBannerImage ? bizBannerImage : 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            }
            if (newBiz) {
                const createdBiz = await dispatch(createBusiness(newBiz))
                if (!createdBiz.errors) {
                    history.push(`/businesses/${createdBiz.id}`)

                } else {
                    // console.log('RESULT', createdBiz.errors)
                    setErrors(createdBiz.errors)
                }
            }
        }

        if (currentSection === 'bizName') {
            return (
                <div className={style.slideContainer}>
                    <div className={style.flexBorderBox}>
                        <div className={style.labelContainer}>
                            <label className={style.bigLabel}>Let's start with your business name</label>
                        </div>
                        <div>
                            <input placeholder='Enter business name!' className={style.input} onChange={e => setBizName(e.target.value)} value={bizName} type='text'></input>
                        </div>
                        <div className={preStyles.editButtonBox}>
                            <button className={style.editButton} onClick={handleContinue}>Continue</button>
                        </div>
                    </div>
                </div>
            )
        } else if (currentSection === 'chooseCategory') {
            return (
                <div className={style.slideContainer}>
                    <div className={style.flexBorderBox}>

                        <div>
                            <label className={style.bigLabel}>Select a category that best fits:</label>
                        </div>
                        <div className={style.radioFlexBox}>
                            <label className={style.radioLabel} htmlFor='food'>Food</label>
                            <input className={style.radioInput} type='radio' id='food' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "1" ? true : false} value="1" ></input>
                            <label className={style.radioLabel} htmlFor='retail' >Retail</label>
                            <input className={style.radioInput} type='radio' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "2" ? true : false} id='retail' value="2" ></input>
                            <label className={style.radioLabel} htmlFor='event'>Event</label>
                            <input className={style.radioInput} type='radio' onChange={e => setBizCategory(e.target.value)} id='event' checked={bizCategory === "3" ? true : false} value="3"></input>
                        </div >

                        <div>
                            <label className={style.bigLabel} htmlFor='description'>Tell us about your business!</label>
                        </div>
                        <div>
                            <textarea className={style.textArea} onChange={e => setBizDescription(e.target.value)} value={bizDescription} id='description' placeholder='Provide a brief description'></textarea>
                        </div>

                        <div className={style.flexSpread}>

                            <div className={preStyles.editButtonBox} style={{ backgroundColor: 'white' }}>
                                <button className={style.backButton} onClick={handleBack}>Back</button>
                            </div>
                            <div className={preStyles.editButtonBox}>
                                <button className={style.editButton} onClick={handleContinue}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div >
            )
        } else if (currentSection === 'finalize') {

            const formatter = (url1, url2) => {
                return `url(${url1}), url(${url2})`
            }

            return (
                <div className={style.flexContainer}>
                    <div className={style.leftSide}>
                        <div className={style.confirmBox}>

                            <h1 className={style.bigLabel} style={{ marginTop: '15px' }}>Does this look correct?</h1>
                            {errors && errors.map(error => (
                                <div key={error} style={{ color: 'red' }}>{error}</div>
                            ))}
                            <div>
                                <label className={style.radioLabel}>Business Name:</label>
                            </div>
                            <div>
                                <input placeholder='Enter business name!' className={style.input} onChange={e => setBizName(e.target.value)} value={bizName} type='text'></input>
                            </div>
                            <div>
                                <label className={style.radioLabel}>Category:</label>
                            </div>
                            <div>
                                <label className={style.radioLabel} htmlFor='food'>Food</label>
                                <input className={style.radioInput} type='radio' id='food' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "1" ? true : false} value='1'></input>
                                <label className={style.radioLabel} htmlFor='retail' >Retail</label>
                                <input className={style.radioInput} type='radio' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "2" ? true : false} id='retail' value='2' ></input>
                                <label className={style.radioLabel} htmlFor='event'>Event</label>
                                <input className={style.radioInput} type='radio' onChange={e => setBizCategory(e.target.value)} id='event' checked={bizCategory === "3" ? true : false} value='3'></input>
                            </div>
                            <div>
                                <label className={style.radioLabel}>Banner Image:</label>
                            </div>
                            <div>
                                <input placeholder='Enter image url' className={style.input} onChange={e => setBizBannerImage(e.target.value)} value={bizBannerImage} type='text'></input>
                            </div>
                            <div className={style.cardImagePreview} style={{ backgroundImage: bizCardImage ? formatter(bizCardImage, 'https://www.vrajfresh.com/wp-content/uploads/2020/09/default_image.png') : 'url("https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")' }}></div>
                            <div>
                                <label className={style.radioLabel}>Business Card Image:</label>
                            </div>
                            <div>
                                <input placeholder='Enter image url' className={style.input} onChange={e => setBizCardImage(e.target.value)} value={bizCardImage} type='text'></input>
                            </div>
                            <div>
                                <label className={style.radioLabel} htmlFor='description'>Business Description:</label>
                            </div>
                            <div>
                                <textarea className={style.textArea} onChange={e => setBizDescription(e.target.value)} value={bizDescription} id='description' placeholder='Provide a brief description'></textarea>
                            </div>

                            <div className={style.editButtonBox}>
                                <button className={style.editButton} onClick={handleCreate}>Create</button>
                            </div>


                        </div>
                    </div>
                    <div className={style.rightSide}>
                        <div className={style.previewCard}>
                            <div className={style.bannerBox} style={{ backgroundImage: bizBannerImage ? formatter(bizBannerImage, 'https://www.vrajfresh.com/wp-content/uploads/2020/09/default_image.png') : 'url("https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")' }}>
                                <div className={style.infoBox}>
                                    <div className={style.nameBox}>
                                        {bizName ? <>{bizName}</> :
                                            <>
                                                New Business
                                            </>
                                        }
                                    </div>
                                    <div className={style.starBox}>
                                        ⭐⭐⭐⭐⭐ 52 reviews
                                    </div>
                                    <div className={preStyles.openStatus} style={{ marginTop: '8px', fontSize: '19px' }}>Now Open!</div>
                                    <div className={style.location}>Located at: 5252 New Business Way, Washington D.C, USA</div>
                                </div>
                            </div>
                            <div className={style.descriptionBox}>
                                <div className={style.innerBox}>

                                </div>
                                <div className={style.innerBox}>

                                </div>
                                <div className={style.innerBox}>

                                </div>
                            </div>
                            <div className={style.descriptionBoxBottom}>
                                <div className={style.description}>
                                    {bizDescription ? <>- {bizDescription}</> :
                                        <>
                                            - Description
                                        </>
                                    }

                                </div>

                            </div>
                            <div className={style.descriptionBoxBottom}>
                                <div className={style.nameBox} style={{ color: 'black' }}>
                                    Reviews
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            )
        }

    }

    return (
        <div>
            <form>
                {formContent()}
            </form>
        </div>
    )
}


export default CreateBusiness
