import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
  pseudonyme: Yup.string()
    .min(3, 'Minimum 3 caractères')
    .required('Veuillez entrer un pseudonyme'),
})