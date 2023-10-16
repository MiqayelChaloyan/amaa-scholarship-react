// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import { Grid, Box, Typography } from "@mui/material";

// data
import steps from "./data";

function Stepper({ stage }) {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Grid
          container
          sx={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "900px", md: "1003px", sm: "900px" },
              height: "224px",
              borderRadius: "10px",
              background: "#FFFFFF",
              margin: "80px auto",
              padding: "50px 50px",
              boxShadow: "0px 4px 48px rgba(204, 212, 219, 0.24)",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#F9FBFD",
                borderRadius: "20px",
                position: "relative",
                margin: "15px 0",
                height: "24px",
                width: "912px",
              }}
            >
              <Box
                sx={{
                  width: `${130 * stage}px`,
                  transition: "all 0.5s",
                  height: "24px",
                  borderRadius: "20px",
                  lineHeight: "31px",
                }}
                style={
                  stage === 7 ? { backgroundColor: "#1FB6AB" } : { backgroundColor: "#002B4D" }
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: `${130 * stage - 23}px`, transition: "all 0.5s !important" }}
                >
                  <circle cx="10" cy="10" r="10" fill="white" />
                  <path
                    d="M8.36642 13.7166C8.27753 13.7166 8.1942 13.7026 8.11642 13.6746C8.03864 13.647 7.96642 13.5999 7.89976 13.5333L5.03309 10.6666C4.91087 10.5444 4.85242 10.3859 4.85776 10.1913C4.86353 9.99705 4.92753 9.83882 5.04976 9.7166C5.17198 9.59438 5.32753 9.53327 5.51642 9.53327C5.70531 9.53327 5.86087 9.59438 5.98309 9.7166L8.36642 12.0999L14.0164 6.44993C14.1386 6.32771 14.2971 6.2666 14.4918 6.2666C14.686 6.2666 14.8442 6.32771 14.9664 6.44993C15.0886 6.57216 15.1498 6.73038 15.1498 6.9246C15.1498 7.11927 15.0886 7.27771 14.9664 7.39994L8.83309 13.5333C8.76642 13.5999 8.6942 13.647 8.61642 13.6746C8.53864 13.7026 8.45531 13.7166 8.36642 13.7166V13.7166Z"
                    fill="#002B4D"
                  />
                </svg>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "0 0",
              }}
            >
              {steps.map((item) => (
                <Box
                  key={item.page}
                  sx={{
                    display: "grid",
                    padding: " 0 10px",
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{ fontSize: { xs: 10, md: 10 }, marginBottom: "9px" }}
                  >
                    {item.page}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ fontSize: { xs: 10, md: 10 }, whiteSpace: "pre-line" }}
                    style={
                      item.page.slice(-1) <= stage ? { color: "#1FB6AB" } : { color: "#99AAB7" }
                    }
                  >
                    {item.step}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}

// Setting default props for the Stepper
Stepper.defaultProps = {
  stage: "",
};

// Typechecking props for the Stepper
Stepper.propTypes = {
  stage: PropTypes.node,
};

export default Stepper;
