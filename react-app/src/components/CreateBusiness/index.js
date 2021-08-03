import { useState } from 'react';
import { getBusinesses } from '../../store/business';
import { useDispatch, useSelector } from 'react-redux'
import { createBusiness } from '../../store/business';
import style from "./CreateBusiness.module.css"
import preStyles from '../BusinessPage/BusinessPage.module.css'

function CreateBusiness() {
    const [currentSection, setSection] = useState('bizName');
    const [bizName, setBizName] = useState('')
    const [bizCategory, setBizCategory] = useState(null)
    const [bizDescription, setBizDescription] = useState('')
    const dispatch = useDispatch()
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
        const handleCreate = (e) => {
            e.preventDefault()
            const newBiz = {
                name: bizName,
                user_id: user.id,
                description: bizDescription,
                category_id: +bizCategory
            }
            if (newBiz) {
                dispatch(createBusiness(newBiz))
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
            return (
                <div className={style.flexContainer}>
                    <div className={style.leftSide}>
                        <h1>Does this look correct?</h1>
                        <div>
                            <label>Business Name:</label>
                        </div>
                        <div>
                            <input onChange={e => setBizName(e.target.value)} value={bizName} type='text'></input>
                        </div>
                        <div>
                            <label>Category:</label>
                        </div>
                        <div>
                            <label htmlFor='food'>Food</label>
                            <input type='radio' id='food' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "1" ? true : false} value='1'></input>
                            <label htmlFor='retail' >Retail</label>
                            <input type='radio' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "2" ? true : false} id='retail' value='2' ></input>
                            <label htmlFor='event'>Event</label>
                            <input type='radio' onChange={e => setBizCategory(e.target.value)} id='event' checked={bizCategory === "3" ? true : false} value='3'></input>
                        </div>
                        <div>
                            <div>
                                <label htmlFor='description'>Business Description:</label>
                            </div>
                            <div>
                                <textarea onChange={e => setBizDescription(e.target.value)} value={bizDescription} id='description' placeholder='Something goes heree'></textarea>
                            </div>
                        </div>
                        <button onClick={handleCreate}>Save and Create</button>
                    </div>
                    <div className={style.rightSide}>
                        <div className={style.previewCard}>
                            <div className={style.bannerBox}>
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
                        </div>
                    </div>
                </div>
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
