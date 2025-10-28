import * as Yup from "yup";
import holidayMessages from "../messages/holidayMessages";

const holidayValidationSchema = Yup.object().shape({
  holiday_name: Yup.string()
    .required(holidayMessages.validation.holidayName.required)
    .min(3, holidayMessages.validation.holidayName.minLength),
  date: Yup.string()
    .required(holidayMessages.validation.date.required)
    .test(
      "is-valid-date",
      holidayMessages.validation.date.invalidFormat,
      (value) => {
        if (!value) return false; 
        const dateParts = value.split("-");
        if (dateParts.length !== 3) return false;
        const [year, month, day] = dateParts;
        return (
          year.length === 4 && 
          month.length === 2 &&
          day.length === 2 && 
          !isNaN(Date.parse(value))
        );
      }
    ),
});

export default holidayValidationSchema;