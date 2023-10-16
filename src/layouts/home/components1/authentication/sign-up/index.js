import { useState } from "react";
import { register } from "hooks/allRequests/userApis";
import { Link } from "react-router-dom";

import MDBox from "components/MDBox";

// @mui material components
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Validation schema
import { Form, Formik, useFormik } from "formik";
import validationSchema from "./validation";

function SignUp() {
  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // validation schema
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confimPwd: "",
      name: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      const body = { email: data.email, name: data.name, password: data.password };
      const result = await register(body);
      if (result && !result?.error && !result.statusCode) {
        // eslint-disable-next-line no-alert
        alert(
          "Ձեր էլեկտրոնային հասցեին ուղարկվել է վավերացման հղումը։\nՆախքան շարունակելը, խնդրում ենք ստուգել Ձեր էլեկտրոնային հասցեն"
        );
        // վավերացման հղումը հաստատելու համար։ Եթե չեք ստացել նամակը խնդրում ենք սեղմել այստեղ։
      } else if (result?.error) {
        // eslint-disable-next-line no-alert
        alert(result?.message);
      }
    },
  });

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
                width: { md: "320px", sm: "320px", xs: "320px" },
                maxWidth: "100%",
                display: "grid",
                justifyContent: "center",
                margin: "10% auto",
              }}
              mx={2}
              my={2}
              pt={6}
              pb={8}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  color: "#002B4D",
                  marginBottom: "20px",
                }}
              >
                Գրանցվել
              </Typography>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <Grid item>
                    <InputLabel required sx={{ lineHeight: 1.5, paddingBottom: "4px" }}>
                      Անուն
                    </InputLabel>
                    <TextField
                      sx={{
                        width: { md: "320px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        margin: 0,
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                      }}
                      id="name"
                      name="name"
                      placeholder="Անուն"
                      variant="outlined"
                      helperText={errors.name}
                      value={values.name}
                      error={!!errors.name}
                      onChange={(event) => {
                        setFieldValue("name", event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={7} md={12}>
                    <InputLabel required sx={{ lineHeight: 1.5, paddingBottom: "4px" }}>
                      Էլեկտրոնային հասցե
                    </InputLabel>
                    <TextField
                      sx={{
                        width: { md: "320px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                      }}
                      id="email"
                      name="email"
                      placeholder="Էլեկտրոնային հասցե"
                      variant="outlined"
                      helperText={errors.email}
                      value={values.email}
                      error={!!errors.email}
                      onChange={(event) => {
                        setFieldValue("email", event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={7} md={12}>
                    <InputLabel required sx={{ lineHeight: 1.5, paddingBottom: "4px" }}>
                      Գաղտնաբառ
                    </InputLabel>
                    <TextField
                      sx={{
                        width: { md: "320px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      type={showPassword ? "password" : "text"}
                      id="password"
                      name="password"
                      placeholder="Գաղտնաբառ"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                      }}
                      helperText={errors.password}
                      value={values.password}
                      error={!!errors.password}
                      onChange={(event) => {
                        setFieldValue("password", event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} md={12}>
                    <InputLabel required sx={{ lineHeight: 1.5, paddingBottom: "4px" }}>
                      Հաստատել գաղտնաբառը
                    </InputLabel>
                    <TextField
                      sx={{
                        width: { md: "320px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      type={showPassword ? "password" : "text"}
                      id="confimPwd"
                      name="confimPwd"
                      placeholder="Հաստատել գաղտնաբառը"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { color: "black", background: "#FFFFFF", borderRadius: "10px" },
                      }}
                      helperText={errors.confimPwd}
                      value={values.confimPwd}
                      error={!!errors.confimPwd}
                      onChange={(event) => {
                        setFieldValue("confimPwd", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item spacing={3}>
                <Grid item xs={7} md={12} sx={{ marginTop: "40px" }}>
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "#FFFFFF !important",
                      color: "#002B4D !important",
                      width: "320px",
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
                    Գրանցվել
                  </Button>
                </Grid>
                <Grid item xs={10} md={12} sx={{ marginTop: "10px" }}>
                  <Typography sx={{ fontSize: "14px", width: "100%" }}>
                    Արդեն գրանցված ե՞ք:&nbsp;
                    <Link
                      sx={{
                        fontSize: "14px",
                        color: "#002B4D !important",
                        "&:hover": {
                          color: "black !important",
                        },
                      }}
                      to="/authentication/sign-in"
                    >
                      Մուտք գործել
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </MDBox>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}

export default SignUp;
