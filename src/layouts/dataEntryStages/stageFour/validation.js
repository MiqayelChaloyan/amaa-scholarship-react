import * as Yup from "yup";

const validationSchema = Yup.object({
  finance_information: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Պարտադիր լրացվող դաշտ"),
      conection: Yup.string().required("Պարտադիր լրացվող դաշտ"),
      job_education_info: Yup.string().required("Պարտադիր լրացվող դաշտ"),
      income_fee: Yup.string().required("Պարտադիր լրացվող դաշտ"),
      education_fee: Yup.string().required("Պարտադիր լրացվող դաշտ"),
      phone: Yup.number().typeError("Արժեքը պետք է լինի թիվ").required("Պարտադիր լրացվող դաշտ"),
      other_info: Yup.string().required("Պարտադիր լրացվող դաշտ"),
    })
  ),
  prev_revenue: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  other_finance: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  another_part: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  prev_summer: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  next_summer: Yup.string()
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .min(2, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
});

export default validationSchema;
