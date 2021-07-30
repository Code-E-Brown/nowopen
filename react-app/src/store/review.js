
const ADD_REVIEW = 'review/ADD_REVIEW';
const SET_REVIEWS = 'review/SET_REVIEW';
const REMOVE_REVIEW = 'review/REMOVE_REVIEW';


const addReviewToStore = (review) => ({
    type: ADD_REVIEW,
    review
});

const setAllReviewsInStore = (reviews) => ({
    type: SET_REVIEWS,
    reviews
});

const deleteReviewFromStore = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})



const initialState = {};


export const createReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${review.business_id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            review
        ),
    });

    if (response.ok) {
        const data = await response.json();
        // console.log("^^^^^", data)
        const newReview = data
        console.log(newReview, "********** YOU MADE IT HERE*")
        // dispatch(addBusinessToStore(newReview))
        // return newReview;

    } else {
        return ['An error occurred. Please try again.']
    }
}


export default function reducer(state = initialState, action) {
    let newState;
    // console.log("HERE IS YOUR ACTION", action)
    switch (action.type) {
        case ADD_REVIEW:
            newState = {}
            newState[action.business.id] = action.business
            return {
                ...state,
                ...newState
            };
        case SET_REVIEWS:
            newState = {}
            action.businesses.forEach((business) => {
                newState[business.id] = business
            })
            return {
                ...state,
                ...newState
            };
        case REMOVE_REVIEW:
            newState = Object.assign({}, state)
            delete newState[action.businessId]
            return {
                ...newState
            }
        default:
            return state;
    }
}
