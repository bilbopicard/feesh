const GET_APPOINTMENTS = 'appointments/GET_APPOINTMENTS'

const getAppointments = (list) => {
    return {
        type: GET_APPOINTMENTS,
        list
    }
};

export const displayAppointments = () => async (dispatch) => {
    const response = await fetch('/api/appointments/');
    console.log(response)
    if (response.ok) {
        const data = await response.json();
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
        default:
            return state;
    }
}
