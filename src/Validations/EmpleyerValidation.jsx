import * as Yup from 'yup';

export  const EmployerValidation = Yup.object().shape({
    ci: Yup.string()
    .matches(
      /^\d{1,3}(\d{3})*$/,
      "Ingresar numeros de cedula"
    ),
    username: Yup.string()
      .min(2, 'Muy corto!')
      .max(20, 'Muy largo!'),
      password: Yup.string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Las contraseña debe tener al menos 8 caracteres, unas mayuscula, un numero y un caracter especial"
      ),
    email: Yup.string().email('email invalido'),
  });