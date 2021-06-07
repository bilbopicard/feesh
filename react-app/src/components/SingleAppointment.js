import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { displayAppointments } from "../store/appointments";

function SingleAppointment() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { appointmentId } = useParams();
    // console.log(appointmentId)

    const thisAppointment = useSelector(state => state.appointments[appointmentId])
    const userId = useSelector(state => state.session.user.id)

    const editAppointment = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        history.push(`/appointments/${e.target.id}/edit`)
    }

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <>
            <div className='nav-empty-div'></div>
            <div>
                <h1>I'm a single component</h1>
                {thisAppointment?.appointment_type}
                {thisAppointment?.date}
                {thisAppointment?.user_id === userId && !thisAppointment?.completed && <form >
                    <button id={thisAppointment.id} type='submit' onClick={editAppointment}>Edit this appointment</button>
                </form>}
            </div>
        </>
    )
}

export default SingleAppointment;