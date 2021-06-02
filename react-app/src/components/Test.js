import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

function Test() {

    // Notice we use useParams here instead of getting the params
    // From props.
    const appointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId])
    })

    return (
        <div>
            {appointments.map(appointment => (
                <h3>{appointment.description}</h3>
            ))}
        </div>
    );
}
export default Test;
