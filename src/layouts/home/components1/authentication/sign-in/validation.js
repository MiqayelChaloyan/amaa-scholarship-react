import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string("Մուտքագրեք Ձեր էլեկտրոնային հասցեն").required(
    "Խնդրում ենք մուտքագրել Ձեր էլ. փոստը"
  ),
  password: Yup.string("Մուտքագրեք Ձեր գաղտնաբառը").required(
    "Խնդրում ենք մուտքագրել Ձեր գաղտնաբառը"
  ),
});

export default validationSchema;
