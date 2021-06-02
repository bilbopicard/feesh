import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import NewAppointmentForm from './NewAppointmentForm';

function NewAppointment() {

    const { type } = useParams()

    return (
        <div>
            <h1>{type} Form</h1>
            <h2>This is the best form</h2>
            <NewAppointmentForm />
        </div>
    );
}
export default NewAppointment;
