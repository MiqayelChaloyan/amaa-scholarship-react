import * as Yup from "yup";

const validationSchema = Yup.object({
  jobs_services: Yup.string()
    .max(300, "Դաշտը պետք է լինի առավելագույնը 300 նիշ")
    .min(5, "Դաշտը պետք է լինի ամենաքիչը 5 նիշ"),
  hobbies: Yup.string()
    .max(300, "Դաշտը պետք է լինի առավելագույնը 300 նիշ")
    .min(5, "Դաշտը պետք է լինի ամենաքիչը 5 նիշ"),
  about_yourself: Yup.string()
    .max(300, "Դաշտը պետք է լինի առավելագույնը 300 նիշ")
    .min(5, "Դաշտը պետք է լինի ամենաքիչը 5 նիշ"),
  prev_request: Yup.string().required("Պարտադիր լրացվող դաշտ"),
  learned_source: Yup.string()
    .max(300, "Դաշտը պետք է լինի առավելագույնը 300 նիշ")
    .min(5, "Դաշտը պետք է լինի ամենաքիչը 5 նիշ"),
});

export default validationSchema;
