import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import socketIO from 'socket.io-client';
import {useFormik} from "formik";
import {AddRoomValidationSchema} from "../../schemas/Home/AddRoomSchema";
import InputTextWithLabelFormik from "../../components/atoms/InputTextWithLabelFormik";
import ButtonWithOnClickAction from "../../components/atoms/ButtonWithOnClickAction";
import {toast, ToastContainer} from "react-toastify";

const socket = socketIO.connect('http://localhost:4000');

const Home = () => {
	const [userPosition, setUserPosition] = useState([0, 0])
	const [openModal, setOpenModal] = useState(false)
	const [rooms, setRooms] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setUserPosition([position.coords.latitude, position.coords.longitude])
		})
		socket.on('dataRoomResponse', (data) => setRooms(data))
		console.log(rooms)
	}, [socket, rooms])



	const onSubmit = (values) => {
		setOpenModal(!openModal)
		socket.emit('createRoom', {
			nameRoom: values.name,
			date: values.date,
			idRoom: rooms.length + 1,
		})
		toast.success('🔥 La room a bien été créée !')

		values.name = ""
		values.date= ""
	}

	const joinRoom = (roomId, roomName) => {
		socket.emit('onJoin', {
			idRoom: roomId,
			nameRoom: roomName,
			nameUser: localStorage.getItem('pseudo'),
			idUser: `${socket.id}${Math.random()}`,
			positionUser: userPosition,
			positionRestau: null,
		})
		navigate(`/map/${roomId}`)

	}

	const {handleChange, values, touched, errors, handleBlur, handleSubmit} = useFormik({
		initialValues: {
			name: "",
			date: "",
		}, validationSchema: AddRoomValidationSchema ,onSubmit,
	});

	return (
		<div className={"section-home"}>
			<h2>Liste des Room</h2>
			<section className={"section-home-container"}>
				<button onClick={() => setOpenModal(!openModal)}>Ajouter une room</button>
				{ rooms.length > 0 ?
					rooms.map((room) => {
						return (
							<div className={"section-home-container-room"} key={room.idRoom} onClick={() => joinRoom(room.idRoom, room.nameRoom)}>
								<h3>{room.nameRoom}</h3>
							</div>
						)
					})
					:
					<p>Il n'y a aucune room</p>
				}
			</section>

			{
				openModal && (
					<div className={"modal"}>
						<div className={"modal-container"}>
							<img src={"/images/black-cross.png"} onClick={()=> setOpenModal(!openModal)}/>
							<h3>Ajouter une Room</h3>
							<form onSubmit={handleSubmit}>
								<div className={"form-row-element form-row-single-element"}>
									<InputTextWithLabelFormik
										id={"name"}
										errorMessage={errors.name && touched.name &&
											<p className={"text-primary color-error"}>{errors.name}</p>}
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.name}
										label={"name"}
										placeholder={"name"}
										name={"name"}
										styleSelected={"input-text-custom-secondary " + (errors.name && touched.name ? "input-error" : "")}
									/>
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
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
};

export default Home;
