import * as Yup from 'yup';

export const ProjectValidation = Yup.object().shape({

  company: Yup.string()
    .required('Elija una emresa cliente para la tarea'),


});