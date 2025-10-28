import * as yup from "yup";
import messages from "../messages/validationMessages";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required(messages.username.required)
    .min(7, messages.username.minLength) // Menambahkan batasan angka
    .max(20, messages.username.maxLength), // Menambahkan batasan angka
  password: yup
    .string()
    .required(messages.password.required)
    .min(8, messages.password.minLength) // Menambahkan batasan angka
    .max(50, messages.password.maxLength), // Menambahkan batasan angka
});

export default loginSchema;
