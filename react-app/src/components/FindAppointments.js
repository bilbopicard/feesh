import React from 'react';
import { useSelector } from 'react-redux';
import GoogleApiWrapper from './Map';
import './styles/findAppointments.css'

function FindAppointments() {

    const userId = useSelector(state => state.session.user.id)
    const otherUserAppointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId]).filter(appointment => appointment.user_id !== userId)
    })

    // console.log(otherUserAppointments)
    return (
        <div>
            <div id='find-appointment-outer-div'>
                {otherUserAppointments.map(appointment => (
                    <div className='find-appointment-inner-div' className={appointment.completed ? 'completed' : ''} key={appointment.id}>
                        {appointment.appointment_type}
                        <br />
                        {appointment.description}
                    </div>
                ))}
            </div>
            <GoogleApiWrapper />
        </div>
    )
}

export default FindAppointments;