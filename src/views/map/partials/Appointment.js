import React, {useEffect, useState} from 'react'

export const Appointment = (room) => {

    let userPseudo = localStorage.getItem('pseudo');
    const [appointmentPosition, setAppointmentPosition]  = useState([48.898, 2.28]);
    const [userPosition, setUserPosition] = useState([0,0]);
    const [restauPosition, setRestauPosition] = useState([48.888, 2.287]);
    const [time, setTime] = useState(0)

    // Récupère la postion utilisateur et du restaurant
    useEffect(() => {
        if(room.room.length > 0) {
            room.room[0]["users"].map(user => {
                if(user.name === userPseudo){
                    setUserPosition(user.positionUser)
                    // setRestauPosition(user.positionRestau)
                }
            })
        }
    }, [room.room[0]])

    // Calcule la distance et le temps que l'utilisateur doit mettre
    useEffect(() => {
        let distanceUserRestau = 0
        let distanceUserAppointment = 0
        if(restauPosition){
            distanceUserRestau = getDistance(userPosition[0], userPosition[1], restauPosition[0], restauPosition[1])
            distanceUserAppointment = getDistance(restauPosition[0], restauPosition[1], appointmentPosition[0], appointmentPosition[1])
        }else{
            distanceUserAppointment = getDistance(userPosition[0], userPosition[1], appointmentPosition[0], appointmentPosition[1])
        }
        setTime(((distanceUserRestau + distanceUserAppointment) / 5))
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

      const convertTime = (time) => {
        let hours = Math.floor(time / 60);
        let minutes = Math.trunc(time * 60);
        return `${hours}h ${minutes}min`;
      }

    return (
        <h4>Rendez-vous à 13h : tu dois partir {convertTime(time)} avant</h4>
    )
}

export default Appointment;