import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string("Մուտքագրեք ձեր գաղտնաբառը")
    .min(8, "Գաղտնաբառը պետք է լինի նվազագույնը 8 նիշի երկարությամբ")
    .required("Գաղտնաբառը պարտադիր է"),
  confimPwd: Yup.string("Մուտքագրեք ձեր գաղտնաբառը")
    .required("Գաղտնաբառը պարտադիր է")
    .oneOf([Yup.ref("password")], "Գաղտնաբառը չի համապատասխանում"),
});

export default validationSchema;
