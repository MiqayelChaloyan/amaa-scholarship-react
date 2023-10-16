/* eslint-disable no-underscore-dangle */
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react hooks
import React, { useState, useEffect } from "react";

import MDBox from "components/MDBox";

// @mui material components
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";

import { getApplicationById, changeApplication } from "hooks/allRequests/applicationApis";
import typography from "assets/theme/base/typography";

// number format
import { NumericFormat } from "react-number-format";

// @mui material icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useFormik, FormikProvider, FieldArray, ErrorMessage } from "formik";
import validationSchema from "./validation";

import optionsYears from "./data";

import { BpCheckedIcon, BpIcon } from "../../../components/MDRadio";

function stageFour({ handleNext, handleCancel }) {
  const [apartmentIsRented, setApartmentIsRented] = useState(false);
  // To get the id of finance_information
  const [counterJobEducationInfoId, setCounterJobEducationInfoId] = useState(0);
  const [application, setApplication] = useState({});

  const formik = useFormik({
    initialValues: {
      finance_information: [
        {
          id: counterJobEducationInfoId,
          name: "",
          conection: "",
          job_education_info: "",
          income_fee: "",
          education_fee: "",
          phone: "",
          other_info: "",
        },
      ],
      prev_revenue: "",
      car_name: "",
      count: "",
      car_model: "",
      car_date: "",
      home_rented: "Ոչ",
      home_rented3: "",
      other_finance: "",
      another_part: "",
      prev_summer: "",
      next_summer: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      const body = {
        financial: { ...data, finance_information: JSON.stringify(data.finance_information) },
      };
      if (data.home_rented3 && data.home_rented === "Այո") {
        body.financial.home_rented = data.home_rented3;
        delete body.financial.home_rented3;
      }
      const createdApp = await changeApplication({ body, appId: application._id });
      if (createdApp) {
        handleNext();
      }
    },
  });

  // To get the id of finance_information
  useEffect(() => {
    setCounterJobEducationInfoId((count) => count + 1);
  }, [formik.values.finance_information.length]);

  const createInput = () =>
    formik.values.home_rented === "Այո" ? setApartmentIsRented(true) : setApartmentIsRented(false);

  useEffect(() => {
    createInput();
  }, [formik.values.home_rented]);

  useEffect(async () => {
    const appId = localStorage.getItem("applicationId");
    const foundApplication = await getApplicationById({ appId });
    if (foundApplication) {
      setApplication(foundApplication);
      const financeInformation = JSON.parse(foundApplication.financial.finance_information);
      if (financeInformation) {
        formik.setFieldValue(
          "finance_information",
          foundApplication.financial.finance_information ? financeInformation : ""
        );
      }
      formik.setFieldValue(
        "prev_revenue",
        foundApplication.financial.prev_revenue ? foundApplication.financial.prev_revenue : ""
      );
      formik.setFieldValue(
        "car_name",
        foundApplication.financial.car_name ? foundApplication.financial.car_name : ""
      );
      formik.setFieldValue(
        "count",
        foundApplication.financial.count ? foundApplication.financial.count : ""
      );
      formik.setFieldValue(
        "car_model",
        foundApplication.financial.car_model ? foundApplication.financial.car_model : ""
      );
      formik.setFieldValue(
        "car_date",
        foundApplication.financial.car_date ? foundApplication.financial.car_date : ""
      );
      if (foundApplication.financial?.home_rented?.includes("֏")) {
        formik.setFieldValue("home_rented", "Այո");
        formik.setFieldValue("home_rented3", foundApplication.financial.home_rented);
      } else {
        formik.setFieldValue(
          "home_rented",
          foundApplication.financial.home_rented ? foundApplication.financial.home_rented : ""
        );
      }
      formik.setFieldValue(
        "other_finance",
        foundApplication.financial.other_finance ? foundApplication.financial.other_finance : ""
      );
      formik.setFieldValue(
        "another_part",
        foundApplication.financial.another_part ? foundApplication.financial.another_part : ""
      );
      formik.setFieldValue(
        "prev_summer",
        foundApplication.financial.prev_summer ? foundApplication.financial.prev_summer : ""
      );
      formik.setFieldValue(
        "next_summer",
        foundApplication.financial.next_summer ? foundApplication.financial.next_summer : ""
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
                  Ֆինանսական տեղեկություն
                </Typography>
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
                      Ձեր ընտանիքի յուրաքանչյուր անդամի մասին լրացնել հետևյալ տեղեկությունները
                      (ներառյալ դիմորդը): *
                    </Typography>
                  </Grid>
                </Grid>
                <FieldArray
                  name="finance_information"
                  render={(arrayHelpers) => (
                    <div>
                      {formik.values.finance_information.length >= 1 &&
                        formik.values.finance_information.map((questions, index) => (
                          <div
                            key={questions.id}
                            style={{
                              marginBottom: "15px",
                            }}
                          >
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
                                  1. Անուն, ազգանուն
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
                                  id={`finance_information.${index}.name`}
                                  name={`finance_information.${index}.name`}
                                  value={formik.values.finance_information[index].name}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`finance_information.${index}.name`}
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
                                  2. Ընտանեկան կարգավիճակ
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
                                  id={`finance_information.${index}.conection`}
                                  name={`finance_information.${index}.conection`}
                                  value={formik.values.finance_information[index].conection}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`finance_information.${index}.conection`}
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
                                  3. Աշխատո՞ւմ է, վայր/ պաշտոն Սովորո՞ւմ է/ վայրը և մասնագիտությունը
                                  Եթե չի աշխատում, ինչո՞վ է զբաղվում
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
                                  id={`finance_information.${index}.job_education_info`}
                                  name={`finance_information.${index}.job_education_info`}
                                  value={
                                    formik.values.finance_information[index].job_education_info
                                  }
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`finance_information.${index}.job_education_info`}
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

                            <Grid
                              container
                              item
                              spacing={3}
                              sx={{
                                marginBottom: "30px",
                              }}
                            >
                              <Grid item xs={7} md={4}>
                                <MDBox
                                  sx={{
                                    width: { md: "320px", sm: "320px", xs: "320px" },
                                    backgroundColor: "white !important",
                                    height: "150px",
                                    padding: "15px 20px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <Typography
                                    variant="p"
                                    component="p"
                                    sx={{
                                      width: { md: "320px", sm: "320px", xs: "320px" },
                                      color: "#002B4D",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    4. Ամսական եկամուտը
                                  </Typography>
                                  <Divider />
                                  <NumericFormat
                                    sx={{
                                      backgroundColor: "#F9FBFD",
                                      border: "none !important",
                                      width: "288px",
                                      height: "56px",
                                      fontSize: "24px",
                                      lineHeight: "32px",
                                      fontFamily: "Mardoto-Medium",
                                    }}
                                    prefix="֏"
                                    placeholder="֏"
                                    thousandSeparator
                                    customInput={TextField}
                                    name={`finance_information.${index}.income_fee`}
                                    value={formik.values.finance_information[index].income_fee}
                                    onChange={formik.handleChange}
                                  />
                                  <ErrorMessage
                                    name={`finance_information.${index}.income_fee`}
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
                                </MDBox>
                              </Grid>
                              <Grid item xs={7} md={4}>
                                <MDBox
                                  sx={{
                                    width: { md: "320px", sm: "320px", xs: "320px" },
                                    backgroundColor: "white !important",
                                    height: "150px",
                                    padding: "15px 20px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <Typography
                                    variant="p"
                                    component="p"
                                    sx={{
                                      width: { md: "320px", sm: "320px", xs: "320px" },
                                      color: "#002B4D",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    5. Տարեկան ուսման վարձը
                                  </Typography>
                                  <Divider />
                                  <NumericFormat
                                    sx={{
                                      backgroundColor: "#F9FBFD",
                                      border: "none !important",
                                      width: "288px",
                                      height: "56px",
                                      fontSize: "24px",
                                      fontFamily: "Mardoto-Medium",
                                    }}
                                    prefix="֏"
                                    placeholder="֏"
                                    thousandSeparator
                                    customInput={TextField}
                                    name={`finance_information.${index}.education_fee`}
                                    value={formik.values.finance_information[index].education_fee}
                                    onChange={formik.handleChange}
                                  />
                                  <ErrorMessage
                                    name={`finance_information.${index}.education_fee`}
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
                                </MDBox>
                              </Grid>
                              <Grid item xs={7} md={4}>
                                <MDBox
                                  sx={{
                                    width: { md: "320px", sm: "320px", xs: "320px" },
                                    backgroundColor: "white !important",
                                    height: "150px",
                                    padding: "15px 20px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <Typography
                                    variant="p"
                                    component="p"
                                    sx={{
                                      width: { md: "320px", sm: "320px", xs: "320px" },
                                      color: "#002B4D",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    6. Բջջային հեռ.համար
                                  </Typography>
                                  <Divider />
                                  <TextField
                                    sx={{
                                      borderRadius: "10px",
                                      width: "288px",
                                      height: "56px",
                                      fontSize: "24px",
                                      fontFamily: "Mardoto-Medium",
                                    }}
                                    inputProps={{
                                      style: {
                                        color: "black",
                                        background: "#F9FBFD",
                                        borderRadius: "10px",
                                        fontFamily: typography.fontFamily,
                                      },
                                    }}
                                    id={`finance_information.${index}.phone`}
                                    name={`finance_information.${index}.phone`}
                                    placeholder="Բջջային հեռ.համար"
                                    variant="outlined"
                                    value={formik.values.finance_information[index].phone}
                                    onChange={formik.handleChange}
                                  />
                                  <ErrorMessage
                                    name={`finance_information.${index}.phone`}
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
                                </MDBox>
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
                                  7. Այլ սոց. տեղեկություն առողջական կարգավիճակ
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
                                  id={`finance_information.${index}.other_info`}
                                  name={`finance_information.${index}.other_info`}
                                  value={formik.values.finance_information[index].other_info}
                                  onChange={formik.handleChange}
                                />
                                <ErrorMessage
                                  name={`finance_information.${index}.other_info`}
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
                            id: counterJobEducationInfoId,
                            name: "",
                            conection: "",
                            job_education_info: "",
                            income_fee: "",
                            education_fee: "",
                            phone: "",
                            other_info: "",
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
                          if (arrayHelpers.form.values.finance_information.length > 1)
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
                      8. Այլ ի՞նչ եկամուտներ եք ունեցել ընտանիքում անցյալ տարվա ընթացքում (օրինակ`
                      օգնություն հարազատներից, ժամանակավոր աշխատանք): *
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
                      id="prev_revenue"
                      name="prev_revenue"
                      helperText={formik.errors.prev_revenue}
                      error={!!formik.errors.prev_revenue}
                      value={formik.values.prev_revenue}
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
                      9. Եթե ընտանիքի անդամները մեքենա ունեն նշեք անունը, քանակը, մակնիշը, տարեթիվը
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item spacing={3} sx={{ marginBottom: "20px" }}>
                  <Grid item xs={7} md={3}>
                    <InputLabel
                      shrink
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        marginBottom: "10px",
                        lineHeight: 1.5,
                      }}
                    >
                      Անունը
                    </InputLabel>
                    <TextField
                      sx={{
                        width: { md: "230px", sm: "320px", xs: "320px" },
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
                      id="car_name"
                      name="car_name"
                      value={formik.values.car_name}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={3}>
                    <InputLabel
                      shrink
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        marginBottom: "10px",
                        lineHeight: 1.5,
                      }}
                    >
                      Քանակը
                    </InputLabel>
                    <TextField
                      sx={{
                        width: { md: "230px", sm: "320px", xs: "320px" },
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
                      id="count"
                      name="count"
                      value={formik.values.count}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={3}>
                    <InputLabel
                      shrink
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        marginBottom: "10px",
                        lineHeight: 1.5,
                      }}
                    >
                      Մակնիշը
                    </InputLabel>
                    <TextField
                      sx={{
                        width: { md: "230px", sm: "320px", xs: "320px" },
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
                      id="car_model"
                      name="car_model"
                      value={formik.values.car_model}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={7} md={3}>
                    <InputLabel
                      shrink
                      sx={{
                        width: { md: "320px", sm: "320px", xs: "320px" },
                        marginBottom: "10px",
                        lineHeight: 1.5,
                      }}
                    >
                      Տարեթիվը
                    </InputLabel>
                    <Select
                      defaultValue={optionsYears[0]}
                      sx={{
                        color: "black",
                        width: { md: "230px", sm: "320px", xs: "320px" },
                        lineHeight: "3.1em",
                        borderRadius: "10px",
                        background: "#FFFFFF",
                        "& fieldset": {
                          borderRadius: "10px",
                          border: "none",
                        },
                      }}
                      id="car_date"
                      name="car_date"
                      value={formik.values.car_date}
                      onChange={formik.handleChange}
                    >
                      {optionsYears.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  spacing={3}
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "start",
                  }}
                >
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        fontsze: "18px !important",
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      10. Բնակարանը վարձակալա՞ծ է։*
                    </Typography>
                  </Grid>
                  <Grid item xs={7} md={8}>
                    <MDBox
                      sx={{
                        padding: "20px 35px",
                      }}
                    >
                      <FormControl>
                        <RadioGroup
                          sx={{
                            flexDirection: "row !important",
                          }}
                          aria-labelledby="radio-buttons"
                          id="home_rented"
                          name="home_rented"
                          value={formik.values.home_rented}
                          onChange={formik.handleChange}
                        >
                          <FormControlLabel
                            value="Այո"
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<BpCheckedIcon />}
                                icon={<BpIcon />}
                              />
                            }
                            label="Այո"
                          />
                          <FormControlLabel
                            value="Ոչ"
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<BpCheckedIcon />}
                                icon={<BpIcon />}
                              />
                            }
                            label="Ոչ"
                          />
                        </RadioGroup>
                      </FormControl>
                    </MDBox>
                  </Grid>
                </Grid>

                {apartmentIsRented && (
                  <Grid container item spacing={3} sx={{ marginBottom: "20px" }}>
                    <Grid item xs={7} md={12}>
                      <InputLabel
                        required
                        shrink
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          marginBottom: "10px",
                          lineHeight: 1.5,
                        }}
                      >
                        Վարձակալության վճար
                      </InputLabel>
                      {apartmentIsRented}
                      <NumericFormat
                        sx={{
                          width: { md: "432px", sm: "320px", xs: "320px" },
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
                        prefix="֏"
                        placeholder="֏"
                        thousandSeparator
                        customInput={TextField}
                        id="home_rented3"
                        name="home_rented3"
                        helperText={apartmentIsRented && formik.errors.home_rented3}
                        value={formik.values.home_rented3}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>
                )}

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
                      11. Տալ այլ տեղեկություն ձեր ընտանիքի ֆինանսական կարգավիճակի մասին և նշել
                      ընտանիքի միջին ամսական եկամուտը:*
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
                      id="other_finance"
                      helperText={formik.errors.other_finance}
                      error={!!formik.errors.other_finance}
                      name="other_finance"
                      value={formik.values.other_finance}
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
                      12. Եթե այս ծրագրից ստանաք ձեր ուսման վարձի մի մասը, ապա ինչպե՞ս եք մարելու
                      ուսման վարձի մնացած մասը:*
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
                      id="another_part"
                      helperText={formik.errors.another_part}
                      error={!!formik.errors.another_part}
                      name="another_part"
                      value={formik.values.another_part}
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
                      13. Անցյալ ամառ ինչո՞վ ես զբաղվել։*
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
                      id="prev_summer"
                      name="prev_summer"
                      helperText={formik.errors.prev_summer}
                      error={!!formik.errors.prev_summer}
                      value={formik.values.prev_summer}
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
                      14. Հաջորդ ամառ ինչո՞վ ես զբաղվելու։*
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
                      id="next_summer"
                      name="next_summer"
                      helperText={formik.errors.next_summer}
                      error={!!formik.errors.next_summer}
                      value={formik.values.next_summer}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>

                <MDBox
                  sx={{
                    width: { md: "990px", sm: "300px", xs: "300px" },
                    marginTop: "90px",
                    marginLeft: 0,
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

// Setting default props for the stageFour
stageFour.defaultProps = {
  handleNext: {},
  handleCancel: {},
};

// Typechecking props for the stageFour
stageFour.propTypes = {
  handleNext: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default stageFour;
