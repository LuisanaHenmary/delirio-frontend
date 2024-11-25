import * as Yup from 'yup';

export  const CompanyValidation = Yup.object().shape({
    nit: Yup.string()
    .matches(
      /^\d{1,3}(\d{3})*$/,
      "Ingresar numeros del nit"
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