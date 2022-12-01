import * as Yup from 'yup';

export const AddRoomValidationSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Minimum 3 caractères')
		.required('Veuillez entrer un nom pour la room'),
	date: Yup.string()
		.required('Veuillez entrer une date'),
})