/* ------ DEFINE ACTION TYPES AS CONSTANTS ------ */

const ADD_BUSINESS = 'session/ADD_BUSINESS';
const SET_BUSINESSES = 'session/SET_BUSINESSES';
const REMOVE_BUSINESS = 'session/REMOVE_BUSINESS';


/* ------ DEFINE ACTION CREATORS ------ */

const addBusinessToStore = (business) => ({
    type: ADD_BUSINESS,
    business
});

const setAllBusinessesInStore = (businesses) => ({
    type: SET_BUSINESSES,
    businesses
});

const deleteBusinessFromStore = (businessId) => ({
    type: REMOVE_BUSINESS,
    businessId
})






/* ------ DEFINE INITIAL STATE ------ */

const initialState = {};

/* ------ DEFINE THUNK ACTION CREATORS ------ */

export const getBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/businesses')

    if (response.ok) {
        const data = await response.json();
        // console.log('******', data.businesses)
        const businessesArray = data.businesses
        dispatch(setAllBusinessesInStore(businessesArray))
        return businessesArray
    }
}


export const createBusiness = (business) => async (dispatch) => {
    const response = await fetch('/api/businesses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            business
        }),
    });

    if (response.ok) {
        const data = await response.json();
        // console.log("^^^^^", data)
        const newBiz = data

        dispatch(addBusinessToStore(newBiz))
        return newBiz;

    } else {
        return ['An error occurred. Please try again.']
    }

    // } else if (response.status < 500) {
    //     const data = await response.json();
    //     if (data.errors) {
    //         return data.errors;
    //     }
    // } else {
    //     return ['An error occurred. Please try again.']
    // }
}
// //TODO: build the API route to handle this fetch request
// export const editProject = (newProject) => async dispatch => {
//     console.log(newProject)
//     const response = await fetch(`/api/projects/${newProject.id}/edit`, {
//         method: 'PATCH',
//         body: JSON.stringify(newProject),
//         headers: {
//             'Content-Type': 'application/json',
//         },

//     });

//     if (response.ok) {
//         const newProjectData = await response.json();
//         console.log(newProjectData)
//         dispatch(addProjectToStore(newProjectData))
//         // return newProjectData
//     }
//     else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         }
//     } else {
//         return ['An error occurred. Please try again.']
//     }
// }

// export const deleteProject = (projectId) => async dispatch => {
//     const response = await fetch(`/api/projects/${projectId}`, {
//         method: 'DELETE',
//     });

//     if (response.ok) {
//         const projectDeleteSuccessMessage = await response.json();
//         dispatch(deleteProjectFromStore(projectId))

//         return projectDeleteSuccessMessage
//     }
//     return null;
// }

/* ------ DEFINE & EXPORT REDUCER ------ */

export default function reducer(state = initialState, action) {
    let newState;
    // console.log("HERE IS YOUR ACTION", action)
    switch (action.type) {
        case ADD_BUSINESS:
            newState = {}
            newState[action.business.id] = action.business
            return {
                ...state,
                ...newState
            };
        case SET_BUSINESSES:
            newState = {}
            action.businesses.forEach((business) => {
                newState[business.id] = business
            })
            return {
                ...state,
                ...newState
            };
        case REMOVE_BUSINESS:
            newState = Object.assign({}, state)
            delete newState[action.businessId]
            return {
                ...newState
            }
        default:
            return state;
    }
}
