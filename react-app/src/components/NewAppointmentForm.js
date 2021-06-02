import React, { useState, useEffect } from "react";

function NewAppointmentForm() {

    return (
        <form >

            <label>Description</label>
            <input id="description" />

            <label>Review</label>
            <input type="date" />
            <button id="new-appointment-btn" type="submit">Create Appointment</button>

        </form>
    )
}

export default NewAppointmentForm;