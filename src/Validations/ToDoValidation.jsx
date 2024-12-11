import * as Yup from 'yup';

export const ToDoValidation = Yup.object().shape({
  employer: Yup.string()
    .required('Elija un empleado para la tarea'),
  company: Yup.string()
    .required('Elija una emresa cliente para la tarea'),
  project: Yup.string()
    .required('Elija un proyecto cliente para la tarea y si no hay opciones, registre un proyecto para dicho cliente'),


});