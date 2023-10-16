import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logIn } from "hooks/allRequests/userApis";

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
import Link from "@mui/material/Link";

// Validation schema
import { Form, Formik, useFormik } from "formik";
import validationSchema from "./validation";

function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      const result = await logIn(data);
      if (result && !result?.error) {
        navigate("/personalInformation");
      } else if (result.message[0].constraints.isEmail === "email must be an email") {
        // eslint-disable-next-line no-alert
        alert("Էլ․ հասցեն արդեն օգտագործված է։");
      } else if (typeof result.message === "string") {
        // eslint-disable-next-line no-alert
        alert(result.message);
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
                Մուտք գործել
              </Typography>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <Grid item xs={7} md={12}>
                    <InputLabel required sx={{ marginBottom: "10px", lineHeight: 1.5 }}>
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
                    <InputLabel required sx={{ marginBottom: "10px", lineHeight: 1.5 }}>
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
                    Մուտք գործել
                  </Button>
                </Grid>
                <Grid item xs={7} md={12} sx={{ marginTop: "10px" }}>
                  <Button
                    type="button"
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
                    <Link href="/authentication/reset-password" underline="none">
                      Մոռացե՞լ եք Ձեր գաղտնաբառը
                    </Link>
                  </Button>
                </Grid>
                <Grid item xs={7} md={12} sx={{ marginTop: "10px" }}>
                  <Typography sx={{ fontSize: "14px" }}>
                    Գրանցված չե՞ք&nbsp;
                    <Link
                      sx={{
                        fontSize: "14px",
                        color: "#33C9BF",
                        "&:hover": {
                          color: "black !important",
                        },
                      }}
                      href="/authentication/sign-up"
                    >
                      Գրանցվել
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

export default Login;
