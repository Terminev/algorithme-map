import React from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const Home = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate()

  const fakeData = [
    {
      id: 1,
      name: "room 1",
    },
    {
      id: 2,
      name: "room 2",
    },
    {
      id: 3,
      name: "room 3",
    },
    {
      id: 4,
      name: "room 4",
    },
    {
      id: 5,
      name: "room 5",
    },
    {
      id: 6,
      name: "room 6",
    }
    ]

    const joinRoom = (roomId, roomName) => {
      console.log('room')
      socket.emit('onJoin', {
        idRoom : roomId,
        nameRoom : roomName,
        nameUser: localStorage.getItem('pseudo'),
        idUser: `${socket.id}${Math.random()}`,
        // positionUser: ,
        // positionRestau: ,
      })
    }

  return (
    <div className={"section-home"}>
      <h2>Liste des Room</h2>
      <section className={"section-home-container"}>
        {
          fakeData.map((room) => {
            return (
              <div className={"section-home-container-room"} key={room.id} onClick={() => joinRoom(room.id, room.name)}>
                    <h3>{room.name}</h3>
              </div>
            )
          })
        }
      </section>
    </div>
  );
};

export default Home;
