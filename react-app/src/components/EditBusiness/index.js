import { useState, useEffect } from 'react';
import { getBusinesses } from '../../store/business';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { editBusiness, deleteBusiness } from '../../store/business';
import preStyles from '../BusinessPage/BusinessPage.module.css'
import style from '../CreateBusiness/CreateBusiness.module.css'




function EditBusiness() {
    const { id } = useParams();
    const businessId = id;

    const [currentSection, setSection] = useState('bizName');
    const [singleBusiness, setSingleBusiness] = useState({})
    const [bizName, setBizName] = useState('')
    const [bizCategory, setBizCategory] = useState('')
    const [bizDescription, setBizDescription] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const history = useHistory()
    const [deleteText, setDeleteText] = useState('Delete')
    const [deleteAlert, setDeleteAlert] = useState(false)
    const [countDown, setCountDown] = useState(6)
    const [errors, setErrors] = useState(null)

    const currentBusiness = useSelector(state => state.businesses[businessId]);
    // if (currentBusiness != undefined) {
    //     setBizName(currentBusiness.name)
    // }


    useEffect(async () => {
        const result = await dispatch(getBusinesses())
        const currentBiz = (result.find(business => business.id === +businessId))
        // console.log(currentBiz)
        // console.log('RESULT!!!', result, '****', result.find(business => business.id === +businessId))


        if (currentBiz) {

            setSingleBusiness(currentBiz)
            setBizName(currentBiz.name)
            setBizCategory(currentBiz.category_id)
            setBizDescription(currentBiz.description)

        }

    }, [dispatch])


    const handleEdit = async (e) => {
        e.preventDefault()
        const updatedBiz = {
            ...currentBusiness,
            id: +businessId,
            name: bizName,
            user_id: user.id,
            description: bizDescription,
            category_id: +bizCategory
        }
        if (updatedBiz) {
            // console.log(updatedBiz)
            let result = await dispatch(editBusiness(updatedBiz))
            if (!result.errors) {


                history.push(`/businesses/${+businessId}`)
            } else {
                setErrors(result.errors)
            }
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()

        if (deleteAlert === true) {
            dispatch(deleteBusiness(+businessId))
            history.push(`/`)
        } else {

            setDeleteAlert(!deleteAlert)

            setDeleteText('Confirm')

            setTimeout(() => {
                setDeleteAlert(false)
                setDeleteText('Delete')
            }, 6000)
        }

    }

    return (
        <div className={style.flexContainer}>
            <div className={style.leftSide}>
                <div className={style.confirmBox}>

                    <h1 className={style.bigLabel} style={{ marginTop: '50px' }}>Does this look correct?</h1>
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
                        <input className={style.radioInput} type='radio' id='food' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "1" || bizCategory === 1 ? true : false} value='1'></input>
                        <label className={style.radioLabel} htmlFor='retail' >Retail</label>
                        <input className={style.radioInput} type='radio' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "2" || bizCategory === 2 ? true : false} id='retail' value='2' ></input>
                        <label className={style.radioLabel} htmlFor='event'>Event</label>
                        <input className={style.radioInput} type='radio' onChange={e => setBizCategory(e.target.value)} id='event' checked={bizCategory === "3" || bizCategory === 3 ? true : false} value='3'></input>
                    </div>
                    <div>
                        <label className={style.radioLabel} htmlFor='description'>Business Description:</label>
                    </div>
                    <div>
                        <textarea className={style.textArea} onChange={e => setBizDescription(e.target.value)} value={bizDescription} id='description' placeholder='Provide a brief description'></textarea>
                    </div>

                    <div className={style.editButtonBox}>
                        <button className={style.editButton} onClick={handleEdit}>Save</button>
                    </div>

                    {deleteAlert &&
                        <div style={{ margin: '-10px', color: 'red', fontWeight: '600' }}>Are you sure you want to delete your business? Click to confirm.</div>
                    }
                    <div className={preStyles.editButtonBox} style={{ backgroundColor: 'white', marginRight: '0px', marginBottom: '50px' }}>
                        <button className={style.backButton} onClick={handleDelete}>{deleteText}</button>

                    </div>




                </div>
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
        </div >


        // <div>
        //     <h1>Does this look correct?</h1>
        //     <div>
        //         <label>Business Name:</label>
        //     </div>
        //     <div>
        //         <input onChange={e => setBizName(e.target.value)} value={bizName} type='text'></input>
        //     </div>
        //     <div>
        //         <label>Category:</label>
        //     </div>
        //     <div>
        //         <label htmlFor='food'>Food</label>
        //         <input type='radio' id='food' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "1" || bizCategory === 1 ? true : false} value='1'></input>
        //         <label htmlFor='retail' >Retail</label>
        //         <input type='radio' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "2" || bizCategory === 2 ? true : false} id='retail' value='2' ></input>
        //         <label htmlFor='event'>Event</label>
        //         <input type='radio' onChange={e => setBizCategory(e.target.value)} id='event' checked={bizCategory === "3" || bizCategory === 3 ? true : false} value='3'></input>
        //     </div>
        //     <div>
        //         <div>
        //             <label htmlFor='description'>Business Description:</label>
        //         </div>
        //         <div>
        //             <textarea onChange={e => setBizDescription(e.target.value)} value={bizDescription} id='description' placeholder='Something goes heree'></textarea>
        //         </div>
        //     </div>
        //     <div>
        //         <button onClick={handleEdit}>Save Changes</button>
        //     </div>
        //     <div>
        //         {deleteAlert &&
        //             <div>Are you sure you want to delete your business? Click again to confirm.</div>
        //         }
        //         <button onClick={handleDelete}>{deleteText}</button>
        //     </div>
        // </div>
    )
}



export default EditBusiness
