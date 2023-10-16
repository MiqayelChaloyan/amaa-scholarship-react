import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import { Form, Formik, useFormik } from "formik";
// eslint-disable-next-line no-unused-vars
import { resetPassword, forgotPasswordVerify } from "hooks/allRequests/userApis";

import validationSchema from "./validation";

const { useEffect, useState } = require("react");
const { useLocation, Link } = require("react-router-dom");

function ForgotPasswordVerify() {
  const location = useLocation();
  const [changed, setChanged] = useState("");
  const [user, setUser] = useState({});
  useEffect(async () => {
    const param = location.search.substring(1).split("=");
    const result = await forgotPasswordVerify({ verification: param[1] });
    if (result.email) {
      setUser(result);
    } else {
      setUser(false);
    }
  }, []);

  const [showPassword, setShowPassword] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      password: "",
      confimPwd: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      const result = await resetPassword({ email: user.email, password: data.password });
      if (result.email) {
        setChanged("Գաղտնաբառը փոխված է կարող եք մուտք գործել։");
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
                Փոխել գաղտնաբառը
              </Typography>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <Grid item xs={7} md={12}>
                    <InputLabel required shrink sx={{ marginBottom: "10px", lineHeight: 1.5 }}>
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
                  <Grid item xs={7} md={12}>
                    <InputLabel required shrink sx={{ marginBottom: "10px", lineHeight: 1.5 }}>
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
                    Հաստատել
                  </Button>
                </Grid>
              </Grid>
              <Grid container item spacing={3}>
                <Grid item xs={7} md={12} sx={{ marginTop: "40px", fontSize: "14px" }}>
                  {changed ? (
                    <>
                      <Typography sx={{ fontSize: "14px" }}>{changed}</Typography>
                      <Link to="/authentication/sign-in">Մուտք գործել</Link>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </MDBox>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}

export default ForgotPasswordVerify;
