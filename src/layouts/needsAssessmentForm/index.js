/* eslint-disable no-underscore-dangle */

// react hooks
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MDBox from "components/MDBox";

// @mui material components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

// hooks
import { createForm } from "hooks/allRequests/studentNeedAssessmentFormsApi";
import { getApplicationById } from "hooks/allRequests/applicationApis";

// Validation schema
import { Form, Formik, useFormik } from "formik";

import { BpCheckedIcon, BpIcon } from "../../components/MDRadio";

import validationSchema from "./validation";

function NeedsAssessmentForm() {
  const [detailAboutVolunteering, setDetailAboutVolunteering] = useState(false);
  const [detailAboutInternship, setDetailAboutInternship] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // validation schema
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      participateVolunteering: "",
      detailAboutVolunteering: "",
      interestedVolunteeringAMAADetails: "",
      participateInternshipProgram: "",
      detailAboutInternship: "",
      interestedInternshipAMAADetails: "",
      plansForNext5years: "",
      readyRealizeGoals: "",
      requiredLifeSkills: "",
      participateAMAALifeSkillsCourse: "",
      organizeProCommunityActivitie: "",
    },
    validationSchema,

    onSubmit: async (data) => {
      const body = { ...data, applicationId };
      if (data.participateVolunteering === "Այո") {
        body.participateVolunteering = true;
      } else {
        body.participateVolunteering = false;
      }
      if (data.participateInternshipProgram === "Այո") {
        body.participateInternshipProgram = true;
      } else {
        body.participateInternshipProgram = false;
      }
      const result = await createForm(body);
      if (result) {
        navigate("/submittedApplication");
      }
    },
  });

  const createInputOne = () =>
    values.participateVolunteering === "Այո"
      ? setDetailAboutVolunteering(true)
      : setDetailAboutVolunteering(false);

  useEffect(() => {
    createInputOne();
  }, [values.participateVolunteering]);

  const createInputTwo = () =>
    values.participateInternshipProgram === "Այո"
      ? setDetailAboutInternship(true)
      : setDetailAboutInternship(false);

  useEffect(() => {
    createInputTwo();
  }, [values.participateInternshipProgram]);

  useEffect(async () => {
    setApplicationId(params.id);
    const foundApplication = await getApplicationById({ appId: params.id });
    if (foundApplication && foundApplication?.status !== "pre-approved") {
      navigate("/submittedApplication");
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
        <Formik initialValues onSubmit={handleSubmit}>
          <Form>
            <MDBox
              sx={{
                width: { md: "990px", sm: "300px", xs: "320px" },
              }}
              mx={2}
              my={2}
              pt={6}
              pb={8}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: "#002B4D",
                  marginBottom: "20px",
                  fontFamily: "Mardoto-Black",
                  fontSize: "32px",
                }}
              >
                ՁԵՎԱԹՈՒՂԹ
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{
                  color: "#002B4D",
                  marginBottom: "40px",
                  fontFamily: "Mardoto-Bold",
                  fontSize: "28px",
                }}
              >
                Ամերիկայի Հայ Ավետարանչական ընկերակցության (AMAA) Կրթաթոշակի ծրագրի մասնակիցների
                կարիքների գնահատման
              </Typography>

              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "28px",
                      }}
                    >
                      Մաս 1. Կամավորություն
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      1. Երբևէ մասնակցե՞լ կամ մասնակցու՞մ եք որևէ կամավորական ծրագրի։
                    </Typography>
                    <RadioGroup
                      sx={{
                        flexDirection: "row !important",
                      }}
                      aria-labelledby="radio-buttons"
                      defaultValue=""
                      id="participateVolunteering"
                      name="participateVolunteering"
                      value={values.participateVolunteering}
                      onChange={(event) => {
                        setFieldValue("participateVolunteering", event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="Այո"
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                          />
                        }
                        label="Այո"
                      />
                      <FormControlLabel
                        value="Ոչ"
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                          />
                        }
                        label="Ոչ"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>

                {detailAboutVolunteering && (
                  <Grid container item spacing={3}>
                    <Grid item xs={12} md={12}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          color: "#002B4D",
                          marginBottom: "20px",
                          fontFamily: "Mardoto-Bold",
                          fontSize: "20px",
                        }}
                      >
                        Եթե այո, խնդրում ենք մանրամասնել (կազմակերպություն, ծրագրի անվանում,
                        տևողություն, պատասխանատվություն և այլն)։
                      </Typography>
                      <TextField
                        sx={{
                          width: { md: "998px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                        inputProps={{
                          style: {
                            color: "black",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                          },
                        }}
                        id="detailAboutVolunteering"
                        name="detailAboutVolunteering"
                        placeholder=""
                        variant="outlined"
                        value={values.detailAboutVolunteering}
                        helperText={errors.detailAboutVolunteering}
                        error={!!errors.detailAboutVolunteering}
                        onChange={(event) => {
                          setFieldValue("detailAboutVolunteering", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "15px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      2. Որքանո՞վ եք հետաքրքրված՝ կամավորելու AMAA-ի որևէ ծրագրում։ Խնդրում ենք
                      հնարավորինս մանրամասնել՝ նշելով ինչպես ոլորտը, այնպես էլ ձեր ներգրավվածության
                      աստիճանը (AMAA-ի գործունեության և իրականացվող ծրագրերի մասին կարող եք
                      ծանոթանալ այստեղ)։
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        marginBottom: "40px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="interestedVolunteeringAMAADetails"
                      name="interestedVolunteeringAMAADetails"
                      placeholder=""
                      variant="outlined"
                      value={values.interestedVolunteeringAMAADetails}
                      helperText={errors.interestedVolunteeringAMAADetails}
                      error={!!errors.interestedVolunteeringAMAADetails}
                      onChange={(event) => {
                        setFieldValue("interestedVolunteeringAMAADetails", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "28px",
                      }}
                    >
                      Մաս 2. Պրակտիկա
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      3. Մասնակցե՞լ եք երբևէ կամ մասնակցո՞ւմ եք որևէ պրակտիկայի ծրագրի։
                    </Typography>
                    <RadioGroup
                      sx={{
                        flexDirection: "row !important",
                      }}
                      aria-labelledby="radio-buttons"
                      defaultValue=""
                      id="participateInternshipProgram"
                      name="participateInternshipProgram"
                      value={values.participateInternshipProgram}
                      onChange={(event) => {
                        setFieldValue("participateInternshipProgram", event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="Այո"
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                          />
                        }
                        label="Այո"
                      />
                      <FormControlLabel
                        value="Ոչ"
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                          />
                        }
                        label="Ոչ"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>

                {detailAboutInternship && (
                  <Grid container item spacing={3}>
                    <Grid item xs={7} md={12}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          color: "#002B4D",
                          marginBottom: "20px",
                          fontFamily: "Mardoto-Bold",
                          fontSize: "20px",
                        }}
                      >
                        Եթե այո, խնդրում ենք մանրամասնել (ծրագրի անվանում, տևողություն,
                        պատասխանատվություն և այլն)։
                      </Typography>
                      <TextField
                        sx={{
                          width: { md: "998px", sm: "320px", xs: "320px" },
                          borderRadius: "10px",
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                        inputProps={{
                          style: {
                            color: "black",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                          },
                        }}
                        id="detailAboutInternship"
                        name="detailAboutInternship"
                        placeholder=""
                        variant="outlined"
                        value={values.detailAboutInternship}
                        helperText={errors.detailAboutInternship}
                        error={!!errors.detailAboutInternship}
                        onChange={(event) => {
                          setFieldValue("detailAboutInternship", event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "15px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      4. AMAA-ն ունի պրակտիկայի մի շարք հնարավորություններ իր տարբեր ծրագրերի
                      շրջանակներում (կրթական, սոցիալական, առողջապահական և այլն)։ Խնդրում ենք նշել,
                      թե որքանով են պրակտիկայի այդ հնարավորությունները Ձեզ հետաքրքրում և ինչպիսի
                      ներգրավվածություն եք տեսնում (եթե ցանկանում եք նշել այլ ոլորտ կամ ծրագիր,
                      որում կցանկանայիք պրակտիկա անցնել, խնդրում ենք գրել)։
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        marginBottom: "40px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="interestedInternshipAMAADetails"
                      name="interestedInternshipAMAADetails"
                      placeholder=""
                      variant="outlined"
                      value={values.interestedInternshipAMAADetails}
                      helperText={errors.interestedInternshipAMAADetails}
                      error={!!errors.interestedInternshipAMAADetails}
                      onChange={(event) => {
                        setFieldValue("interestedInternshipAMAADetails", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "28px",
                      }}
                    >
                      Մաս 3. Անձնային աճ
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      5. Որո՞նք են Ձեր՝ առաջիկա 5 տարվա նախանշված պլանները/նպատակները և ինչպե՞ս են
                      դրանք որոշվել։
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="plansForNext5years"
                      name="plansForNext5years"
                      placeholder=""
                      variant="outlined"
                      value={values.plansForNext5years}
                      helperText={errors.plansForNext5years}
                      error={!!errors.plansForNext5years}
                      onChange={(event) => {
                        setFieldValue("plansForNext5years", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      6. Ըստ Ձեզ, որքանո՞վ եք պատրաստ՝ իրագործելու այդ նպատակները։
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="readyRealizeGoals"
                      name="readyRealizeGoals"
                      placeholder=""
                      variant="outlined"
                      value={values.readyRealizeGoals}
                      helperText={errors.readyRealizeGoals}
                      error={!!errors.readyRealizeGoals}
                      onChange={(event) => {
                        setFieldValue("readyRealizeGoals", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      7. Ի՞նչ ոչ մասնագիտական՝ կյանքի հմտությունների (օրինակ՝ ռազմավարական
                      պլանավորում, փոփոխությունների կառավարում, քննադատական մտածողություն, համոզելու
                      կարողություն, հուզական բանականություն և այլն) կարիք ունեք։ Խնդրում ենք նշել
                      Ձեր կողմից առաջարկվող այլ տարբերակներ, եթե կան այդպիսիք։
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="requiredLifeSkills"
                      name="requiredLifeSkills"
                      placeholder=""
                      variant="outlined"
                      value={values.requiredLifeSkills}
                      helperText={errors.requiredLifeSkills}
                      error={!!errors.requiredLifeSkills}
                      onChange={(event) => {
                        setFieldValue("requiredLifeSkills", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      8. Կմասնակցե՞ք արդյոք AMAA-ի կողմից կազմակերպվող ոչ մասնագիտական
                      հմտություններին վերաբերող դասընթացների և-կամ միջոցառումներին։ Եթե այո, որքա՞ն
                      ժամանակ կկարողանաք տրամադրել։
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="participateAMAALifeSkillsCourse"
                      name="participateAMAALifeSkillsCourse"
                      placeholder=""
                      variant="outlined"
                      value={values.participateAMAALifeSkillsCourse}
                      helperText={errors.participateAMAALifeSkillsCourse}
                      error={!!errors.participateAMAALifeSkillsCourse}
                      onChange={(event) => {
                        setFieldValue("participateAMAALifeSkillsCourse", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      9. Երբևէ մտածե՞լ եք Ձեր համայնքի կամ միջավայրի երիտասարդներին Ձեր կողմից
                      կազմակերպված համայնքանպաստ գործունեության մեջ ներգրավելու մասին։ Եթե այո, ապա
                      ի՞նչ ծրագիր (գաղափար) է դա եղել և ի՞նչ գործողություններ են արվել։
                    </Typography>
                    <TextField
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        borderRadius: "10px",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                      inputProps={{
                        style: {
                          color: "black",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                        },
                      }}
                      id="organizeProCommunityActivitie"
                      name="organizeProCommunityActivitie"
                      placeholder=""
                      variant="outlined"
                      value={values.organizeProCommunityActivitie}
                      helperText={errors.organizeProCommunityActivitie}
                      error={!!errors.organizeProCommunityActivitie}
                      onChange={(event) => {
                        setFieldValue("organizeProCommunityActivitie", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "40px",
                        fontFamily: "Mardoto-Bold",
                        fontSize: "20px",
                      }}
                    >
                      Շնորհակալություն հարցմանը մասնակցելու համար:
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontSize: "16px",
                        fontFamily: "Mardoto-Medium",
                      }}
                    >
                      AMAA-ի Կրթաթոշակի ծրագրի հարգելի՛ մասնակից, եթե Դուք ունեք տրված հարցերից որևէ
                      մեկի վերաբերյալ պարզաբանման կարիք կամ ծրագրային հարց, խնդրում ենք կապ հաստատել
                      մեզ հետ +374 41 40 20 46 հեռախոսահամարի միջոցով կամ գրել scholarship@amaa.am
                      էլ. հասցեին (կոնտակտային անձ՝ Նարինե Գալստյան՝ ուսանողների հետ հաղորդակցության
                      պատասխանատու):
                    </Typography>
                  </Grid>
                </Grid>

                <MDBox
                  sx={{
                    width: { md: "990px", sm: "320px", xs: "320px" },
                    marginTop: "90px",
                    marginLeft: "7px",
                  }}
                >
                  <Button
                    type="submit"
                    sx={{
                      marginLeft: 0,
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
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}

export default NeedsAssessmentForm;
