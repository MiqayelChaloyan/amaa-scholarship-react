import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  education_history: Yup.array().of(
    Yup.object().shape({
      institution_name: Yup.string().required("Պարտադիր լրացվող դաշտ"),
      years: Yup.string().required("Պարտադիր լրացվող դաշտ"),
      diploma: Yup.string().required("Պարտադիր լրացվող դաշտ"),
    })
  ),
  university_name: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  university_department: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ")
    .nullable(),
  university_adress: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ")
    .nullable(),
  university_phone: Yup.string()
    .matches(/^[0-9_-]+$/, "Ճիշտ ձևաչափով չէ")
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ")
    .nullable(),
  university_fee_text: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ")
    .nullable(),
  university_fee_number: Yup.number()
    .typeError("Դաշտը պետք է լինի թիվ")
    .required("Պարտադիր լրացվող դաշտ"),
  help_parents_number: Yup.number().typeError("Դաշտը պետք է լինի թիվ"),
  help_job_number: Yup.number().typeError("Դաշտը պետք է լինի թիվ"),
  help_other_number: Yup.number().typeError("Դաշտը պետք է լինի թիվ"),
});

export default validationSchema;
