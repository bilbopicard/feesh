const GET_APPOINTMENTS = 'appointments/GET_APPOINTMENTS';
const ADD_APPOINTMENT = 'appointments/ADD_APPOINTMENT';
const UPDATE_APPOINTMENT = 'appointments/UPDATE_APPOINTMENT';

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

const editAppointment = (payload) => {
    return {
        type: UPDATE_APPOINTMENT,
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
    // const { time } = payload;
    // console.log('.......FROM STORE......', time)
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
        dispatch(getAppointments(data))
    }
}

export const updateAppointment = (payload) => async (dispatch) => {
    const { appointmentId, date } = payload;
    console.log(date)
    console.log(payload)
    const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        // console.log('yay')
        const data = await response.json();
        // console.log(data)
        dispatch(editAppointment(data))
    }
}

export const deleteAppointment = (payload) => async (dispatch) => {
    const { appointmentId } = payload;
    console.log(appointmentId)
    const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        // console.log(data)
        dispatch(getAppointments(data))
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
        case UPDATE_APPOINTMENT:
            state[action.payload.id] = action.payload
            return { ...state }
        default:
            return state;
    }
}
