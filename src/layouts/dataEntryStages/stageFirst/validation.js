import * as Yup from "yup";

// const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(40, "Անունը պետք է լինի առավելագույնը 40 նիշ")
    .min(2, "Դաշտը պարտադիր է")
    .required("Պարտադիր լրացվող դաշտ"),
  lastName: Yup.string().max(40).min(2, "Դաշտը պարտադիր է").required("Պարտադիր լրացվող դաշտ"),
  family: Yup.string().max(40).min(2, "Դաշտը պարտադիր է").required("Պարտադիր լրացվող դաշտ"),
  fullNameLatin: Yup.string().max(100).min(2, "Դաշտը պարտադիր է").required("Պարտադիր լրացվող դաշտ"),
  passportNumber: Yup.string()
    .max(9, "Անձնագրի համարը պետք է լինի առավելագույնը 9 նիշ")
    .matches(/^[A-Z0-9_-]+$/, "Ճիշտ ձևաչափով չէ")
    .required("Պարտադիր լրացվող դաշտ"),
  social_card: Yup.string()
    .max(15, "Սոցիալական քարտի համարը պետք է լինի առավելագույնը 15 նիշ")
    .matches(/^[0-9_-]+$/, "Ճիշտ ձևաչափով չէ")
    .required("Պարտադիր լրացվող դաշտ"),
  country: Yup.string().required("Պարտադիր լրացվող դաշտ"),
  region: Yup.string().required("Պարտադիր լրացվող դաշտ"),
  cityVillage: Yup.string().required("Պարտադիր լրացվող դաշտ"),
  address: Yup.string().required("Պարտադիր լրացվող դաշտ"),
  phone: Yup.string()
    .matches(/[0-9]/, "Հեռախոսահամարը վավեր չէ (0xx xx xx xx ):")
    .min(9, "Շատ կարճ է")
    .max(9, "Չափազանց երկար է")
    .required("Պարտադիր լրացվող դաշտ"),
  mobile: Yup.string().matches(/[0-9]/, "Հեռախոսահամարը վավեր չէ (0xx xx xx xx ):"),
  email: Yup.string("Մուտքագրեք ձեր Էլեկտրոնային Հասցեն")
    .email("Մուտքագրեք վավեր Էլեկտրոնային Հասցե")
    .required("Պարտադիր լրացվող դաշտ"),
  birthday: Yup.date()
    .nullable()
    .min(new Date("1955-01-24"), "Պարտադիր լրացվող դաշտ")
    .max(new Date(), "Պարտադիր լրացվող դաշտ")
    .required("Պարտադիր լրացվող դաշտ"),
  gender: Yup.string().required("Պարտադիր լրացվող դաշտ"),
  marriage_status: Yup.string().required("Պարտադիր լրացվող դաշտ"),
});

export default validationSchema;
