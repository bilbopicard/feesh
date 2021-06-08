const ADD_REVIEW = 'appointments/ADD_REVIEW';

const addReview = (payload) => {
    return {
        type: ADD_REVIEW,
        payload
    }
}

export const createReview = (payload) => async (dispatch) => {
    console.log('in store', payload)
    // console.log('.......FROM STORE......', time)
    const response = await fetch('/api/reviews/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    // if (response.ok) {
    //     // console.log('yay')
    //     const data = await response.json();
    //     dispatch(addAppointment(data))
    // }
}