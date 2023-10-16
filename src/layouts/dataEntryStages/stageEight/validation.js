import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  expects_letters: Yup.number().required("Պարտադիր լրացվող դաշտ"),
  expects_pastors: Yup.number().required("Պարտադիր լրացվող դաշտ"),
});

export default validationSchema;
