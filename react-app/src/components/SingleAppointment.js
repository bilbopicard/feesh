import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { displayAppointments } from "../store/appointments";

function SingleAppointment() {

    const dispatch = useDispatch()
    const { appointmentId } = useParams();
    // console.log(appointmentId)

    const thisAppointment = useSelector(state => state.appointments[appointmentId])

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

                {/* <p>{appointmentId}</p> */}
            </div>
        </>
    )
}

export default SingleAppointment;