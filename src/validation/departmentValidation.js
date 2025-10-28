// departmentValidation.js
import * as Yup from "yup";
import messages from "../messages/validationMessages";

const validationSchema = Yup.object({
  department_name: Yup.string()
    .required(messages.department_name.required)
    .min(1, messages.department_name.minLength)
    .max(100, messages.department_name.maxLength),
});

export default validationSchema;
