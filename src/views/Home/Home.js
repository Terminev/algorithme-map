import React from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";

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

  return (
    <div className={"section-home"}>
      <h2>Liste des Room</h2>
      <section className={"section-home-container"}>
        {
          fakeData.map((room) => {
            return (
              <div className={"section-home-container-room"}>
                <Link to={`/room/${room.id}`} key={room.id}>
                    <h3>{room.name}</h3>
                </Link>
              </div>
            )
          })
        }
      </section>
    </div>
  );
};

export default Home;
