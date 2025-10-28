import * as Yup from "yup";
import employeeDetailMessages from "../messages/employeeDetailMessages";

export const changePhotoValidationSchema = Yup.object().shape({
  fileField: Yup.mixed()
    .required(employeeDetailMessages.validation.required)
    .test(
      "fileFormat",
      employeeDetailMessages.validation.fileFormat,
      (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    ),
});