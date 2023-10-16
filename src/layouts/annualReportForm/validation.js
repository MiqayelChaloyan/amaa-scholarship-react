import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  course: Yup.number()
    .typeError("Դաշտը պետք է լինի թիվ")
    .min(1, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(100, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  semesterAverageQualityScore: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  annualAverageQualityScore: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  professionalLiterature: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  professionalKnowledge: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  jobProspect: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  volunteeringOrOther: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  personalGrowth: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  skillGrowth: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  usefullInitiative: Yup.string()
    .min(3, "Դաշտը պետք է լինի նվազագույնը 2 նիշ")
    .max(500, "Դաշտը պետք է լինի առավելագույնը 100 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
});

export default validationSchema;
