import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Geocode from 'react-geocode';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);

const mapStyles = {
    width: '90%',
    height: '500px'
};


function MapContainer(props) {

    // const userZip = useSelector(state => state.session.user.zip_code)
    const [markers, setMarkers] = useState([]);
    // const [userLoc, setUserLoc] = useState([]);
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id)
    const otherUserAppointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId]).filter(appointment => appointment.user_id !== userId)
    })

    const notCompletedAppointments = otherUserAppointments.filter(appointment => !appointment.completed && !appointment.feeder)

    // console.log(notCompletedAppointments)

    const markerClick = (id) => {
        history.push(`/appointments/${id}`)
    }

    useEffect(() => {
        notCompletedAppointments.forEach(async appointment => {
            const response = await Geocode.fromAddress(`${appointment.street_address}, ${appointment.city}, ${appointment.state}`);
            const { lat, lng } = response.results[0].geometry.location;

            const marker = (
                <Marker
                    key={appointment.id}
                    name={appointment.id}
                    position={{
                        lat,
                        lng
                    }}
                    onClick={() => markerClick(appointment.id)}
                />
            );
            setMarkers(prevMarkers => [...prevMarkers, marker]);
        });

    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const userLocation = await Geocode.fromAddress(userZip)
    //         const { lat, lng } = userLocation.results[0].geometry.location
    //         setUserLoc([lat, lng])
    //         console.log(userLoc)
    //     })();
    // })


    return (
        <Map
            google={props.google}
            style={mapStyles}
            zoom={8}
            initialCenter={{ lat: 36.9741, lng: -122.0308 }}
        >
            {markers}
        </Map >
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(MapContainer);
