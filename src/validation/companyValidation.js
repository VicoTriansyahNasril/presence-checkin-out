import * as Yup from "yup";
import dayjs from "dayjs";
import messages from "../messages/validationMessages";

const validationSchema = Yup.object().shape({
  company_name: Yup.string()
    .required(messages.company_name.required)
    .min(3, messages.company_name.minLength),

  email: Yup.string()
    .email(messages.email.invalid)
    .required(messages.email.required),

  phone: Yup.string()
    .matches(/^[0-9]+$/, messages.phone.digitsOnly)
    .min(10, messages.phone.minLength)
    .max(15, messages.phone.maxLength)
    .required(messages.phone.required),

  address: Yup.string().required(messages.address.required),

  latitude: Yup.number()
    .min(-90, messages.address.latitude)
    .max(90, messages.address.latitude),

  longitude: Yup.number()
    .min(-180, messages.address.longitude)
    .max(180, messages.address.longitude),

  state: Yup.string().required(messages.state.required),

  city: Yup.string().required(messages.city.required),

  zip_code: Yup.string()
    .matches(/^[0-9]+$/, messages.zip_code.digitsOnly)
    .min(5, messages.zip_code.minLength)
    .max(10, messages.zip_code.maxLength)
    .required(messages.zip_code.required),

  joining_date: Yup.date()
    .required(messages.joining_date.required)
    .max(dayjs(), messages.joining_date.max),
});

export default validationSchema;
