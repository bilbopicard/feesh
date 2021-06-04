import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SingleAppointment() {

    const { appointmentId } = useParams();
    // console.log(appointmentId)

    const thisAppointment = useSelector(state => state.appointments[appointmentId])

    return (
        <div>
            <h1>I'm a single component</h1>
            {thisAppointment?.appointment_type}
            {thisAppointment?.date}

            {/* <p>{appointmentId}</p> */}
        </div>
    )
}

export default SingleAppointment;