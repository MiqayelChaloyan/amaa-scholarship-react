import MDBox from "components/MDBox";

// @mui material components
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Validation schema
import { Form, Formik, useFormik } from "formik";
import { forgotPassword } from "hooks/allRequests/userApis";

function ResetPassword() {
  // validation schema
  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (data) => {
      const result = await forgotPassword(data);
      if (!result.error) {
        // eslint-disable-next-line no-alert
        alert("Լինկը ուղարկված է, ստուգել էլ․ հասցեն։");
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
                Վերականգնել գաղտնաբառը
              </Typography>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <Grid item xs={7} md={12}>
                    <InputLabel shrink sx={{ marginBottom: "10px", lineHeight: 1.5 }}>
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
                      value={values.email}
                      onChange={(event) => {
                        setFieldValue("email", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item spacing={3}>
                <Grid item xs={7} md={12} sx={{ marginTop: "10px" }}>
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
                    Ուղարկել գաղտնաբառի վերականգնման հղումը
                  </Button>
                </Grid>
              </Grid>
            </MDBox>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}

export default ResetPassword;
