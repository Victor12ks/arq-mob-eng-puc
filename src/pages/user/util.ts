import * as yup from "yup";

export const schemaRegister = yup.object({
  firstName: yup
    .string()
    .required("Primeiro Nome é obrigatório")
    .min(3, "Informe no minimo 3 digitos"),
  lastName: yup
    .string()
    .required("Segundo Nome é obrigatório")
    .min(3, "Informe no minimo 3 digitos"),
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .min(6, "Informe no minimo 6 digitos")
    .email("E-mail informado não é valido"),
  postalCode: yup.string().required("CEP é obrigatório"),
  street: yup.string().required("Rua é obrigatório"),
  number: yup.string().required("Número é obrigatório"),
  district: yup.string().required("Bairro é obrigatório"),
  city: yup.string().required("Cidade é obrigatório"),
  state: yup.string().required("Estado é obrigatório"),
});
