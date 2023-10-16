import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  participateVolunteering: Yup.string().required("A radio option is required"),
  detailAboutVolunteering: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(0, "Դաշտը պետք է լինի նվազագույնը 0 նիշ"),
  interestedVolunteeringAMAADetails: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(3, "Դաշտը պետք է լինի նվազագույնը 3 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  participateInternshipProgram: Yup.string().required("A radio option is required"),
  detailAboutInternship: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(0, "Դաշտը պետք է լինի նվազագույնը 0 նիշ"),
  interestedInternshipAMAADetails: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(3, "Դաշտը պետք է լինի նվազագույնը 3 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  plansForNext5years: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(3, "Դաշտը պետք է լինի նվազագույնը 3 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  readyRealizeGoals: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(3, "Դաշտը պետք է լինի նվազագույնը 3 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  requiredLifeSkills: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(3, "Դաշտը պետք է լինի նվազագույնը 3 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  participateAMAALifeSkillsCourse: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(3, "Դաշտը պետք է լինի նվազագույնը 3 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
  organizeProCommunityActivitie: Yup.string()
    .max(500, "Դաշտը պետք է լինի առավելագույնը 500 նիշ")
    .min(3, "Դաշտը պետք է լինի նվազագույնը 3 նիշ")
    .required("Պարտադիր լրացվող դաշտ"),
});

export default validationSchema;
