import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { displayFishTypes } from '../store/fishtypes';
import { createAppointment } from '../store/appointments';

function NewAppointmentForm({ type }) {

    // console.log(type)
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id)

    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [fishTypeId, setFishTypeId] = useState(0)
    const [zipCode, setZipCode] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [time, setTime] = useState('')

    const fishTypes = useSelector(state => {
        return state.fishTypes.list.map(typeId => state.fishTypes[typeId])
    })

    useEffect(() => {
        dispatch(displayFishTypes())
    }, [dispatch])

    const submitForm = async (e) => {
        e.preventDefault()

        let appointmentTypeId = ''
        if (type === 'Feeding') {
            appointmentTypeId = 1;
        } else if (type === 'Training') {
            appointmentTypeId = 2;
        } else if (type === 'Drop-in') {
            appointmentTypeId = 3;
        } else if (type === 'Boarding') {
            appointmentTypeId = 4;
        } else if (type === 'Sitting') {
            appointmentTypeId = 5;
        } else if (type === 'Health') {
            appointmentTypeId = 6;
        }
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
            imageUrl
        }

        // console.log(description, dateTime, streetAddress, city, fishTypeId, zipCode, appointmentTypeId, userId)
        dispatch(createAppointment(payload))
        history.push('/appointments')
    }

    return (
        <form onSubmit={submitForm} id='new-appointment-form'>
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
                <label>Fish Type</label>
                <br />
                <select id="fish-type" name='fishTypeId' value={fishTypeId} onChange={e => setFishTypeId(e.target.value)} required>
                    <option>-- Select a fish type --</option>
                    {fishTypes.map(type => (
                        <option value={type.id} key={type.id}>{type.fish_type}</option>
                    ))}
                </select>
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


            <button id="new-appointment-btn" type="submit">Create Appointment</button>

        </form>
    )
}

export default NewAppointmentForm;