const ADD_REVIEW = 'reviews/ADD_REVIEW';
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const addReview = (payload) => {
    return {
        type: ADD_REVIEW,
        payload
    }
}

const getReviews = (list) => {
    return {
        type: GET_REVIEWS,
        list
    }
}

export const allReviews = () => async (dispatch) => {

    const response = await fetch('/api/reviews/');
    // console.log(response)
    if (response.ok) {
        const data = await response.json();
        dispatch(getReviews(data))
    }
}

export const createReview = (payload) => async (dispatch) => {
    console.log('in store#!@$!@$@!$@!', payload)
    // console.log('.......FROM STORE......', time)
    const response = await fetch('/api/reviews/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        // console.log('yay')
        const data = await response.json();
        dispatch(getReviews(data))
    }
}

export const deleteReview = (payload) => async (dispatch) => {
    const { reviewId } = payload;
    console.log(reviewId)
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getReviews(data))
    }
}

const initialState = {
    list: [],
};

const sortList = list => {
    return list.map(review => review.id)
}


export default function reviewReducer(state = initialState, action) {

    switch (action.type) {
        case GET_REVIEWS:
            // console.log(action.list)
            const nextState = {}
            action.list.reviews.forEach(review => {
                nextState[review.id] = review
            })
            return {
                ...state,
                ...nextState,
                list: sortList(action.list.reviews)
            };

        default:
            return state;
    }
}