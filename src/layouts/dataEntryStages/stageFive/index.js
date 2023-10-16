/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";

// react hooks
import React, { useState, useEffect } from "react";

import { getApplicationById, changeApplication } from "hooks/allRequests/applicationApis";

import MDBox from "components/MDBox";

// @mui material components
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

// number format
import { NumericFormat } from "react-number-format";

// Validation schema
import { Form, Formik, useFormik } from "formik";
import validationSchema from "./validation";

import { BpCheckedIcon, BpIcon } from "../../../components/MDRadio";

function StageFive({ handleNext, handleCancel }) {
  const [createField, setField] = useState(false);

  const [dateArray, setDateArray] = useState([]);
  const [application, setApplication] = useState({});

  // add dates for select field
  useEffect(() => {
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear());
    const year = aYearFromNow.getFullYear();

    for (let currentDate = 2010; currentDate <= year; currentDate += 1) {
      setDateArray((state) => [...state, currentDate]);
    }
  }, []);

  // validation schema
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      jobs_services: "",
      hobbies: "",
      about_yourself: "",
      prev_request: "Ոչ",
      included: "Ոչ",
      last_include: "",
      last_include_amount: "",
      learned_source: "",
    },
    validationSchema,

    onSubmit: async (data) => {
      const body = {
        ...data,
      };
      if (data.last_include_amount && data.prev_request === "Այո" && data.included === "Այո") {
        body.included = data.last_include_amount;
        delete body.last_include_amount;
      }
      const createdApp = await changeApplication({ body, appId: application._id });
      if (createdApp) {
        handleNext();
      }
    },
  });

  const createInputField = (field, hook) => (field === "Այո" ? hook(true) : hook(false));

  useEffect(() => {
    createInputField(values.included, setField);
  }, [values.included]);

  useEffect(async () => {
    const appId = localStorage.getItem("applicationId");
    const foundApplication = await getApplicationById({ appId });
    if (foundApplication) {
      setApplication(foundApplication);
      setFieldValue(
        "jobs_services",
        foundApplication.jobs_services ? foundApplication.jobs_services : ""
      );
      setFieldValue("hobbies", foundApplication.hobbies ? foundApplication.hobbies : "");
      setFieldValue(
        "about_yourself",
        foundApplication.about_yourself ? foundApplication.about_yourself : ""
      );
      setFieldValue(
        "prev_request",
        foundApplication.prev_request ? foundApplication.prev_request : ""
      );
      if (foundApplication.included?.includes("֏")) {
        setFieldValue("included", "Այո");
        setFieldValue("last_include_amount", foundApplication.included);
      } else {
        setFieldValue("included", foundApplication.included ? foundApplication.included : "");
      }
      setFieldValue(
        "last_include",
        foundApplication.last_include ? foundApplication.last_include : ""
      );
      setFieldValue(
        "learned_source",
        foundApplication.learned_source ? foundApplication.learned_source : ""
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
        <Formik initialValues onSubmit={handleSubmit}>
          <Form>
            <MDBox
              sx={{
                width: { md: "990px", sm: "300px", xs: "300px" },
              }}
              mx={2}
              my={2}
              pt={6}
              pb={8}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  color: "#002B4D",
                  marginBottom: "20px",
                }}
              >
                Այլ տեղեկություն
              </Typography>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      1. Ի՞նչ աշխատանքներ կամ կամավոր ծառայություն եք կատարել վերջին 2 տարվա
                      ընթացքում:
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
                      id="jobs_services"
                      name="jobs_services"
                      placeholder=""
                      variant="outlined"
                      helperText={errors.jobs_services}
                      value={values.jobs_services}
                      error={!!errors.jobs_services}
                      onChange={(event) => {
                        setFieldValue("jobs_services", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
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
                      2. Նշեք Ձեր նախասիրությունները:
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
                      id="hobbies"
                      name="hobbies"
                      placeholder=""
                      variant="outlined"
                      helperText={errors.hobbies}
                      value={values.hobbies}
                      error={!!errors.hobbies}
                      onChange={(event) => {
                        setFieldValue("hobbies", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        fontsze: "18px !important",
                        color: "#002B4D",
                      }}
                    >
                      3. Ձեր անձը բնորոշող այլ տեղեկություն:
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
                      id="about_yourself"
                      name="about_yourself"
                      placeholder=""
                      variant="outlined"
                      helperText={errors.about_yourself}
                      value={values.about_yourself}
                      error={!!errors.about_yourself}
                      onChange={(event) => {
                        setFieldValue("about_yourself", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "40px",
                  }}
                >
                  <Grid item xs={7} md={8}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        fontSize: "18px !important",
                        color: "#002B4D",
                      }}
                    >
                      4. Նախկինում դիմե՞լ եք AMAA-ի կրթաթոշակի համար։ *
                    </Typography>
                  </Grid>
                  <Grid item xs={7} md={4}>
                    <MDBox>
                      <FormControl>
                        <RadioGroup
                          required
                          sx={{
                            flexDirection: "row !important",
                          }}
                          aria-labelledby="radio-buttons"
                          name="prev_request"
                          id="prev_request"
                          value={values.prev_request}
                          onChange={(event) => {
                            setFieldValue("prev_request", event.target.value);
                          }}
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
                      {errors.prev_request ? (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "5px",
                            marginLeft: "8px",
                          }}
                        >
                          {errors.prev_request}
                        </span>
                      ) : null}
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "0 !importanr",
                    marginBottom: "40px",
                  }}
                >
                  <Grid item xs={7} md={8}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        fontsze: "18px !important",
                        color: "#002B4D",
                      }}
                    >
                      5. Եթե այո, ընդգրկվե՞լ եք ծրագրում։
                    </Typography>
                  </Grid>
                  <Grid item xs={7} md={4}>
                    <MDBox>
                      <FormControl>
                        <RadioGroup
                          sx={{
                            flexDirection: "row !important",
                          }}
                          aria-labelledby="radio-buttons"
                          id="included"
                          name="included"
                          value={values.included}
                          onChange={(event) => {
                            setFieldValue("included", event.target.value);
                          }}
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
                {createField && (
                  <>
                    <Grid container item spacing={3}>
                      <Grid item xs={7} md={12}>
                        <InputLabel
                          required
                          shrink
                          sx={{
                            width: { md: "998px", sm: "320px", xs: "320px" },
                            lineHeight: 1.5,
                          }}
                        >
                          Եթե Դուք պատասխանել եք այո, նշեք վերջին անգամ ծրագրում ներգրավված լինելու
                          տարեթիվը և ստացած կրթաթոշակի չափը։
                        </InputLabel>
                      </Grid>
                    </Grid>
                    <Grid container item spacing={3} sx={{ marginBottom: "40px" }}>
                      <Grid item xs={7} md={6}>
                        <Select
                          defaultValue={dateArray[0]}
                          sx={{
                            color: "black",
                            width: { md: "490px", sm: "320px", xs: "320px" },
                            lineHeight: "3.1em",
                            borderRadius: "10px",
                            background: "#FFFFFF",
                            "& fieldset": {
                              borderRadius: "10px",
                              border: "none",
                            },
                          }}
                          id="last_include"
                          name="last_include"
                          value={values.last_include}
                          onChange={(event) => {
                            setFieldValue("last_include", event.target.value);
                          }}
                        >
                          {dateArray.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={7} md={6}>
                        <NumericFormat
                          sx={{
                            width: { md: "490px", sm: "320px", xs: "320px" },
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
                          name="last_include_amount"
                          customInput={TextField}
                          value={values.last_include_amount}
                          onChange={(event) => {
                            setFieldValue("last_include_amount", event.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                <Grid container item spacing={3}>
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
                      6. Ինչպե՞ս իմացաք AMAA-ի և այս ծրագրի մասին
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
                      id="learned_source"
                      name="learned_source"
                      placeholder=""
                      variant="outlined"
                      helperText={errors.learned_source}
                      value={values.learned_source}
                      error={!!errors.learned_source}
                      onChange={(event) => {
                        setFieldValue("learned_source", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <MDBox
                  sx={{
                    width: { md: "990px", sm: "320px", xs: "320px" },
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
              </Grid>
            </MDBox>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}

// Setting default props for the StageFive
StageFive.defaultProps = {
  handleNext: {},
  handleCancel: {},
};

// Typechecking props for the StageFive
StageFive.propTypes = {
  handleNext: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default StageFive;
