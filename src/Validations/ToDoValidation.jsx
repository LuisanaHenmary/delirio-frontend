import * as Yup from 'yup';

export const ToDoValidation = Yup.object().shape({
  employer: Yup.string()
    .required('Elija un empleado para la tarea'),
  company: Yup.string()
    .required('Elija una empresa cliente para la tarea'),
  to_do_type: Yup.string()
    .required('Elija un tipo de tarea'),


});