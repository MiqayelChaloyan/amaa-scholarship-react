// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import data from "./data";

function MobileStepper({ stage }) {
  const step = stage > 1 ? data.slice(stage - 2, stage + 1) : data.slice(stage - 1, stage + 1);

  return (
    <Grid container sx={{ display: "grid", alignItems: "center", justifyContent: "center" }}>
      <Box
        sx={{
          width: "339px",
          height: "186px",
          borderRadius: "10px",
          background: "#FFFFFF",
          margin: "40px auto",
          padding: "26px 46px",
          boxShadow: "0px 4px 48px rgba(204, 212, 219, 0.24)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F9FBFD",
            borderRadius: "20px",
            position: "relative",
            margin: "15px 0",
            height: "21px",
            width: "240px",
          }}
        >
          <Box
            sx={{
              width: `${31 * stage}px`,
              transition: "all 0.5s !important",
              height: "21px",
              borderRadius: "20px",
            }}
            style={stage === 8 ? { backgroundColor: "#1FB6AB" } : { backgroundColor: "#002B4D" }}
          >
            <CheckCircleIcon
              sx={{
                marginLeft: `${31 * stage - 23}px`,
                transition: "all 0.5s !important",
                fontSize: "23.3px !important",
                color: "#fff",
              }}
            />
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
          {step.map((item) => (
            <Box key={item.page} sx={{ padding: "0 0" }}>
              <Typography
                variant="p"
                component="p"
                sx={{
                  color: "#002B4D",
                  fontSize: "10px",
                }}
              >
                {item.page}
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ fontSize: { xs: 10, md: 10 }, whiteSpace: "pre-line" }}
                style={item.page.slice(-1) <= stage ? { color: "#1FB6AB" } : { color: "#99AAB7" }}
              >
                {item.step}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
  );
}

// Setting default props for the Stepper
MobileStepper.defaultProps = {
  stage: "",
};

// Typechecking props for the Stepper
MobileStepper.propTypes = {
  stage: PropTypes.node,
};

export default MobileStepper;
