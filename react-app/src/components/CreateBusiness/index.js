import { useState } from 'react';
import { getBusinesses } from '../../store/business';
import { useDispatch, useSelector } from 'react-redux'
import { createBusiness } from '../../store/business';

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
                <div>

                    <div>
                        <label>What is the name of your business?</label>
                    </div>
                    <div>
                        <input onChange={e => setBizName(e.target.value)} value={bizName} type='text'></input>
                    </div>
                    <div>
                        <button onClick={handleContinue}>Continue</button>
                    </div>
                </div>
            )
        } else if (currentSection === 'chooseCategory') {
            return (
                <div>

                    <div>
                        <label>Select a category that best fits:</label>
                    </div>
                    <div>
                        <label htmlFor='food'>Food</label>
                        <input type='radio' id='food' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "1" ? true : false} value="1" ></input>
                        <label htmlFor='retail' >Retail</label>
                        <input type='radio' onChange={e => setBizCategory(e.target.value)} checked={bizCategory === "2" ? true : false} id='retail' value="2" ></input>
                        <label htmlFor='event'>Event</label>
                        <input type='radio' onChange={e => setBizCategory(e.target.value)} id='event' checked={bizCategory === "3" ? true : false} value="3"></input>
                    </div >
                    <div>
                        <div>
                            <label htmlFor='description'>Tell us about your business!</label>
                        </div>
                        <div>
                            <textarea onChange={e => setBizDescription(e.target.value)} value={bizDescription} id='description' placeholder='Something goes heree'></textarea>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleBack}>Back</button>
                    </div>
                    <div>
                        <button onClick={handleContinue}>Continue</button>
                    </div>
                </div >
            )
        } else if (currentSection === 'finalize') {
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
