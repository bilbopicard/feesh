import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { displayFishTypes } from '../store/fishtypes';

function NewAppointmentForm() {

    const dispatch = useDispatch();

    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [fishTypeId, setFishTypeId] = useState(0)
    const [zipCode, setZipCode] = useState('')

    const fishTypes = useSelector(state => {
        return state.fishTypes.list.map(typeId => state.fishTypes[typeId])
    })

    useEffect(() => {
        dispatch(displayFishTypes())
    }, [dispatch])

    const submitForm = async (e) => {
        e.preventDefault()

        console.log(description, dateTime, streetAddress, city, fishTypeId, zipCode)
    }

    return (
        <form onSubmit={submitForm}>

            <div>
                <label>Description</label>
                <input id="description" name='description' value={description} onChange={e => setDescription(e.target.value)} required />
            </div>

            <div>

                <label>Date</label>
                <input type="datetime-local" name='dateTime' value={dateTime} onChange={e => setDateTime(e.target.value)} required />
            </div>

            {/* <div>
                <label>Time</label>
                <input type="time" />
            </div> */}

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
                        <option value={type.id}>{type.fish_type}</option>
                    ))}
                </select>
            </div>
            <button id="new-appointment-btn" type="submit">Create Appointment</button>

        </form>
    )
}

export default NewAppointmentForm;