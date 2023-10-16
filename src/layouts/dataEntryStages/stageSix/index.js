/* eslint-disable no-underscore-dangle */
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// import Rich text editor
import RichTextEditor from "components/RichTextEditor";

import MDBox from "components/MDBox";

// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import { getApplicationById, changeApplication } from "hooks/allRequests/applicationApis";

function StageSix({ handleNext, handleCancel }) {
  const [autobiography, setAutobiography] = useState("");
  const [application, setApplication] = useState({});

  const handleChange = async () => {
    const createdApp = await changeApplication({ body: { autobiography }, appId: application._id });
    if (createdApp) {
      handleNext();
    }
  };

  useEffect(async () => {
    const appId = localStorage.getItem("applicationId");
    const foundApplication = await getApplicationById({ appId });
    if (foundApplication) {
      setApplication(foundApplication);
      setAutobiography(foundApplication.autobiography ? foundApplication.autobiography : "");
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
          <Typography
            variant="h4"
            component="h4"
            sx={{
              width: { md: "998px", sm: "320px", xs: "320px" },
              color: "#002B4D",
              marginBottom: "20px",
            }}
          >
            Ինքնակենսագրություն
          </Typography>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <Grid item xs={12} md={12}>
                <RichTextEditor setText={setAutobiography} text={autobiography} />
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
                onClick={handleChange}
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
      </Grid>
    </Grid>
  );
}

// Setting default props for the StageSix
StageSix.defaultProps = {
  handleNext: {},
  handleCancel: {},
};

// Typechecking props for the StageSix
StageSix.propTypes = {
  handleNext: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default StageSix;
