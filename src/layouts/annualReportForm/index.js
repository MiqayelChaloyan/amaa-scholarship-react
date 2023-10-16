// react hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getApplicationById } from "hooks/allRequests/applicationApis";
import { createForm } from "hooks/allRequests/semesterReportFormsApi";

import MDBox from "components/MDBox";

// @mui material components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Validation schema
import { Form, Formik, useFormik } from "formik";
import { Link } from "@mui/material";
import validationSchema from "./validation";

function AnnualReportForm() {
  const [applicationId, setApplicationId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  // validation schema
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      // eduInstitute: "",
      // profession: "",
      course: "",
      semesterAverageQualityScore: "",
      annualAverageQualityScore: "",
      professionalLiterature: "",
      professionalKnowledge: "",
      jobProspect: "",
      volunteeringOrOther: "",
      personalGrowth: "",
      skillGrowth: "",
      usefullInitiative: "",
    },
    validationSchema,

    onSubmit: async (data) => {
      const body = {
        ...data,
        applicationId,
        course: +data.course,
        eduInstitute: "...",
        profession: "...",
      };
      const result = await createForm(body);
      if (result) {
        navigate("/submittedApplication");
      }
    },
  });
  useEffect(async () => {
    setApplicationId(params.id);
    const foundApplication = await getApplicationById({ appId: params.id });
    if (foundApplication.semesterReportForms.length) {
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
                variant="h2"
                component="h2"
                sx={{
                  color: "#002B4D",
                  marginBottom: "20px",
                }}
              >
                AMAA կրթաթոշակի ծրագիր տարեկան հաշվետվության ձևաթուղթ
              </Typography>

              <Grid container spacing={1}>
                {/* {mas-1} */}
                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      Մաս 1.
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      1․ Կուրս
                    </Typography>
                    <TextField
                      type="number"
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
                      id="course"
                      name="course"
                      placeholder=""
                      variant="outlined"
                      value={values.course}
                      helperText={errors.course}
                      error={!!errors.course}
                      onChange={(event) => {
                        setFieldValue("course", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "15px",
                      }}
                    >
                      2. Կիսամյակային միջին որակական գնահատական (ՄՈԳ) (նշեք Ձեր բուհ-ում կիրառելի
                      տարբերակը, օրինակ՝ 17 հնարավոր 20-ից, 3․5 հնարավոր 4-ից և այլն): Խնդրում ենք
                      նշել վերջին առկա ՄՈԳ-ը։
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
                      id="semesterAverageQualityScore"
                      name="semesterAverageQualityScore"
                      placeholder=""
                      variant="outlined"
                      value={values.semesterAverageQualityScore}
                      helperText={errors.semesterAverageQualityScore}
                      error={!!errors.semesterAverageQualityScore}
                      onChange={(event) => {
                        setFieldValue("semesterAverageQualityScore", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "15px",
                      }}
                    >
                      3. Տարեկան միջին որակական գնահատական (եթե դաշտը կիրառելի է՝ նշեք Ձեր բուհ-ում
                      կիրառելի տարբերակը, օրինակ՝ 17 հնարավոր 20-ից, 3․5 հնարավոր 4-ից և այլն)։ Եթե
                      կիրառելի չէ, նշեք՝ կիրառելի չէ։
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
                      id="annualAverageQualityScore"
                      name="annualAverageQualityScore"
                      placeholder=""
                      variant="outlined"
                      value={values.annualAverageQualityScore}
                      helperText={errors.annualAverageQualityScore}
                      error={!!errors.annualAverageQualityScore}
                      onChange={(event) => {
                        setFieldValue("annualAverageQualityScore", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                {/* {mas-2} */}

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      Մաս 2. Ուսումնական գործընթացի գնահատում
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      1. Ձեր մասնագիտական աճի համար ի՞նչ լրացուցիչ մասնագիտական գրականություն եք
                      ընթերցել հաշվետու ժամանակահատվածում։
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
                      id="professionalLiterature"
                      name="professionalLiterature"
                      placeholder=""
                      variant="outlined"
                      value={values.professionalLiterature}
                      helperText={errors.professionalLiterature}
                      error={!!errors.professionalLiterature}
                      onChange={(event) => {
                        setFieldValue("professionalLiterature", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "15px",
                      }}
                    >
                      2. Ձեր մասնագիտական գիտելիքները հաշվետու ժամանակահատվածում որևէ գործնական
                      կիրառություն ունեցե՞լ են։ Այո, ապա խնդրում ենք մանրամասնել․ ի՞նչ չափով և
                      կերպով (եթե մասնագիտության առանձնահատկությամբ և կուրսով պայմանավորված հարցը
                      կիրառելի չէ, խնդրում ենք նշել դա)։
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
                      id="professionalKnowledge"
                      name="professionalKnowledge"
                      placeholder=""
                      variant="outlined"
                      value={values.professionalKnowledge}
                      helperText={errors.professionalKnowledge}
                      error={!!errors.professionalKnowledge}
                      onChange={(event) => {
                        setFieldValue("professionalKnowledge", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "15px",
                      }}
                    >
                      3. Ըստ Ձեզ, ի՞նչ աշխատանքային հեռանկար է ընդգծում Ձեր առաջ Ձեր
                      մասնագիտությունը։
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
                      id="jobProspect"
                      name="jobProspect"
                      placeholder=""
                      variant="outlined"
                      value={values.jobProspect}
                      helperText={errors.jobProspect}
                      error={!!errors.jobProspect}
                      onChange={(event) => {
                        setFieldValue("jobProspect", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                {/* {mas-3} */}
                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="h4"
                      component="h4"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      Մաս 3. Կամավորություն, անձնային աճ
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      1. Հաշվետու ժամանակահատվածում ինչ-որ կամավորության ծրագրի կամ այլ
                      նախաձեռնության մասնակցե՞լ եք ( այո, խնդրում ենք հնարավորինս մանրամասնել՝
                      կազմակերպություն, պատասխանատվություն, ժամանակահատված։ Ոչ, խնդրում ենք
                      ներկայացնել պատճառ/ներ/ը)։
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
                      id="volunteeringOrOther"
                      name="volunteeringOrOther"
                      placeholder=""
                      variant="outlined"
                      value={values.volunteeringOrOther}
                      helperText={errors.volunteeringOrOther}
                      error={!!errors.volunteeringOrOther}
                      onChange={(event) => {
                        setFieldValue("volunteeringOrOther", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      2. Հաշվետու ժամանակահատվածում ի՞նչ եք արել Ձեր անձնային աճի համար և դա ի՞նչ է
                      տվել Ձեզ (խնդրում ենք նշել հնարավորինս հստակ)։
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
                      id="personalGrowth"
                      name="personalGrowth"
                      placeholder=""
                      variant="outlined"
                      value={values.personalGrowth}
                      helperText={errors.personalGrowth}
                      error={!!errors.personalGrowth}
                      onChange={(event) => {
                        setFieldValue("personalGrowth", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      3. Ի՞նչ փոփոխություններ է բերել դա Ձեր մեջ։ Գործնական ի՞նչ կիրառություն եք
                      տվել Ձեր հմտություններին և ինչպիսի՞ արդյունք է դա ունեցել (ցանկացած բան, որ
                      վստահ/կարծում եք, որ գործնական կիրառություն է եղել, խնդրում ենք նշել և
                      մանրամասնել)։
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
                      id="skillGrowth"
                      name="skillGrowth"
                      placeholder=""
                      variant="outlined"
                      value={values.skillGrowth}
                      helperText={errors.skillGrowth}
                      error={!!errors.skillGrowth}
                      onChange={(event) => {
                        setFieldValue("skillGrowth", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      4. Որևէ նախաձեռնություն/ներ/ Դուք անձամբ ունեցե՞լ եք հաշվետու
                      ժամանակահատվածում, որոնք եղել են հանրօգուտ ( Այո, խնդրում ենք մանրամասնել, Ոչ,
                      խնդրում ենք նշել պատճառ/ներ/ը)։
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
                      id="usefullInitiative"
                      name="usefullInitiative"
                      placeholder=""
                      variant="outlined"
                      value={values.usefullInitiative}
                      helperText={errors.usefullInitiative}
                      error={!!errors.usefullInitiative}
                      onChange={(event) => {
                        setFieldValue("usefullInitiative", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={4}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        marginTop: "40px",
                      }}
                    >
                      Շնորհակալություն հաշվետվությունն ուղարկելու համար։
                    </Typography>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                        fontSize: "15px",
                      }}
                    >
                      AMAA կրթաթոշակի 2021-2022 ուս․ տարվա հարգելի՛ մասնակից, եթե Դուք ունեք տրված
                      հարցերից որևէ մեկի վերաբերյալ պարզաբանման կարիք կամ ծրագրային հարց, խնդրում
                      ենք կապ հաստատել մեզ հետ զանգելով +374 41 402046 հեռախոսահամարին կամ գրել
                      <Link
                        target="_blank"
                        variant="body2"
                        underline="always"
                        sx={{
                          fontSize: "12px",
                          color: "#0080EB",
                        }}
                        href="mailto:scholarship@amaa.am"
                      >
                        {"  scholarship@amaa.am  "}
                      </Link>
                      {" , "}
                      <Link
                        target="_blank"
                        variant="body2"
                        underline="always"
                        sx={{
                          fontSize: "12px",
                          color: "#0080EB",
                        }}
                        href="mailto:scholarship@amaa.am"
                      >
                        {"  narine.galstyan@amaa.am  "}
                      </Link>
                      էլ․ հասցեներից մեկին (կոնտակտային անձ՝ Նարինե Գալստյան, ուսանողների հետ
                      հաղորդակցության պատասխանատո): Շնորհակալություն հաշվետվությունն ուղարկելո
                      համար։
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
                    Ուղարկել
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

export default AnnualReportForm;
