/* eslint-disable no-underscore-dangle */
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import MDBox from "components/MDBox";

// time zone
import { ZonedDate } from "@progress/kendo-date-math";
import "@progress/kendo-date-math/tz/Asia/Yerevan";

// @mui material components
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// api functions
import {
  getUserAllApplications,
  createApplication,
  changeApplication,
} from "hooks/allRequests/applicationApis";

// Validation schema
import { Form, Formik, useFormik } from "formik";
import validationSchema from "./validation";

import arrowIcon from "../../../assets/images/home-images/arrowDown.png";

import { optionsCountry, optionsRegion } from "./data";

import { BpCheckedIcon, BpIcon } from "../../../components/MDRadio";

function StageFirst({ handleNext }) {
  const [newDate, setNewDate] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appId, setAppId] = useState("");

  // validation schema
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      family: "",
      fullNameLatin: "",
      passportNumber: "",
      social_card: "",
      country: "",
      region: "",
      cityVillage: "",
      address: "",
      phone: "",
      mobile: "",
      email: "",
      birthday: "",
      gender: "",
      marriage_status: "",
    },
    validationSchema,
    onSubmit: async (body) => {
      // console.log(body);
      const createdApp = await changeApplication({ body, appId });
      if (createdApp) {
        handleNext();
      }
    },
  });

  useEffect(async () => {
    setNewDate(new Date());
    const allAps = await getUserAllApplications();
    let foundObj = {};
    if (allAps) {
      const nowadaysYear = new Date().getFullYear();
      foundObj = allAps.find((obj) => {
        const date = new Date(obj.createdAt);
        const tzCreatedDate = ZonedDate.fromUTCDate(date, "Asia/Yerevan");
        const createdAtYear = tzCreatedDate.getFullYear();
        return createdAtYear === nowadaysYear;
      });
      if (foundObj) {
        if (foundObj?.status !== "created" && foundObj?.status !== "returned") {
          localStorage.setItem("applicationId", foundObj?._id);
          navigate("/submittedApplication");
        }
      } else {
        const createdApplication = await createApplication();
        if (createdApplication) {
          foundObj = createdApplication;
        }
      }
    } else {
      const createdApplication = await createApplication();
      if (createdApplication) {
        foundObj = createdApplication;
      }
    }
    const date = new Date(foundObj.birthday);
    const tzBirthdayDate = ZonedDate.fromUTCDate(date, "Asia/Yerevan");
    const birthdayArr = tzBirthdayDate.toLocaleDateString().split(".");

    setFieldValue("firstName", foundObj.firstName ? foundObj.firstName : "");
    setFieldValue("lastName", foundObj.lastName ? foundObj.lastName : "");
    setFieldValue("family", foundObj.family ? foundObj.family : "");
    setFieldValue("fullNameLatin", foundObj.fullNameLatin ? foundObj.fullNameLatin : "");
    setFieldValue("passportNumber", foundObj.passportNumber ? foundObj.passportNumber : "");
    setFieldValue("social_card", foundObj.social_card ? foundObj.social_card : "");
    setFieldValue("country", foundObj.country ? foundObj.country : "");
    setFieldValue("region", foundObj.region ? foundObj.region : "");
    setFieldValue("address", foundObj.address ? foundObj.address : "");
    setFieldValue("cityVillage", foundObj.cityVillage ? foundObj.cityVillage : "");
    setFieldValue("phone", foundObj.phone ? foundObj.phone : "");
    setFieldValue("mobile", foundObj.mobile ? foundObj.mobile : "");
    setFieldValue("email", foundObj.email ? foundObj.email : "");
    setFieldValue(
      "birthday",
      foundObj.birthday ? `${birthdayArr[2]}-${birthdayArr[1]}-${birthdayArr[0]}` : ""
    );
    setFieldValue("gender", foundObj.gender ? foundObj.gender : "");
    setFieldValue("marriage_status", foundObj.marriage_status ? foundObj.marriage_status : "");
    setAppId(foundObj._id);
    localStorage.setItem("applicationId", foundObj._id);
    setLoading(false);
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
        {!loading ? (
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
                  Անձնական տվյալներ
                </Typography>

                <Grid container spacing={1}>
                  <Grid container item spacing={3}>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Անուն
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="firstName"
                        name="firstName"
                        placeholder="Անուն"
                        variant="outlined"
                        helperText={errors.firstName}
                        value={values.firstName}
                        error={!!errors.firstName}
                        onChange={(event) => {
                          setFieldValue("firstName", event.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Ազգանուն
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="lastName"
                        name="lastName"
                        placeholder="Ազգանուն"
                        variant="outlined"
                        helperText={errors.lastName}
                        value={values.lastName}
                        error={!!errors.lastName}
                        onChange={(event) => {
                          setFieldValue("lastName", event.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Հայրանուն
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="family"
                        name="family"
                        placeholder="Հայրանուն"
                        variant="outlined"
                        helperText={errors.family}
                        value={values.family}
                        error={!!errors.family}
                        onChange={(event) => {
                          setFieldValue("family", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3}>
                    <Grid item xs={15} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Լատինատառ՝ անուն, ազգանուն, հայրանուն
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="fullNameLatin"
                        name="fullNameLatin"
                        placeholder="Name Surname Father’s Name"
                        variant="outlined"
                        helperText={errors.fullNameLatin}
                        value={values.fullNameLatin}
                        error={!!errors.fullNameLatin}
                        onChange={(event) => {
                          setFieldValue("fullNameLatin", event.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Անձնագիր
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="passportNumber"
                        name="passportNumber"
                        placeholder="XX0000000"
                        variant="outlined"
                        helperText={errors.passportNumber}
                        value={values.passportNumber}
                        error={!!errors.passportNumber}
                        onChange={(event) => {
                          setFieldValue("passportNumber", event.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Սոցիալական քարտ
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="social_card"
                        name="social_card"
                        placeholder="000000000000"
                        variant="outlined"
                        helperText={errors.social_card}
                        value={values.social_card}
                        error={!!errors.social_card}
                        onChange={(event) => {
                          setFieldValue("social_card", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3}>
                    <Grid item xs={7} md={4} sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        right={{
                          xs: "-149px",
                          sm: "-149px",
                          lg: "5px",
                          md: "5px",
                          xl: "5px",
                        }}
                        sx={{
                          width: "20px",
                          position: "absolute",
                          top: "70px",
                          zIndex: 1,
                        }}
                        alt="icon"
                        src={`${arrowIcon}`}
                      />
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Երկիր
                      </InputLabel>
                      <Select
                        defaultValue="Հայաստան"
                        sx={{
                          color: "black",
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          lineHeight: "3.1em",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        id="country"
                        name="country"
                        value={values.country}
                        onChange={(event) => {
                          setFieldValue("country", event.target.value);
                        }}
                      >
                        {optionsCountry.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.country ? (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "5px",
                            marginLeft: "8px",
                          }}
                        >
                          {errors.country}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={7} md={4} sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        right={{
                          xs: "-149px",
                          sm: "-149px",
                          lg: "5px",
                          md: "5px",
                          xl: "5px",
                        }}
                        sx={{
                          width: "20px",
                          position: "absolute",
                          top: "70px",
                          zIndex: 1,
                        }}
                        alt="icon"
                        src={`${arrowIcon}`}
                      />
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Մարզ
                      </InputLabel>
                      <Select
                        defaultValue={optionsRegion[0]}
                        sx={{
                          color: "black",
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          lineHeight: "3.1em",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        id="region"
                        name="region"
                        value={values.region}
                        onChange={(event) => {
                          setFieldValue("region", event.target.value);
                        }}
                      >
                        {optionsRegion.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.region ? (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "5px",
                            marginLeft: "8px",
                          }}
                        >
                          {errors.region}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Քաղաք / Գյուղ
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="cityVillage"
                        name="cityVillage"
                        placeholder=".."
                        variant="outlined"
                        helperText={errors.cityVillage}
                        value={values.cityVillage}
                        error={!!errors.cityVillage}
                        onChange={(event) => {
                          setFieldValue("cityVillage", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3}>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Հասցե
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "998px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="address"
                        name="address"
                        placeholder="Հասցե"
                        variant="outlined"
                        helperText={errors.address}
                        value={values.address}
                        error={!!errors.address}
                        onChange={(event) => {
                          setFieldValue("address", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3}>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Բջջ. հեռախոս
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="phone"
                        name="phone"
                        placeholder="0xx xx xx xx"
                        variant="outlined"
                        helperText={errors.phone}
                        value={values.phone}
                        error={!!errors.phone}
                        onChange={(event) => {
                          setFieldValue("phone", event.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <InputLabel sx={{ lineHeight: 1.5, marginBottom: "4px" }}>Հեռախոս</InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="mobile"
                        name="mobile"
                        placeholder="0xx xx xx xx"
                        variant="outlined"
                        helperText={errors.mobile}
                        error={!!errors.mobile}
                        value={values.mobile}
                        onChange={(event) => {
                          setFieldValue("mobile", event.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={7} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Էլ-փոստի հասցե
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "320px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                          marginBottom: "16px",
                        }}
                        inputProps={{
                          style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                        }}
                        id="email"
                        name="email"
                        placeholder="name@domain.com"
                        variant="outlined"
                        helperText={errors.email}
                        value={values.email}
                        error={!!errors.email}
                        onChange={(event) => {
                          setFieldValue("email", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3}>
                    <Grid item xs={12} md={4}>
                      <InputLabel required sx={{ lineHeight: 1.5, marginBottom: "4px" }}>
                        Ծննդյան տարի, ամիս, ամսաթիվ
                      </InputLabel>
                      <TextField
                        sx={{
                          width: { md: "998px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          input: {
                            color: "black",
                            background: "#ffffffbf",
                            borderRadius: "10px",
                          },
                          marginBottom: "16px",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                        }}
                        id="birthday"
                        name="birthday"
                        type="date"
                        inputProps={{ min: "1955-01-24", max: newDate }}
                        helperText={errors.birthday}
                        error={!!errors.birthday}
                        value={values.birthday}
                        onChange={(event) => {
                          setFieldValue("birthday", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={3}>
                    <Grid item xs={7} md={5}>
                      <MDBox
                        sx={{
                          width: { md: "400px", sm: "320px", xs: "320px" },
                          backgroundColor: "#ffff",
                          marginTop: "24px",
                          padding: "20px 35px",
                          borderRadius: "10px",
                          boxShadow: "0px 4px 48px rgba(204, 212, 219, 0.24)",
                          fontSize: "16px",
                        }}
                      >
                        <FormControl>
                          <FormLabel
                            required
                            id="form-label-gender"
                            sx={{
                              fontSize: "16px",
                              color: "#002B4D",
                            }}
                          >
                            Սեռ
                          </FormLabel>
                          <RadioGroup
                            sx={{
                              flexDirection: "row !important",
                            }}
                            aria-labelledby="radio-buttons"
                            defaultValue=""
                            id="gender"
                            name="gender"
                            value={values.gender}
                            onChange={(event) => {
                              setFieldValue("gender", event.target.value);
                            }}
                          >
                            <FormControlLabel
                              value="Արական"
                              control={
                                <Radio
                                  disableRipple
                                  color="default"
                                  checkedIcon={<BpCheckedIcon />}
                                  icon={<BpIcon />}
                                />
                              }
                              label="Արական"
                            />
                            <FormControlLabel
                              value="Իգական"
                              control={
                                <Radio
                                  disableRipple
                                  color="default"
                                  checkedIcon={<BpCheckedIcon />}
                                  icon={<BpIcon />}
                                />
                              }
                              label="Իգական"
                            />
                          </RadioGroup>
                        </FormControl>
                      </MDBox>
                      {errors.gender ? (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "5px",
                            marginLeft: "8px",
                          }}
                        >
                          {errors.gender}
                        </span>
                      ) : null}
                    </Grid>
                    <Grid item xs={7} md={7}>
                      <MDBox
                        sx={{
                          width: { md: "576px", sm: "320px", xs: "320px" },
                          backgroundColor: "#ffff",
                          padding: "20px 35px",
                          marginTop: "24px",
                          borderRadius: "10px",
                          fontSize: "16px",
                          boxShadow: "0px 4px 48px rgba(204, 212, 219, 0.24)",
                        }}
                      >
                        <FormControl>
                          <FormLabel
                            required
                            id="form-label-marital-status"
                            sx={{
                              fontSize: "16px",
                              color: "#002B4D",
                            }}
                          >
                            Ամուսնական կարգավիճակ
                          </FormLabel>
                          <RadioGroup
                            sx={{
                              flexDirection: "row !important",
                            }}
                            aria-labelledby="radio-buttons"
                            id="marriage_status"
                            name="marriage_status"
                            value={values.marriage_status}
                            onChange={(event) => {
                              setFieldValue("marriage_status", event.target.value);
                            }}
                          >
                            <FormControlLabel
                              value="Միայնակ"
                              control={
                                <Radio
                                  disableRipple
                                  color="default"
                                  checkedIcon={<BpCheckedIcon />}
                                  icon={<BpIcon />}
                                />
                              }
                              label="Միայնակ"
                            />
                            <FormControlLabel
                              value="Ամուսնացած"
                              control={
                                <Radio
                                  disableRipple
                                  color="default"
                                  checkedIcon={<BpCheckedIcon />}
                                  icon={<BpIcon />}
                                />
                              }
                              label="Ամուսնացած"
                            />
                            <FormControlLabel
                              value="Բաժանված"
                              control={
                                <Radio
                                  disableRipple
                                  color="default"
                                  checkedIcon={<BpCheckedIcon />}
                                  icon={<BpIcon />}
                                />
                              }
                              label="Բաժանված"
                            />
                          </RadioGroup>
                        </FormControl>
                      </MDBox>
                      {errors.marriage_status ? (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "5px",
                            marginLeft: "8px",
                          }}
                        >
                          {errors.marriage_status}
                        </span>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={7} md={5} sx={{ marginTop: "90px" }}>
                    <Button
                      type="submit"
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
                      Հաջորդ
                    </Button>
                  </Grid>
                </Grid>
              </MDBox>
            </Form>
          </Formik>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
}

// Setting default props for the StageFirst
StageFirst.defaultProps = {
  handleNext: {},
};

// Typechecking props for the StageFirst
StageFirst.propTypes = {
  handleNext: PropTypes.func,
};

export default StageFirst;
