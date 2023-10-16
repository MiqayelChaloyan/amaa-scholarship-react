/* eslint-disable no-underscore-dangle */
import { Grid, Typography, Box, Button } from "@mui/material";
import MDBox from "components/MDBox";

import PageLayout from "examples/LayoutContainers/PageLayout";
import { getApplicationById } from "hooks/allRequests/applicationApis";
import Navbar from "layouts/home/components1/navbar/index";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Stepper from "components/Stepper";
import MobileStepper from "components/Stepper/mobile";

// time zone
import { ZonedDate } from "@progress/kendo-date-math";
import "@progress/kendo-date-math/tz/Asia/Yerevan";
import { getDateForFillReportForm } from "hooks/allRequests/semesterReportFormsApi";

function SubmittedApplication() {
  const [application, setApplication] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  const [reportForm, setReportForm] = useState(false);

  useEffect(async () => {
    const appId = localStorage.getItem("applicationId");
    const foundApplication = await getApplicationById({ appId });
    if (foundApplication.status === "created" || foundApplication.status === "returned") {
      navigate("/personalInformation");
    } else {
      const date = new Date(foundApplication.birthday);
      const tzBirthdayDate = ZonedDate.fromUTCDate(date, "Asia/Yerevan");
      const birthdayArr = tzBirthdayDate.toLocaleDateString().split(".");
      const birthday = `${birthdayArr[2]}-${birthdayArr[1]}-${birthdayArr[0]}`;
      setApplication({ ...foundApplication, birthday });
      localStorage.setItem("activeStep", 7);
      const fillDate = await getDateForFillReportForm();
      const tzFillDate = ZonedDate.fromUTCDate(
        new Date(fillDate.dayForSemesterReportForm),
        "Asia/Yerevan"
      );
      const fillDateArr = tzFillDate.toLocaleDateString().split(".");
      const fillDateResult = `${fillDateArr[2]}-${fillDateArr[1]}-${fillDateArr[0]}`;
      if (
        new Date().getTime() > new Date(fillDateResult).getTime() &&
        !foundApplication.semesterReportForms.length
      ) {
        setReportForm(true);
      }
    }
  }, []);

  function fillForm() {
    navigate(`/needAssessmentForm/${application._id}`);
  }

  function fillReportForm() {
    navigate(`/annualReportForm/${application._id}`);
  }
  return (
    <PageLayout>
      <MDBox pt={6} pb={3}>
        <Navbar />
        <Grid container spacing={3}>
          {isMobile ? <Stepper stage={7} /> : <MobileStepper stage={7} />}
        </Grid>
      </MDBox>

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
                color: "#002B4D",
                marginBottom: "20px",
                fontWeight: "500",
                fontSize: "24px",
              }}
            >
              Ամբողջական լրացված դիմումը
            </Typography>
            <Grid container spacing={1}>
              <Grid container item spacing={3}>
                <Grid item xs={7} md={4}>
                  <Typography
                    sx={{
                      color: "#002B4D",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24px",
                    }}
                  >
                    1. Հանձնված է
                  </Typography>
                  <Box
                    sx={{
                      transition: "all 0.5s",
                      width: "320px",
                      height: "8px",
                      borderRadius: "10px",
                    }}
                    style={
                      application.status !== "created"
                        ? { backgroundColor: "#33C9BF" }
                        : { backgroundColor: "#FFFFFF" }
                    }
                  >
                    {/* ok */}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                      color: "#002B4D",
                    }}
                  >
                    Ձեր տվյալներն ամբողջությամբ մուտք են արվել։
                  </Typography>
                </Grid>
                {application.status === "returned" ? (
                  <Grid item xs={7} md={4}>
                    <Typography
                      sx={{
                        color: "#002B4D",
                        fontWeight: "500",
                        fontSize: "18px",
                        lineHeight: "24px",
                      }}
                    >
                      2. Վերադարձված է
                    </Typography>
                    <Box
                      sx={{
                        width: "320px",
                        height: "8px",
                        backgroundColor: "#33C9BF",
                        borderRadius: "10px",
                      }}
                      style={
                        application.status !== "created" &&
                        application.status !== "submitted" &&
                        application.status !== "approved" &&
                        application.status !== "pre-approved"
                          ? { backgroundColor: "#33C9BF" }
                          : { backgroundColor: "#FFFFFF" }
                      }
                    >
                      {/* ok */}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#002B4D",
                      }}
                    >
                      Հանձնաժողովն ետ է վերադարձրել ձեր դիմումը։
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={7} md={4}>
                    <Typography
                      sx={{
                        color: "#002B4D",
                        fontWeight: "500",
                        fontSize: "18px",
                        lineHeight: "24px",
                      }}
                    >
                      2. Ընդունված է
                    </Typography>
                    <Box
                      sx={{
                        width: "320px",
                        height: "8px",
                        backgroundColor: "#33C9BF",
                        borderRadius: "10px",
                      }}
                      style={
                        application.status !== "created" && application.status !== "submitted"
                          ? { backgroundColor: "#33C9BF" }
                          : { backgroundColor: "#FFFFFF" }
                      }
                    >
                      {/* ok */}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#002B4D",
                      }}
                    >
                      Հանձնաժողովն ընդունել է Ձեր դիմումը։
                    </Typography>
                  </Grid>
                )}

                {application.status === "rejected" ? (
                  <Grid item xs={7} md={4}>
                    <Typography
                      sx={{
                        color: "#002B4D",
                        fontWeight: "500",
                        fontSize: "18px",
                        lineHeight: "24px",
                      }}
                    >
                      3. Մերժված է
                    </Typography>
                    <Box
                      sx={{
                        width: "320px",
                        height: "8px",
                        backgroundColor: "#33C9BF",
                        borderRadius: "10px",
                      }}
                      style={
                        application.status !== "created" &&
                        application.status !== "submitted" &&
                        application.status !== "returned" &&
                        application.status !== "accepted"
                          ? { backgroundColor: "#33C9BF" }
                          : { backgroundColor: "#FFFFFF" }
                      }
                    >
                      {/* ok */}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#002B4D",
                      }}
                    >
                      Ձեր կրթաթոշակը մերժվել է։
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={7} md={4}>
                    <Typography
                      sx={{
                        color: "#002B4D",
                        fontWeight: "500",
                        fontSize: "18px",
                        lineHeight: "24px",
                      }}
                    >
                      3. Հաստատված է
                    </Typography>
                    <Box
                      sx={{
                        width: "320px",
                        height: "8px",
                        backgroundColor: "#33C9BF",
                        borderRadius: "10px",
                      }}
                      style={
                        application.status !== "created" &&
                        application.status !== "submitted" &&
                        application.status !== "returned" &&
                        application.status !== "accepted"
                          ? { backgroundColor: "#33C9BF" }
                          : { backgroundColor: "#FFFFFF" }
                      }
                    >
                      {/* ok */}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "24px",
                        color: "#002B4D",
                      }}
                    >
                      Ձեր կրթաթոշակը հաստատվել է։
                    </Typography>
                    {application.status === "pre-approved" && (
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#002B4D",
                          marginTop: "10px",
                        }}
                      >
                        Լրանցնել կարիքների գնահատման ձևաթուղթը&nbsp;
                        <Button
                          type="button"
                          onClick={() => fillForm()}
                          sx={{
                            color: "#002B4D",
                            textDecoration: "underline",
                            padding: 0,
                          }}
                        >
                          Լրանցնել
                        </Button>
                      </Typography>
                    )}
                    {application.status === "approved" && reportForm ? (
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#002B4D",
                          marginTop: "10px",
                        }}
                      >
                        Լրանցնել հաշվետվության ձևաթուղթը&nbsp;
                        <Button
                          type="button"
                          onClick={() => fillReportForm()}
                          sx={{
                            color: "#002B4D",
                            textDecoration: "underline",
                            padding: 0,
                          }}
                        >
                          Լրանցնել
                        </Button>
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </MDBox>
          <MDBox
            sx={{
              width: { md: "990px", sm: "300px", xs: "300px" },
            }}
            mx={2}
            my={2}
            pt={6}
            pb={8}
          >
            {/* <Typography
              variant="h4"
              component="h4"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
                lineHeight: "24px",
                color: "#002B4D",
              }}
            >
              Անձնական տվյալներ
            </Typography> */}
            {/* <Grid container spacing={1}>
              <Grid container item spacing={4}>
                <Grid item xs={7} md={5}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#002B4D",
                      marginTop: "8px",
                    }}
                  >
                    Անուն՝
                  </Typography>
                  <Box
                    sx={{
                      width: "300px",
                      height: "48px",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "48px",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      paddingLeft: "12px",
                    }}
                  >
                    {application?.firstName}
                  </Box>
                </Grid>
                <Grid item xs={7} md={5}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#002B4D",
                      marginTop: "8px",
                    }}
                  >
                    Քաղաք՝
                  </Typography>
                  <Box
                    sx={{
                      width: "300px",
                      height: "48px",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "48px",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      paddingLeft: "12px",
                    }}
                  >
                    {application?.cityVillage}
                  </Box>
                </Grid>
              </Grid>
              <Grid container item spacing={4}>
                <Grid item xs={7} md={5}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#002B4D",
                      marginTop: "8px",
                    }}
                  >
                    Բջջային հեռախոս՝
                  </Typography>
                  <Box
                    sx={{
                      width: "300px",
                      height: "48px",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "48px",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      paddingLeft: "12px",
                    }}
                  >
                    {application?.phone}
                  </Box>
                </Grid>
                <Grid item xs={7} md={5}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#002B4D",
                      marginTop: "8px",
                    }}
                  >
                    Հասցե՝
                  </Typography>
                  <Box
                    sx={{
                      width: "300px",
                      height: "48px",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "48px",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      paddingLeft: "12px",
                    }}
                  >
                    {application?.address}
                  </Box>
                </Grid>
              </Grid>
              <Grid container item spacing={4}>
                <Grid item xs={7} md={5}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#002B4D",
                      marginTop: "8px",
                    }}
                  >
                    Էլեկտրոնային հասցե՝
                  </Typography>
                  <Box
                    sx={{
                      width: "300px",
                      height: "48px",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "48px",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      paddingLeft: "12px",
                    }}
                  >
                    {application?.email}
                  </Box>
                </Grid>
                <Grid item xs={7} md={5}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#002B4D",
                      marginTop: "8px",
                    }}
                  >
                    Ծննդյան տարին, ամիսը և ամսաթիվը՝
                  </Typography>
                  <Box
                    sx={{
                      width: "300px",
                      height: "48px",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "48px",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      paddingLeft: "12px",
                    }}
                  >
                    {application?.birthday}
                  </Box>
                </Grid>
                <Grid item xs={7} md={5}>
                  <Box
                    sx={{
                      width: "300px",
                      height: "60px",
                      fontWeight: "400",
                      fontSize: "16px",
                      lineHeight: "48px",
                      borderRadius: "10px",
                      background: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#002B4D",
                      }}
                    >
                      Սեռ
                    </Typography>

                    <Radio
                      disableRipple
                      color="default"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                      checked={application?.gender === "Արական"}
                    />
                    <Typography
                      sx={{
                        fontweight: "400",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#002B4D",
                      }}
                    >
                      Արական
                    </Typography>

                    <Radio
                      disableRipple
                      color="default"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                      checked={application?.gender === "Իգական"}
                    />
                    <Typography
                      sx={{
                        fontweight: "400",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#002B4D",
                      }}
                    >
                      Իգական
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid> */}
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default SubmittedApplication;
