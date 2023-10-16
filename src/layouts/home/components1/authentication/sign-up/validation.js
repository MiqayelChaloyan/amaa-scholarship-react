import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string("Մուտքագրեք Ձեր անունը").required("Պահանջվում է անուն"),
  email: Yup.string("Մուտքագրեք Ձեր էլեկտրոնային հասցեն")
    .email("Մուտքագրեք վավեր Էլեկտրոնային հասցե")
    .required("Պահանջվում է էլ. փոստ"),
  password: Yup.string("Մուտքագրեք Ձեր գաղտնաբառը")
    .min(8, "Գաղտնաբառը պետք է լինի նվազագույնը 8 նիշի երկարությամբ")
    .required("Գաղտնաբառը պարտադիր է"),
  confimPwd: Yup.string()
    .required("Գաղտնաբառը պարտադիր է")
    .oneOf([Yup.ref("password")], "Գաղտնաբառը չի համապատասխանում"),
});

export default validationSchema;
