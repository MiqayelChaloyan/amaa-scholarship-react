// @mui material components
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

// @mui material styles components
import { useTheme } from "@mui/material/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useEffect, useState } from "react";

import Navbar from "layouts/home/components1/navbar";
import Footer from "layouts/home/components1/footer";

import Stepper from "../../components/Stepper/index";

// Stages of registracion
import StageFirst from "../dataEntryStages/stageFirst";
import StageTwo from "../dataEntryStages/stageTwo";
import StageFour from "../dataEntryStages/stageFour";
import StageFive from "../dataEntryStages/stageFive";
import StageSix from "../dataEntryStages/stageSix";
import StageSeven from "../dataEntryStages/stageSeven";
import StageEight from "../dataEntryStages/stageEight";

// Mobile Stepper
import MobileStepper from "../../components/Stepper/mobile";

function PersonalInformation() {
  const [activeStep, setActiveStep] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  // Persistng state between page reloads
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("activeStep"))) {
      setActiveStep(JSON.parse(window.localStorage.getItem("activeStep")));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  const handleNext = () =>
    activeStep === 7
      ? setActiveStep(activeStep)
      : setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleCancel = () =>
    activeStep === 1
      ? setActiveStep(activeStep)
      : setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const stages = () => {
    switch (activeStep) {
      case 1:
        return <StageFirst handleNext={handleNext} />;
      case 2:
        return <StageTwo handleNext={handleNext} handleCancel={handleCancel} />;
      case 3:
        return <StageFour handleNext={handleNext} handleCancel={handleCancel} />;
      case 4:
        return <StageFive handleNext={handleNext} handleCancel={handleCancel} />;
      case 5:
        return <StageSix handleNext={handleNext} handleCancel={handleCancel} />;
      case 6:
        return <StageSeven handleNext={handleNext} handleCancel={handleCancel} />;
      case 7:
        return <StageEight handleNext={handleNext} handleCancel={handleCancel} />;
      default:
        return <StageFirst handleNext={handleNext} handleCancel={handleCancel} />;
    }
  };
  return (
    <PageLayout>
      <MDBox pt={6} pb={3}>
        <Navbar />
        <Grid container spacing={3}>
          {isMobile ? <Stepper stage={activeStep} /> : <MobileStepper stage={activeStep} />}
          {stages()}
        </Grid>
        <Footer />
      </MDBox>
    </PageLayout>
  );
}

export default PersonalInformation;
