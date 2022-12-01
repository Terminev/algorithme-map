import React, {useEffect, useState} from 'react';
import Chatbox from './partials/Chatbox';
import ListRestaurant from './partials/ListRestaurant';
import ListUser from './partials/ListUser';
import MapLeaflet from './partials/MapLeaflet';
import {useNavigate, useParams} from "react-router-dom";
import {Appointment} from './partials/Appointment';
import socketIO from 'socket.io-client';
import InputTextWithLabelFormik from "../../components/atoms/InputTextWithLabelFormik";
import ButtonWithOnClickAction from "../../components/atoms/ButtonWithOnClickAction";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {EditRoomValidationSchema} from "../../schemas/Map/EditRoomSchema";

const socket = socketIO.connect('http://localhost:4000');

const Map = () =>  {
  const navigate = useNavigate();
  const {id} = useParams()
  const [openModal, setOpenModal] = useState(false)
  const [room, setRoom] = useState([])
  const [dataRoom, setDataRoom] = useState([])


  useEffect(() => {
    socket.on('dataRoomResponse', (data) => setDataRoom(data))
    setRoom(dataRoom.filter(room => room.idRoom === parseInt(id)))
  }, [socket, dataRoom])
  const leaveRoom = () => {
    socket.emit('leaveRoom', {
      idRoom: parseInt(id),
      nameUser: localStorage.getItem('pseudo')
    })
    navigate('/', { replace: true });
  }

  const onSubmit = (values) => {
    setOpenModal(!openModal)
    socket.emit('editRoom', {
      date: values.date,
      idRoom: parseInt(id),
    })
    toast.success('🔥 Le rendez vous a été modifié !')

    values.date= ""
  }

  const {handleChange, values, touched, errors, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      date: ""
    }, validationSchema: EditRoomValidationSchema ,onSubmit,
  });

  return (
    <div className={'section-map-container'} >
      <Appointment room={room} />
      <ListRestaurant />
      <MapLeaflet room={room}/>
      <div className='container-right'>
        <button className='button-leave' onClick={() => leaveRoom()}>
            <img src={'../images/exit.png'} />
        </button>
        <button className='button-setting' onClick={() => setOpenModal(!openModal)}>
          <img src={'../images/setting.png'} />
        </button>
        <ListUser room={room} />
        <Chatbox room={room} />
      </div>
      {
        openModal && (
          <div className={"modal"}>
            <div className={"modal-container"}>
              <img src={"/images/black-cross.png"} onClick={()=> setOpenModal(!openModal)}/>
              <h3>Editer l'heure de rendez-vous</h3>
              <form onSubmit={handleSubmit}>
                <div className={"form-row-element form-row-single-element"}>
                  <input
                    type="time"
                    id={"date"}
                    name={"date"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date}
                    label={"date"}
                    placeholder={"date"}
                  />

                </div>
                <ButtonWithOnClickAction
                  title={"Suivant"}
                  isActive={true}
                  styleButton={"btn-default btn-default-primary color-primary btn-default-full-width"}
                />
              </form>
            </div>
          </div>
        )
      }
    </div>
  )
};

export default Map;
