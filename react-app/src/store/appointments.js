const GET_APPOINTMENTS = 'appointments/GET_APPOINTMENTS'
const ADD_APPOINTMENT = 'appointments/ADD_APPOINTMENT'

const getAppointments = (list) => {
    return {
        type: GET_APPOINTMENTS,
        list
    }
};

const addAppointment = (payload) => {
    return {
        type: ADD_APPOINTMENT,
        payload
    }
}

export const displayAppointments = () => async (dispatch) => {
    const response = await fetch('/api/appointments/');
    // console.log(response)
    if (response.ok) {
        const data = await response.json();
        dispatch(getAppointments(data))
    }
}

export const createAppointment = (payload) => async (dispatch) => {
    const { appointmentTypeId } = payload;
    // console.log('.......FROM STORE......', appointmentTypeId)
    const response = await fetch('/api/appointments/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        // console.log('yay')
        const data = await response.json();
        dispatch(addAppointment(data))
    }
}

const initialState = {
    list: [],
};

const sortList = list => {
    return list.map(appointment => appointment.id)
}

export default function appointmentReducer(state = initialState, action) {
    switch (action.type) {

        case GET_APPOINTMENTS:
            const nextState = {}
            action.list.appointments.forEach(appointment => {
                nextState[appointment.id] = appointment
            })
            return {
                ...state,
                ...nextState,
                list: sortList(action.list.appointments)
            };
        case ADD_APPOINTMENT:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
