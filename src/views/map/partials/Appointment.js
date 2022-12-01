import React, {useEffect, useState} from 'react'

export const Appointment = (room) => {

    let userPseudo = localStorage.getItem('pseudo');
    const [appointmentPosition, setAppointmentPosition]  = useState([0, 0]);
    const [userPosition, setUserPosition] = useState([0,0]);
    const [restauPosition, setRestauPosition] = useState([0, 0]);
    const [timeAppointment, setTimeAppointment] = useState(0);
    const [time, setTime] = useState(0);
    const [timeMin, setTimeMin] = useState(0);

    // Récupère la postion utilisateur et du restaurant
    useEffect(() => {
        if(room.room.length > 0) {
            room.room[0]["users"].map(user => {
                if(user.name === userPseudo){
                    setUserPosition(user.positionUser)
                    setRestauPosition(user.positionRestau)
                }
            })
            setAppointmentPosition(room.room[0].appointment)
            setTimeAppointment(room.room[0].date)
        }

    }, [room.room[0]])

    // Calcule la distance et le temps que l'utilisateur doit mettre
    useEffect(() => {
        let distanceUserRestau = 0
        let distanceUserAppointment = 0
        if(restauPosition){
            distanceUserRestau = getDistance(userPosition[0], userPosition[1], restauPosition[0], restauPosition[1])
            distanceUserAppointment = getDistance(restauPosition[0], restauPosition[1], appointmentPosition[0], appointmentPosition[1])
        }else {
            distanceUserAppointment = getDistance(userPosition[0], userPosition[1], appointmentPosition[0], appointmentPosition[1])
        }
        setTimeMin(((distanceUserRestau + distanceUserAppointment) / 5)*60)
    }, [userPosition, restauPosition, appointmentPosition])

    // Converts numeric degrees to radians
    function getDistance(lat1, lon1, lat2, lon2) {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2-lat1);  // deg2rad below
        let dLon = deg2rad(lon2-lon1); 
        let a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    useEffect(() => {
        let stringAppointment = timeAppointment.toString()
        let timeA = stringAppointment.split(":");
        let hourA = parseInt(timeA[0]);
        let minuteA = parseInt(timeA[1]);
        let totalAppointment = hourA*60 + minuteA;

        let totalLeave = totalAppointment - timeMin;
        let hours = Math.floor(totalLeave / 60);
        let minutes = Math.trunc(totalLeave % 60 );
        if(minutes < 10){
            minutes = `0${minutes}`
        }
        setTime(`${hours}:${minutes}`);

    }, [timeAppointment, timeMin]);


    return (
        <h4 className={'appointment'}>Rendez-vous à {timeAppointment}<br/> {userPseudo}, tu dois partir à {time}</h4>
    )
}

export default Appointment;