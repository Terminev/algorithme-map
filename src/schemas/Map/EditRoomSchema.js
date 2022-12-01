import * as Yup from 'yup';

export const EditRoomValidationSchema = Yup.object().shape({
	date: Yup.string()
		.required('Veuillez entrer une date'),
})