
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



export const getReviews = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`)

    if (response.ok) {
        const data = await response.json();


        // console.log('******', data.businesses)
        // const businessesArray = data.businesses
        // console.log('******',data.reviews)

        dispatch(setAllReviewsInStore(data.reviews))
        return data.reviews
    }
}


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
        // console.log(newReview, "********** YOU MADE IT HERE*")
        dispatch(addReviewToStore(newReview))
        return newReview;

    } else {
        const errors = await response.json();
        return errors
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const deleteResponse = await response.json();
        // console.log(deleteResponse)
        dispatch(deleteReviewFromStore(reviewId))
        // return projectDeleteSuccessMessage
    }
    // return null;
}

export const editReview = (updatedReview) => async dispatch => {

    const response = await fetch(`/api/reviews/${updatedReview.id}/edit`, {
        method: 'PUT',
        body: JSON.stringify(updatedReview),
        headers: {
            'Content-Type': 'application/json',
        },

    });

    if (response.ok) {
        const updatedReview = await response.json()

        dispatch(addReviewToStore(updatedReview))
        return updatedReview

    } else {
        const errors = await response.json()
        return errors

    }
    //     // console.log("********** SUCCESS", updatedBizData)
    // }
}


export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_REVIEW:
            newState = {}
            newState[action.review.id] = action.review
            return {
                ...state,
                ...newState
            };
        case SET_REVIEWS:
            newState = {}
            action.reviews.forEach((review) => {
                newState[review.id] = review
            })
            return {
                ...state,
                ...newState
            };
        case REMOVE_REVIEW:
            newState = Object.assign({}, state)
            delete newState[action.reviewId]
            return {
                ...newState
            }
        default:
            return state;
    }
}
