import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NewAppointmentForm from './NewAppointmentForm';
import { displayFishTypes } from '../store/fishtypes';
import { displayAppointments } from '../store/appointments';


function EditAppointment() {

    let { id } = useParams()
    const dispatch = useDispatch();

    const appointmentToEdit = useSelector(state => state.appointments[parseInt(id)])
    console.log(appointmentToEdit)

    const newDate = new Date(appointmentToEdit?.date)

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const formattedNewDate = formatDate(newDate)
    console.log(newDate)
    const userId = useSelector(state => state.session.user.id)

    const [description, setDescription] = useState(appointmentToEdit?.description)
    const [date, setDate] = useState(formattedNewDate)
    const [streetAddress, setStreetAddress] = useState(appointmentToEdit?.street_address)
    const [city, setCity] = useState(appointmentToEdit?.city)
    const [fishTypeId, setFishTypeId] = useState(appointmentToEdit?.fish_type_id)
    const [zipCode, setZipCode] = useState(appointmentToEdit?.zip_code)
    const [imageUrl, setImageUrl] = useState(appointmentToEdit?.image_url)
    const [time, setTime] = useState(appointmentToEdit?.time)

    const fishTypes = useSelector(state => {
        return state.fishTypes.list.map(typeId => state.fishTypes[typeId])
    })

    useEffect(() => {
        dispatch(displayAppointments())
        dispatch(displayFishTypes())
    }, [dispatch])

    return (
        <>
            <div class='nav-empty-div'></div>
            <form id='new-appointment-form'>

                <div>
                    <label>Description</label>
                    <input id="description" name='description' value={description} onChange={e => setDescription(e.target.value)} required />
                </div>

                <div>

                    <label>Date</label>
                    <input type="date" name='date' value={date} onChange={e => setDate(e.target.value)} required />
                </div>

                <div>

                    <label>Time</label>
                    <input type="time" name='time' value={time} onChange={e => setTime(e.target.value)} required />
                </div>

                <div>
                    <label>Image</label>
                    <input type="text" name='image' value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
                </div>

                <div>
                    <label>Address</label>
                    <input type="text" name='streetAddress' value={streetAddress} onChange={e => setStreetAddress(e.target.value)} required />
                </div>


                <div>
                    <label>City</label>
                    <input type="text" name='city' value={city} onChange={e => setCity(e.target.value)} />
                </div>


                <div>
                    <label>Zip Code</label>
                    <input type="text" pattern="[0-9]{5}" name='zipCode' value={zipCode} onChange={e => setZipCode(e.target.value)} required />
                </div>

                <div>
                    <label>Fish Type</label>
                    <select name="fish_type" id="fish-type" name='fishTypeId' value={fishTypeId} onChange={e => setFishTypeId(e.target.value)} required>
                        <option>-- Select a type --</option>
                        {fishTypes.map(type => (
                            <option value={type.id} key={type.id}>{type.fish_type}</option>
                        ))}
                    </select>
                </div>
                <button id="new-appointment-btn" type="submit">Create Appointment</button>

            </form>
        </>
    )
}

export default EditAppointment;