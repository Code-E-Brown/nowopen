import { useState, useEffect } from 'react';
import { getBusinesses } from '../../store/business';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { editBusiness, deleteBusiness } from '../../store/business';





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


    const handleEdit = (e) => {
        e.preventDefault()
        const updatedBiz = {
            id: +businessId,
            name: bizName,
            user_id: user.id,
            description: bizDescription,
            category_id: +bizCategory
        }
        // console.log(updatedBiz)
        if (updatedBiz) {
            dispatch(editBusiness(updatedBiz))
            history.push(`/businesses/${+businessId}`)
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()

        if (deleteAlert === true) {
            dispatch(deleteBusiness(+businessId))
        } else {

            setDeleteAlert(!deleteAlert)

            setDeleteText('Confirm Delete')

            setTimeout(() => {
                setDeleteAlert(false)
                setDeleteText('Delete')
            }, 6000)
        }





    }

    return (
        <div>
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
                <input type='radio' id='food' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "1" || bizCategory === 1 ? true : false} value='1'></input>
                <label htmlFor='retail' >Retail</label>
                <input type='radio' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "2" || bizCategory === 2 ? true : false} id='retail' value='2' ></input>
                <label htmlFor='event'>Event</label>
                <input type='radio' onChange={e => setBizCategory(e.target.value)} id='event' checked={bizCategory === "3" || bizCategory === 3 ? true : false} value='3'></input>
            </div>
            <div>
                <div>
                    <label htmlFor='description'>Business Description:</label>
                </div>
                <div>
                    <textarea onChange={e => setBizDescription(e.target.value)} value={bizDescription} id='description' placeholder='Something goes heree'></textarea>
                </div>
            </div>
            <div>
                <button onClick={handleEdit}>Save Changes</button>
            </div>
            <div>
                {deleteAlert &&
                    <div>Are you sure you want to delete your business? Click again to confirm.</div>
                }
                <button onClick={handleDelete}>{deleteText}</button>
            </div>
        </div>
    )
}



export default EditBusiness
