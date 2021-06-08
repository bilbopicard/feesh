import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import NewAppointmentForm from './NewAppointmentForm';
import { displayFishTypes } from '../store/fishtypes';
import { displayAppointments } from '../store/appointments';
import { updateAppointment } from '../store/appointments';
import './styles/editAppointment.css'

function EditAppointment() {

    let { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
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
    const [time, setTime] = useState('')
    const [appointmentTypeId, setAppointmentTypeId] = useState(appointmentToEdit?.appointment_type_id)
    const appointmentId = appointmentToEdit?.id

    console.log(typeof time)

    const fishTypes = useSelector(state => {
        return state.fishTypes.list.map(typeId => state.fishTypes[typeId])
    })

    const appointmentTypes = [['Feeding', 1], ['Training', 2], ['Drop-in', 3], ['Boarding', 4], ['Sitting', 5], ['Health', 6]]

    const submitForm = async (e) => {
        e.preventDefault()

        // let appointmentTypeId = ''
        // if (type === 'Feeding') {
        //     appointmentTypeId = 1;
        // } else if (type === 'Training') {
        //     appointmentTypeId = 2;
        // } else if (type === 'Drop-in') {
        //     appointmentTypeId = 3;
        // } else if (type === 'Boarding') {
        //     appointmentTypeId = 4;
        // } else if (type === 'Sitting') {
        //     appointmentTypeId = 5;
        // } else if (type === 'Health') {
        //     appointmentTypeId = 6;
        // }
        // console.log(time)
        const payload = {
            description,
            date,
            time,
            streetAddress,
            city,
            fishTypeId,
            zipCode,
            userId,
            appointmentTypeId,
            imageUrl,
            appointmentId
        }

        // console.log(description, dateTime, streetAddress, city, fishTypeId, zipCode, appointmentTypeId, userId)
        dispatch(updateAppointment(payload))
        history.push(`/appointments/${appointmentToEdit.id}`)
    }

    useEffect(() => {
        dispatch(displayAppointments())
        dispatch(displayFishTypes())
    }, [dispatch])

    return (
        <>
            <div class='nav-empty-div'></div>
            <div id='edit-appointment-container'>
                <h2>Editing Appointment</h2>
                <form id='new-appointment-form' onSubmit={submitForm}>

                    <div>
                        <label>Description</label>
                        <input id="description" name='description' value={description} onChange={e => setDescription(e.target.value)} required />
                    </div>

                    <div>
                        <label>Apointment Type</label>
                        <select name="appointType" value={appointmentTypeId} onChange={e => setAppointmentTypeId(e.target.value)}>
                            {appointmentTypes.map(type => (
                                <option value={type[1]}>{type[0]}</option>
                            ))}
                        </select>
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
                    <button id="new-appointment-btn" type="submit">Update Appointment</button>

                </form>
            </div>
        </>
    )
}

export default EditAppointment;