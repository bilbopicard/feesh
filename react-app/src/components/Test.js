import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayAppointments } from '../store/appointments';

function Test() {

    const dispatch = useDispatch();

    const appointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId])
    })

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])
    return (
        <div>
            {appointments.map(appointment => (
                <h3>{appointment.time}</h3>
            ))}
        </div>
    );
}
export default Test;
