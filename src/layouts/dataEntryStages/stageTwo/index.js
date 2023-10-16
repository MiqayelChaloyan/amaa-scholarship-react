/* eslint-disable no-underscore-dangle */
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react hooks
import React, { useState, useEffect } from "react";

import MDBox from "components/MDBox";

// @mui material components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";

// @mui material icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { getApplicationById, changeApplication } from "hooks/allRequests/applicationApis";

// Validation schema
import { useFormik, FormikProvider, FieldArray, ErrorMessage } from "formik";
import validationSchema from "./validation";

import { optionsInstitutions, optionsUnit } from "./data";

import arrowIcon from "../../../assets/images/home-images/arrowDown.png";

function stageTwo({ handleNext, handleCancel }) {
  const [valueA, setInputRatingsLastYear0] = useState("");
  const [valueAError, setValueAError] = useState({ required: "", error: "" });
  const [valueB, setOptionRatingsLastYear0] = useState("");

  const [valueC, setInputRatingsLastYear1] = useState("");
  const [valueCError, setValueCError] = useState({ required: "", error: "" });
  const [valueD, setOptionRatingsLastYear1] = useState("");

  const [valueE, setInputRatingsLastYear2] = useState("");
  const [valueEError, setValueEError] = useState({ required: "", error: "" });
  const [valueF, setOptionRatingsLastYear2] = useState("");

  const [createInputField, setCreateInputField] = useState(false);
  // To get the id of education_history
  const [counterInstitutionId, setCounterInstitutionId] = useState(0);
  const [application, setApplication] = useState({});

  const formik = useFormik({
    initialValues: {
      education_history: [{ institution_name: "", years: "", diploma: "" }],
      rewards: "",
      university_name: "",
      university_department: "",
      other_university: "",
      university_adress: "",
      university_phone: "",
      university_fee_text: "",
      university_fee_number: "",
      help_parents_text: "",
      help_parents_number: "",
      help_job_text: "",
      help_job_number: "",
      help_other_text: "",
      help_other_number: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      if (!valueA || !valueB) {
        setValueAError({ ...valueAError, required: true });
      }
      if (!valueC || !valueD) {
        setValueCError({ ...valueCError, required: true });
      }
      if (!valueE || !valueF) {
        setValueEError({ ...valueCError, required: true });
      }
      if (
        valueA &&
        valueB &&
        valueC &&
        valueD &&
        valueE &&
        valueF &&
        !valueAError.error &&
        !valueCError.error &&
        !valueEError.error
      ) {
        const body = {
          education: { ...data, education_history: JSON.stringify(data.education_history) },
        };
        if (data.other_university) {
          body.university_name = data.other_university;
        }
        const createdApp = await changeApplication({ body, appId: application._id });
        if (createdApp) {
          handleNext();
        }
      }
    },
  });

  // Dependent Fields
  useEffect(() => {
    let isCurrent = true;
    if (valueA.trim() !== "" && valueB.trim() !== "" && valueA && valueB) {
      if (isCurrent) {
        formik.setFieldValue("ratings_last_year", `${valueA} / ${valueB}`);
      }
    }
    return () => {
      isCurrent = false;
    };
  }, [valueA, valueB, formik.handleChange]);

  useEffect(() => {
    let isCurrent = true;
    if (valueC.trim() !== "" && valueD.trim() !== "" && valueC && valueD) {
      if (isCurrent) {
        formik.setFieldValue("ratings_year_before", `${valueC} / ${valueD}`);
      }
    }
    return () => {
      isCurrent = false;
    };
  }, [valueC, valueD, formik.handleChange]);

  useEffect(() => {
    let isCurrent = true;
    if (valueE.trim() !== "" && valueF.trim() !== "" && valueE && valueF) {
      if (isCurrent) {
        formik.setFieldValue("ratings_school", `${valueE} / ${valueF}`);
      }
    }
    return () => {
      isCurrent = false;
    };
  }, [valueE, valueF, formik.handleChange]);
  //

  // To get the id of education_history
  useEffect(() => {
    setCounterInstitutionId((count) => count + 1);
  }, [formik.values.education_history.length]);

  const createInput = () =>
    formik.values.university_name === "Այլ"
      ? setCreateInputField(true)
      : setCreateInputField(false);

  useEffect(() => {
    createInput();
  }, [formik.values.university_name]);

  useEffect(async () => {
    const appId = localStorage.getItem("applicationId");
    const foundApplication = await getApplicationById({ appId });
    if (foundApplication) {
      setApplication(foundApplication);
      const educationHistory = JSON.parse(foundApplication.education.education_history);
      if (educationHistory) {
        formik.setFieldValue(
          "education_history",
          foundApplication.education.education_history ? educationHistory : ""
        );
      }
      formik.setFieldValue(
        "rewards",
        foundApplication.education.rewards ? foundApplication.education.rewards : ""
      );
      setInputRatingsLastYear0(
        foundApplication.education.ratings_last_year
          ? foundApplication.education.ratings_last_year?.split(" / ")[0]
          : ""
      );
      setOptionRatingsLastYear0(
        foundApplication.education.ratings_last_year
          ? foundApplication.education.ratings_last_year?.split(" / ")[1]
          : ""
      );
      setInputRatingsLastYear1(
        foundApplication.education.ratings_year_before
          ? foundApplication.education.ratings_year_before?.split(" / ")[0]
          : ""
      );
      setOptionRatingsLastYear1(
        foundApplication.education.ratings_year_before
          ? foundApplication.education.ratings_year_before?.split(" / ")[1]
          : ""
      );
      setInputRatingsLastYear2(
        foundApplication.education.ratings_school
          ? foundApplication.education.ratings_school?.split(" / ")[0]
          : ""
      );
      setOptionRatingsLastYear2(
        foundApplication.education.ratings_school
          ? foundApplication.education.ratings_school?.split(" / ")[1]
          : ""
      );
      formik.setFieldValue(
        "university_name",
        foundApplication.education.university_name ? foundApplication.education.university_name : ""
      );
      formik.setFieldValue(
        "university_department",
        foundApplication.education.university_department
          ? foundApplication.education.university_department
          : ""
      );
      formik.setFieldValue(
        "university_adress",
        foundApplication.education.university_adress
          ? foundApplication.education.university_adress
          : ""
      );
      formik.setFieldValue(
        "university_phone",
        foundApplication.education.university_phone
          ? foundApplication.education.university_phone
          : ""
      );
      formik.setFieldValue(
        "university_fee_text",
        foundApplication.education.university_fee_text
          ? foundApplication.education.university_fee_text
          : ""
      );
      formik.setFieldValue(
        "university_fee_number",
        foundApplication.education.university_fee_number
          ? foundApplication.education.university_fee_number
          : ""
      );
      formik.setFieldValue(
        "university_fee_text",
        foundApplication.education.university_fee_text
          ? foundApplication.education.university_fee_text
          : ""
      );
      formik.setFieldValue(
        "help_parents_text",
        foundApplication.education.help_parents_text
          ? foundApplication.education.help_parents_text
          : ""
      );
      formik.setFieldValue(
        "help_parents_number",
        foundApplication.education.help_parents_number
          ? foundApplication.education.help_parents_number
          : ""
      );
      formik.setFieldValue(
        "help_job_text",
        foundApplication.education.help_job_text ? foundApplication.education.help_job_text : ""
      );
      formik.setFieldValue(
        "help_job_number",
        foundApplication.education.help_job_number ? foundApplication.education.help_job_number : ""
      );
      formik.setFieldValue(
        "help_other_text",
        foundApplication.education.help_other_text ? foundApplication.education.help_other_text : ""
      );
      formik.setFieldValue(
        "help_other_number",
        foundApplication.education.help_other_number
          ? foundApplication.education.help_other_number
          : ""
      );
    }
  }, []);

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      height="100%"
      marginBottom="50px"
    >
      <Grid
        container
        sx={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox
          sx={{
            width: { md: "990px", sm: "300px", xs: "300px" },
          }}
          mx={2}
          my={2}
          pt={6}
          pb={8}
        >
          <Grid container spacing={1} sx={{ marginBottom: "20px" }}>
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    width: { md: "998px", sm: "320px", xs: "320px" },
                    color: "#002B4D",
                    marginBottom: "20px",
                  }}
                >
                  Կրթություն
                </Typography>
                <Grid container spacing={1} sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      width: { md: "998px", sm: "320px", xs: "320px" },
                      color: "#002B4D",
                      marginBottom: "10px",
                      marginLeft: "7px",
                    }}
                  >
                    1. Կրթական հաստատություններ *
                  </Typography>
                  <Grid container item spacing={3}>
                    <Grid item xs={7} md={5}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          width: { md: "360px", sm: "320px", xs: "320px" },
                          color: "#667F94",
                          fontSize: "12px",
                          marginTop: "10px",
                          lineHeight: 1.5,
                          marginBottom: "5px",
                        }}
                      >
                        Նշեք ձեր հաճախած դպրոցի, քոլեջի, և համալսարանի անունը: Սկսեք առաջին կրթական
                        հաստատությունից:
                      </Typography>
                    </Grid>
                    <Grid item xs={7} md={3}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          width: { md: "100px", sm: "320px", xs: "320px" },
                          color: "#667F94",
                          fontSize: "12px",
                          marginTop: "10px",
                          lineHeight: 1.5,
                          marginBottom: "5px",
                        }}
                      >
                        Հաճախումների տարեթվեր:
                      </Typography>
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          width: { md: "200px", sm: "320px", xs: "320px" },
                          color: "#667F94",
                          fontSize: "12px",
                          marginTop: "10px",
                          lineHeight: 1.5,
                          marginBottom: "5px",
                        }}
                      >
                        Ստացած դիպլոմը կամ աստիճանը:
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <FieldArray
                  name="education_history"
                  render={(arrayHelpers) => (
                    <div>
                      {formik.values.education_history.length >= 1 &&
                        formik.values.education_history.map((institution, index) => (
                          <div
                            key={institution.id}
                            style={{
                              marginBottom: "15px",
                            }}
                          >
                            <Grid
                              container
                              item
                              spacing={3}
                              sx={{
                                marginBottom: "30px",
                              }}
                            >
                              <Grid item xs={7} md={5}>
                                <TextField
                                  sx={{
                                    width: { md: "407px", sm: "320px", xs: "320px" },
                                    borderRadius: "10px",
                                    "& fieldset": {
                                      border: "none",
                                    },
                                  }}
                                  inputProps={{
                                    style: {
                                      color: "black",
                                      background: "#FFFFFF",
                                      borderRadius: "10px",
                                    },
                                  }}
                                  error={!!formik.values.education_history[index].institution_name}
                                  id={`education_history[${index}].institution_name`}
                                  name={`education_history[${index}].institution_name`}
                                  value={formik.values.education_history[index].institution_name}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`education_history[${index}].institution_name`}
                                  render={(massege) => (
                                    <p
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                        marginTop: "5px",
                                        marginLeft: "8px",
                                      }}
                                    >
                                      {massege}
                                    </p>
                                  )}
                                />
                              </Grid>
                              <Grid item xs={7} md={3}>
                                <TextField
                                  sx={{
                                    color: "black",
                                    width: { md: "235px", sm: "320px", xs: "320px" },
                                    lineHeight: "3.1em",
                                    borderRadius: "10px",
                                    background: "#FFFFFF",
                                    "& fieldset": {
                                      borderRadius: "10px",
                                      border: "none",
                                    },
                                  }}
                                  error={!!formik.values.education_history[index].years}
                                  id={`institution.${index}.years`}
                                  name={`education_history.${index}.years`}
                                  value={formik.values.education_history[index].years}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`education_history[${index}].years`}
                                  render={(massege) => (
                                    <p
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                        marginTop: "5px",
                                        marginLeft: "8px",
                                      }}
                                    >
                                      {massege}
                                    </p>
                                  )}
                                />
                              </Grid>
                              <Grid item xs={7} md={4}>
                                <TextField
                                  sx={{
                                    width: { md: "320px", sm: "320px", xs: "320px" },
                                    borderRadius: "10px",
                                    "& fieldset": {
                                      border: "none",
                                    },
                                  }}
                                  inputProps={{
                                    style: {
                                      color: "black",
                                      background: "#FFFFFF",
                                      borderRadius: "10px",
                                    },
                                  }}
                                  error={!!formik.values.education_history[index].diploma}
                                  id={`education_history.${index}.diploma`}
                                  name={`education_history.${index}.diploma`}
                                  value={formik.values.education_history[index].diploma}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`education_history[${index}].diploma`}
                                  render={(massege) => (
                                    <p
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                        marginTop: "5px",
                                        marginLeft: "8px",
                                      }}
                                    >
                                      {massege}
                                    </p>
                                  )}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            id: counterInstitutionId,
                            institution_name: "",
                            years: "",
                            diploma: "",
                          });
                        }}
                        sx={{
                          backgroundColor: "#002B4D !important",
                          color: "#FFFFFF !important",
                          width: "150px",
                          height: "40px",
                          fontSize: "14px !important",
                          border: "1px solid #002B4D !important",
                          borderRadius: "10px !important",
                          textTransform: "none",
                          marginBottom: "30px",
                          marginRight: "10px",
                        }}
                      >
                        <AddIcon style={{ width: "22px", height: "22px", margin: "3px" }} />
                        Ավելացնել
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          if (arrayHelpers.form.values.education_history.length > 1)
                            arrayHelpers.pop();
                        }}
                        sx={{
                          backgroundColor: "#002B4D !important",
                          color: "#FFFFFF !important",
                          width: "150px",
                          height: "40px",
                          fontSize: "14px !important",
                          border: "1px solid #002B4D !important",
                          borderRadius: "10px !important",
                          textTransform: "none",
                          marginBottom: "30px",
                        }}
                      >
                        <RemoveIcon style={{ width: "22px", height: "22px", margin: "3px" }} />
                        Հեռացնել
                      </Button>
                    </div>
                  )}
                />

                <Grid container item spacing={3} sx={{ marginBottom: "20px" }}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "10px",
                      }}
                    >
                      2. Նշեք, թե ինչ ուսումնական կամ արտաուսումնական պարգևատրումների եք արժանացել
                      դպրոցում կամ դպրոցից դուրս:
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="rewards"
                      name="rewards"
                      value={formik.values.rewards}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3} sx={{ marginBottom: "20px" }}>
                  <Grid item xs={7} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "10px",
                      }}
                    >
                      3. Գնահատականներ*
                    </Typography>
                  </Grid>
                  <Grid item xs={7} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "900px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: 0,
                        lineHeight: 1.5,
                        marginBottom: "20px",
                      }}
                    >
                      Ըստ Ձեր համալսարանի/դպրոցի բալային համակարգի ընտրել գնահատականը (Սյունակի աջ
                      մասից ընտրել բալային համակարգը ձախից Ձեր գնահատականը):
                    </Typography>
                  </Grid>
                  {/* {"-------Անցյալ տարի------"} */}
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "10px",
                        fontSize: "18px",
                        marginTop: "5px",
                      }}
                    >
                      Անցյալ տարի
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <TextField
                      type="number"
                      sx={{
                        width: { md: "112px", sm: "112px", xs: "112px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="ratings_last_year"
                      name="ratings_last_year"
                      placeholder="123"
                      variant="outlined"
                      value={valueA}
                      onChange={(event) => {
                        setInputRatingsLastYear0(event.target.value);
                        if (valueB && +event.target.value && +event.target.value > +valueB) {
                          setValueAError({
                            required: false,
                            error: `Պետք է լինի ${valueB}-ից փոքր։`,
                          });
                        } else if (!event.target.value) {
                          setValueAError({
                            error: "",
                            required: true,
                          });
                        } else {
                          setValueAError({
                            required: false,
                            error: "",
                          });
                        }
                      }}
                    />
                    {" / "}
                    <Box
                      component="img"
                      right={{
                        xs: "-9px",
                        sm: "-9px",
                        lg: "55px",
                        md: "55px",
                        xl: "55px",
                      }}
                      sx={{
                        width: "20px",
                        position: "absolute",
                        top: "35px",
                        zIndex: 1,
                      }}
                      alt="icon"
                      src={`${arrowIcon}`}
                    />
                    <FormControl>
                      <Select
                        sx={{
                          color: "black",
                          width: { md: "112px", sm: "112px", xs: "112px" },
                          lineHeight: "3.1em",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                        }}
                        id="ratings_last_year"
                        name="ratings_last_year"
                        value={valueB}
                        onChange={(event) => {
                          setOptionRatingsLastYear0(event.target.value);
                          if (valueA && +event.target.value < +valueA) {
                            setValueAError({
                              required: false,
                              error: `Պետք է լինի ${event.target.value}-ից փոքր։`,
                            });
                          } else {
                            setValueAError({
                              required: false,
                              error: "",
                            });
                          }
                        }}
                      >
                        {optionsUnit.map((option) => (
                          <MenuItem key={option.id} value={option.value} disabled={option.disabled}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {" -ից "}
                  </Grid>
                  <Grid item xs={7} md={3}>
                    {valueAError.error && (
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        {valueAError.error}
                      </Typography>
                    )}
                    {valueAError.required && (
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        Այս դաշտը պարտադիր է լրացման։
                      </Typography>
                    )}
                  </Grid>

                  {/* {"-------Նախանցյալ տարի------"} */}
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "10px",
                        fontSize: "18px",
                        marginTop: "5px",
                      }}
                    >
                      Նախանցյալ տարի
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <TextField
                      type="number"
                      sx={{
                        width: { md: "112px", sm: "112px", xs: "112px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="ratings_year_before"
                      name="ratings_year_before"
                      placeholder="123"
                      variant="outlined"
                      value={valueC}
                      onChange={(event) => {
                        setInputRatingsLastYear1(event.target.value);
                        if (valueD && +event.target.value && +event.target.value > +valueD) {
                          setValueCError({
                            required: false,
                            error: `Պետք է լինի ${valueD}-ից փոքր։`,
                          });
                        } else if (!event.target.value) {
                          setValueCError({
                            error: "",
                            required: true,
                          });
                        } else {
                          setValueCError({
                            required: false,
                            error: "",
                          });
                        }
                      }}
                    />
                    {" / "}
                    <Box
                      component="img"
                      right={{
                        xs: "-9px",
                        sm: "-9px",
                        lg: "55px",
                        md: "55px",
                        xl: "55px",
                      }}
                      sx={{
                        width: "20px",
                        position: "absolute",
                        top: "35px",
                        zIndex: 1,
                      }}
                      alt="icon"
                      src={`${arrowIcon}`}
                    />
                    <FormControl>
                      <Select
                        defaultValue="123"
                        sx={{
                          color: "black",
                          width: { md: "112px", sm: "112px", xs: "112px" },
                          lineHeight: "3.1em",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                        }}
                        id="ratings_year_before"
                        name="ratings_year_before"
                        value={valueD}
                        onChange={(event) => {
                          setOptionRatingsLastYear1(event.target.value);
                          if (valueC && +event.target.value < +valueC) {
                            setValueCError({
                              required: false,
                              error: `Պետք է լինի ${event.target.value}-ից փոքր։`,
                            });
                          } else {
                            setValueCError({
                              required: false,
                              error: "",
                            });
                          }
                        }}
                      >
                        {optionsUnit.map((option) => (
                          <MenuItem key={option.id} value={option.value} disabled={option.disabled}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {" -ից "}
                  </Grid>
                  <Grid item xs={7} md={3}>
                    {valueCError.error && (
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        {valueCError.error}
                      </Typography>
                    )}
                    {valueCError.required && (
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        Այս դաշտը պարտադիր է լրացման։
                      </Typography>
                    )}
                  </Grid>
                  {/* {"------------Դպրոցի ավարտական միջին գնահատականը---------------"} */}
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "10px",
                        fontSize: "18px",
                        marginTop: "5px",
                      }}
                    >
                      Դպրոցի ավարտական միջին գնահատականը
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <TextField
                      type="number"
                      sx={{
                        width: { md: "112px", sm: "112px", xs: "112px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="ratings_school"
                      name="ratings_school"
                      placeholder="123"
                      variant="outlined"
                      value={valueE}
                      onChange={(event) => {
                        setInputRatingsLastYear2(event.target.value);
                        if (valueF && +event.target.value && +event.target.value > +valueF) {
                          setValueEError({
                            required: false,
                            error: `Պետք է լինի ${valueF}-ից փոքր։`,
                          });
                        } else if (!event.target.value) {
                          setValueEError({
                            error: "",
                            required: true,
                          });
                        } else {
                          setValueEError({
                            required: false,
                            error: "",
                          });
                        }
                      }}
                    />
                    {" / "}
                    <Box
                      component="img"
                      right={{
                        xs: "-9px",
                        sm: "-9px",
                        lg: "55px",
                        md: "55px",
                        xl: "55px",
                      }}
                      sx={{
                        width: "20px",
                        position: "absolute",
                        top: "35px",
                        zIndex: 1,
                      }}
                      alt="icon"
                      src={`${arrowIcon}`}
                    />
                    <FormControl>
                      <Select
                        defaultValue="123"
                        sx={{
                          color: "black",
                          width: { md: "112px", sm: "112px", xs: "112px" },
                          lineHeight: "3.1em",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                        }}
                        id="ratings_school"
                        name="ratings_school"
                        value={valueF}
                        onChange={(event) => {
                          setOptionRatingsLastYear2(event.target.value);
                          if (valueE && +event.target.value < +valueE) {
                            setValueEError({
                              required: false,
                              error: `Պետք է լինի ${event.target.value}-ից փոքր։`,
                            });
                          } else {
                            setValueEError({
                              required: false,
                              error: "",
                            });
                          }
                        }}
                      >
                        {optionsUnit.map((option) => (
                          <MenuItem key={option.id} value={option.value} disabled={option.disabled}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {" -ից "}
                  </Grid>
                  <Grid item xs={7} md={3}>
                    {valueEError.error && (
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        {valueEError.error}
                      </Typography>
                    )}
                    {valueEError.required && (
                      <Typography
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "12px",
                          marginLeft: "5px",
                        }}
                      >
                        Այս դաշտը պարտադիր է լրացման։
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={7} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "900px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: 0,
                        lineHeight: 1.5,
                        marginBottom: "20px",
                      }}
                    >
                      Անհրաժեշտ է ներկայացնել ուսանողի ստուգման գրքույկի պատճենը: Ստուգման գրքույկի
                      բնօրինակը կպահանջվի, երբ տվյալ ուսանողը, որպես նպաստառու, ընդգրկվի Ամերիկայի
                      Հայ Ավետարանչական ընկերակցության` AMAA-ի կրթաթոշակի ծրագրում:
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item spacing={1} sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      width: { md: "998px", sm: "320px", xs: "320px" },
                      color: "#002B4D",
                      marginBottom: "10px",
                      marginLeft: "7px",
                    }}
                  >
                    4. Նշեք այն բուհի ամբողջական անվանումը և բաժինը, ուր հաճախում կամ հաճախելու եք:
                    *
                  </Typography>
                  <Grid item xs={7} md={7} sx={{ position: "relative" }}>
                    <Box
                      component="img"
                      right={{
                        xs: "-126px",
                        sm: "-126px",
                        lg: "20px",
                        md: "20px",
                        xl: "20px",
                      }}
                      sx={{
                        width: "20px",
                        position: "absolute",
                        top: "20px",
                        zIndex: 1,
                      }}
                      alt="icon"
                      src={`${arrowIcon}`}
                    />
                    <Select
                      defaultValue="«ԵՐԵՎԱՆԻ ՊԵՏԱԿԱՆ ՀԱՄԱԼՍԱՐԱՆ» ՀԻՄՆԱԴՐԱՄ"
                      sx={{
                        color: "black",
                        width: { md: "570px", sm: "320px", xs: "320px" },
                        lineHeight: "3.1em",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        padding: "0 35px 0 0",
                        "& fieldset": {
                          borderRadius: "10px",
                          border: "none",
                        },
                      }}
                      id="university_name"
                      name="university_name"
                      value={formik.values.university_name}
                      onChange={formik.handleChange}
                    >
                      {optionsInstitutions.map((option) => (
                        <MenuItem key={option.id} value={option.value} disabled={option.disabled}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <ErrorMessage
                      name="university_name"
                      render={(massege) => (
                        <p
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "12px",
                            marginLeft: "5px",
                          }}
                        >
                          {massege}
                        </p>
                      )}
                    />
                  </Grid>
                  <Grid item xs={7} md={5}>
                    <TextField
                      sx={{
                        width: { md: "408px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="university_department"
                      name="university_department"
                      placeholder="Բաժին"
                      variant="outlined"
                      helperText={formik.errors.university_department}
                      error={!!formik.errors.university_department}
                      value={formik.values.university_department}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                {createInputField && (
                  <Grid container item spacing={1} sx={{ marginBottom: "20px" }}>
                    <Grid item xs={7} md={12}>
                      <TextField
                        sx={{
                          width: { md: "570px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                        inputProps={{
                          style: {
                            color: "black",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                          },
                        }}
                        id="other_university"
                        name="other_university"
                        variant="outlined"
                        // helperText={formik.errors.other_university}
                        // error={!!formik.errors.other_university}
                        value={formik.values.other_university}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>
                )}

                <Grid container item spacing={1} sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      width: { md: "998px", sm: "320px", xs: "320px" },
                      color: "#002B4D",
                      marginBottom: "10px",
                      marginLeft: "7px",
                    }}
                  >
                    5. Բուհի հասցեն և հեռախոսահամարը *
                  </Typography>
                  <Grid item xs={7} md={7}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Հասցեն
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "570px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="university_adress"
                      name="university_adress"
                      variant="outlined"
                      helperText={formik.errors.university_adress}
                      error={!!formik.errors.university_adress}
                      value={formik.values.university_adress}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Հեռախոսահամարը
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "408px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="university_phone"
                      name="university_phone"
                      variant="outlined"
                      helperText={formik.errors.university_phone}
                      error={!!formik.errors.university_phone}
                      value={formik.values.university_phone}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={1} sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      width: { md: "998px", sm: "320px", xs: "320px" },
                      color: "#002B4D",
                      marginBottom: "10px",
                      marginLeft: "7px",
                    }}
                  >
                    6. Նշեք, թե որքան է կազմում ուսման տարեկան վարձը տառերով և թվերով: *
                  </Typography>
                  <Grid item xs={7} md={7}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Տառերով
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "570px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="university_fee_text"
                      name="university_fee_text"
                      variant="outlined"
                      helperText={formik.errors.university_fee_text}
                      error={!!formik.errors.university_fee_text}
                      value={formik.values.university_fee_text}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Թվերով
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "408px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="university_fee_number"
                      name="university_fee_number"
                      variant="outlined"
                      helperText={formik.errors.university_fee_number}
                      error={!!formik.errors.university_fee_number}
                      value={formik.values.university_fee_number}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={1} sx={{ marginBottom: "20px" }}>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      width: { md: "998px", sm: "320px", xs: "320px" },
                      color: "#002B4D",
                      marginBottom: "10px",
                      marginLeft: "7px",
                    }}
                  >
                    7. Ուսման վարձի համար որքա՞ն օգնություն եք ստանալու տարբեր աղբյուրներից:
                  </Typography>
                  <Grid item xs={7} md={7}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Օգնություն ծնողներից (տառերով)
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "570px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="help_parents_text"
                      name="help_parents_text"
                      variant="outlined"
                      helperText={formik.errors.help_parents_text}
                      error={!!formik.errors.help_parents_text}
                      value={formik.values.help_parents_text}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Թվերով
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "408px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="help_parents_number"
                      name="help_parents_number"
                      variant="outlined"
                      helperText={formik.errors.help_parents_number}
                      error={!!formik.errors.help_parents_number}
                      value={formik.values.help_parents_number}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={1} sx={{ marginBottom: "20px" }}>
                  <Grid item xs={7} md={7}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Աշխատանքից (տառերով)
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "570px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="help_job_text"
                      name="help_job_text"
                      variant="outlined"
                      helperText={formik.errors.help_job_text}
                      error={!!formik.errors.help_job_text}
                      value={formik.values.help_job_text}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Թվերով
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "408px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="help_job_number"
                      name="help_job_number"
                      variant="outlined"
                      helperText={formik.errors.help_job_number}
                      error={!!formik.errors.help_job_number}
                      value={formik.values.help_job_number}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={1} sx={{ marginBottom: "20px" }}>
                  <Grid item xs={7} md={7}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "570px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Օգնություն այլ ծրագրերից կամ անձանցից (տառերով)
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "570px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="help_other_text"
                      name="help_other_text"
                      variant="outlined"
                      helperText={formik.errors.help_other_text}
                      error={!!formik.errors.help_other_text}
                      value={formik.values.help_other_text}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={5}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "200px", sm: "320px", xs: "320px" },
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        marginBottom: "5px",
                      }}
                    >
                      Թվերով
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "408px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="help_other_number"
                      name="help_other_number"
                      variant="outlined"
                      helperText={formik.errors.help_other_number}
                      error={!!formik.errors.help_other_number}
                      value={formik.values.help_other_number}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <MDBox
                  sx={{
                    width: { md: "990px", sm: "300px", xs: "300px" },
                    marginTop: "90px",
                    marginLeft: "7px",
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleCancel}
                    sx={{
                      backgroundColor: "#FFFFFF !important",
                      color: "#002B4D !important",
                      width: "91px",
                      height: "40px",
                      border: "1px solid #002B4D !important",
                      borderRadius: "10px !important",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#002B4D !important",
                        color: "#FFFFFF !important",
                      },
                    }}
                  >
                    Նախորդ
                  </Button>
                  <Button
                    type="submit"
                    sx={{
                      marginLeft: "20px",
                      backgroundColor: "#FFFFFF !important",
                      color: "#002B4D !important",
                      width: "91px",
                      height: "40px",
                      border: "1px solid #002B4D !important",
                      borderRadius: "10px !important",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#002B4D !important",
                        color: "#FFFFFF !important",
                      },
                    }}
                  >
                    Հաջորդ
                  </Button>
                </MDBox>
              </form>
            </FormikProvider>
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}

// Setting default props for the stageTwo
stageTwo.defaultProps = {
  handleNext: {},
  handleCancel: {},
};

// Typechecking props for the stageTwo
stageTwo.propTypes = {
  handleNext: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default stageTwo;
