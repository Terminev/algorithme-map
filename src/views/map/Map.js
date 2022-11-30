import React, {useEffect, useState} from 'react';
import Chatbox from './partials/Chatbox';
import ListRestaurant from './partials/ListRestaurant';
import ListUser from './partials/ListUser';
import MapLeaflet from './partials/MapLeaflet';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const Map = () =>  {
  const [dataRoom, setDataRoom] = useState([])
  useEffect(() => {
    socket.on('dataRoomResponse', (data) => setDataRoom(data))
  }, [socket, dataRoom])

  return (
    <div className={'section-map-container'} >
      <h4>Rendez-vous à 13h : tu dois partir à 8h</h4>
      <ListRestaurant />
      <MapLeaflet dataRoom={dataRoom}/>
      <div className='container-right'>
        <button className='button-leave'>QUITTER</button>
        <ListUser />
        <Chatbox />
      </div>
    </div>
  )


};

export default Map;
