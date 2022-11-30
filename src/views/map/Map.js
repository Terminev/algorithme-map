import React, {useEffect, useState} from 'react';
import Chatbox from './partials/Chatbox';
import MapLeaflet from './partials/MapLeaflet';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const Map = () => {
  const [dataRoom, setDataRoom] = useState([])

  useEffect(() => {
    socket.on('dataRoomResponse', (data) => setDataRoom(data))
  }, [socket, dataRoom])

  return(
    <div>
      <MapLeaflet dataRoom={dataRoom}/>
      {/* <Chatbox /> */}
    </div>
  )

};

export default Map;
