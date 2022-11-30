import React, {useEffect, useState} from 'react';
import Chatbox from './partials/Chatbox';
import ListRestaurant from './partials/ListRestaurant';
import ListUser from './partials/ListUser';
import MapLeaflet from './partials/MapLeaflet';
import socketIO from 'socket.io-client';
import {useParams} from "react-router-dom";
import { Appointment } from './partials/Appointment';
const socket = socketIO.connect('http://localhost:4000');

const Map = () =>  {
  const {id} = useParams()
  const [room, setRoom] = useState([])
  const [dataRoom, setDataRoom] = useState([])
  useEffect(() => {
    socket.on('dataRoomResponse', (data) => setDataRoom(data))
    setRoom(dataRoom.filter(room => room.idRoom === parseInt(id)))
  }, [socket, dataRoom])

  return (
    <div className={'section-map-container'} >
      <Appointment room={room} />
      <ListRestaurant />
      <MapLeaflet room={room}/>
      <div className='container-right'>
        <button className='button-leave'>QUITTER</button>
        <ListUser room={room} />
        <Chatbox />
      </div>
    </div>
  )
};

export default Map;
