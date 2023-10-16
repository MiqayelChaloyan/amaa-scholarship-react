/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";

// @mui material components
import {
  Grid,
  Box,
  Typography,
  Button,
  Link,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";

// @mui material styles components
import { useTheme } from "@mui/material/styles";

// @mui material icons
import SaveAltIcon from "@mui/icons-material/SaveAlt";

// apis
import { getApplicationById, changeApplication } from "hooks/allRequests/applicationApis";
import { getDownloadUrl } from "hooks/allRequests/uploadFileApis";

// Validation schema
import { Form, Formik, useFormik } from "formik";
import validationSchema from "./validation";

// Upload file
import Uploader from "./uploader/uploader";

import RecommendationLetterForm from "../../../assets/RecommendationLetterForm.pdf";

import pdf from "../../../assets/images/file-pdf-solid-240.png";

function StageEight({ handleCancel }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  const [arrayFiles, setArrayFiles] = useState([]);

  const [dateArray, setDateArray] = useState([]);
  const [dateArrayLetter, setDateArrayLetter] = useState([]);

  const [appId, setAppId] = useState("");
  const [submitted, setSubmitted] = useState("");

  const [passportError, setPassportError] = useState("");
  const [statementError, setStatementError] = useState("");
  const [transcriptError, setTranscriptError] = useState("");

  // validation schema
  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      expects_letters: "",
      expects_pastors: "",
    },
    validationSchema,

    onSubmit: async (data) => {
      const passport = arrayFiles.find((file) => file.type === "passport");
      const statement = arrayFiles.find((file) => file.type === "statement");
      const transcript = arrayFiles.find((file) => file.type === "transcript");
      if (!passport) {
        setPassportError("Անձնագրի դաշտը պարտադրի է։");
      }
      if (!statement) {
        setStatementError("Տեղեկանքի դաշտը պարտադրի է։");
      }
      if (!transcript) {
        setTranscriptError("Առաջադիմության թերթիկի դաշտը պարտադրի է։");
      }

      if (passport && statement && transcript) {
        setPassportError("");
        setStatementError("");
        setTranscriptError("");
        const createdApp = await changeApplication({
          body: { ...data, status: "submitted", submitted: new Date() },
          appId,
        });
        if (createdApp) {
          setSubmitted("Ուղարկված է։");
          navigate("/submittedApplication");
        }
      }
    },
  });
  async function seeAllFiles(applicationId) {
    const foundApplication = await getApplicationById({ appId: applicationId });
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of foundApplication.documents) {
      // eslint-disable-next-line no-await-in-loop
      const downloadUrl = await getDownloadUrl({
        blobName: file.url,
        containerNameEnd: `/scholarshipDocuments/${file.type}`,
      });
      result.push({ url: downloadUrl.sasUrl, type: file.type, appId });
    }
    setArrayFiles(result);
  }
  useEffect(async () => {
    // add number for select field
    for (let currentDate = 1; currentDate <= 10; currentDate += 1) {
      setDateArray((state) => [...state, currentDate]);
    }
    for (let currentDate = 1; currentDate <= 100; currentDate += 1) {
      setDateArrayLetter((state) => [...state, currentDate]);
    }
    const applicationId = localStorage.getItem("applicationId");
    setAppId(applicationId);
    const foundApplication = await getApplicationById({ appId: applicationId });
    setFieldValue(
      "expects_letters",
      foundApplication.expects_letters ? foundApplication.expects_letters : ""
    );
    setFieldValue(
      "expects_pastors",
      foundApplication.expects_pastors ? foundApplication.expects_pastors : ""
    );

    // get documents
    seeAllFiles(applicationId);
  }, []);

  function downloadFile() {
    const link = document.createElement("a");

    link.setAttribute("type", "hidden");
    link.href = RecommendationLetterForm;
    link.download = `RecommendationLetterForm.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
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
                }}
              >
                Փաստաթղթեր
              </Typography>
              <MDBox
                sx={{
                  width: { md: "990px", sm: "300px", xs: "300px" },
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <Button
                  type="button"
                  sx={{
                    backgroundColor: "#002B4D !important",
                    color: "#FFFFFF !important",
                    width: "250px",
                    height: "40px",
                    border: "1px solid #002B4D !important",
                    borderRadius: "10px !important",
                    textTransform: "none",
                  }}
                  onClick={() => seeAllFiles(appId)}
                >
                  Ցույց տալ բոլոր նիշքերը
                </Button>
              </MDBox>
              <Grid container spacing={1}>
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
                      1. Անձնագիր *
                    </Typography>
                    <MDBox>
                      <Uploader
                        fileType="passport"
                        appId={appId}
                        seeAllFiles={seeAllFiles}
                        setError={setPassportError}
                      />
                    </MDBox>
                    {passportError && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "5px",
                          marginLeft: "8px",
                        }}
                      >
                        {passportError}
                      </span>
                    )}
                    <Box>
                      {arrayFiles.map((file) =>
                        file.type === "passport" && !file.url.includes(".pdf") ? (
                          <img src={file.url} alt="passport" width={100} />
                        ) : file.type === "passport" ? (
                          <img src={pdf} alt="passport" width={60} />
                        ) : (
                          ""
                        )
                      )}
                    </Box>
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
                      2. Տեղեկանք ուսումնական հաստատությունից, որտեղ նշված կլինի ուսման վարձի չափը *
                    </Typography>
                    <MDBox>
                      <Uploader
                        fileType="statement"
                        appId={appId}
                        seeAllFiles={seeAllFiles}
                        setError={setStatementError}
                      />
                    </MDBox>
                    {statementError && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "5px",
                          marginLeft: "8px",
                        }}
                      >
                        {statementError}
                      </span>
                    )}
                    <Box>
                      {arrayFiles.map((file) =>
                        file.type === "statement" && !file.url.includes(".pdf") ? (
                          <img src={file.url} alt="statement" width={100} />
                        ) : file.type === "statement" ? (
                          <img src={pdf} alt="statement" width={60} />
                        ) : (
                          ""
                        )
                      )}
                    </Box>
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
                      3. Ուսման առաջադիմության վերջին 2 տարիների թերթիկ *
                    </Typography>
                    <MDBox>
                      <Uploader
                        fileType="transcript"
                        appId={appId}
                        seeAllFiles={seeAllFiles}
                        setError={setTranscriptError}
                      />
                    </MDBox>
                    {transcriptError && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "5px",
                          marginLeft: "8px",
                        }}
                      >
                        {transcriptError}
                      </span>
                    )}
                    <Box>
                      {arrayFiles.map((file) =>
                        file.type === "transcript" && !file.url.includes(".pdf") ? (
                          <img src={file.url} alt="transcript" width={100} />
                        ) : file.type === "transcript" ? (
                          <img src={pdf} alt="transcript" width={60} />
                        ) : (
                          ""
                        )
                      )}
                    </Box>
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
                      4. Ձեր ակադեմիական կարողությունը և բնութագիրը հաստատող 3 (երեք) հանձնարարական
                      նամակներ (հանձնարարական նամակները չեն կարող լինել ընկերների կամ ազգականների
                      կողմից և առնվազն մեկ նամակ պետք է լինի դասախոսի կողմից): Նշել նաև բնութագիրը
                      հաստատող անձի անուն ազգանունը, պաշտոնը և հեռախոսի համարը, ինչպես նաև կապը
                      տվյալ անձանց հետ, որքան ժամանակ է ճանաչում եք և ինչպես եք ծանոթացել:
                    </Typography>
                    <MDBox
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch !important",
                      }}
                    >
                      <Grid container item spacing={3}>
                        <Grid item xs={7} md={7}>
                          <Typography
                            sx={{
                              color: "#667F94",
                              marginBottom: "20px",
                              fontSize: "12px",
                              marginTop: "10px",
                              lineHeight: 1.5,
                              width: { md: "998px", sm: "320px", xs: "320px" },
                            }}
                          >
                            Ներբեռնեք և փոխանցեք հետևյալ հանձնարարական նամակի ձևը լրացնող անձին
                          </Typography>
                        </Grid>
                        <Grid item xs={7} md={5}>
                          <Button
                            variant="contained"
                            component="label"
                            sx={{
                              backgroundColor: "#002B4D !important",
                              color: "white !important",
                              width: "150px",
                              height: "40px",
                              border: "1px solid #002B4D !important",
                              borderRadius: "10px !important",
                              marginLeft: "20px",
                              textTransform: "none",
                            }}
                            onClick={() => downloadFile()}
                          >
                            <SaveAltIcon
                              sx={{
                                margin: "0 10px",
                              }}
                            />
                            Ներբեռնել
                          </Button>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      Ակնկալվող Նամակների քանակը
                    </Typography>
                    <Typography
                      sx={{
                        color: "#667F94",
                        marginBottom: "20px",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        width: { md: "998px", sm: "320px", xs: "320px" },
                      }}
                    >
                      Նշեք թե քանի անձի եք դիմել (դիմելու) հանձնարարական նամակի համար *
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        required
                        sx={{
                          color: "black",
                          width: { md: "998px", sm: "320px", xs: "320px" },
                          lineHeight: "3.1em",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                        }}
                        id="mails-expected-count"
                        name="expects_letters"
                        value={values.expects_letters}
                        onChange={(event) => {
                          setFieldValue("expects_letters", event.target.value);
                        }}
                      >
                        {dateArrayLetter.map((item) => (
                          <MenuItem key={Number(item)} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        width: { md: "998px", sm: "320px", xs: "320px" },
                      }}
                    >
                      Հանձնարարական նամակներ անհրաժեշ է ուղարկել
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
                      հասցեին կամ մեր գրասենյակ՝ Ք. Երևան, Բաղրամյան 18, Հեռախոս՝ (+374-10) 54-35-76
                    </Typography>
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
                        marginTop: "20px",
                      }}
                    >
                      5. Ցանկալի է և ոչ պարտադիր Եկեղեցու հոգևոր առաջնորդի կողմից երաշխավորագիր(Եթե
                      վերջինս չի երաշխավորում ուսանողին, նա կարող է պարզապես բնութագրական նամակ տալ
                      նրան: Նշել նաև եկեղեցու հոգևոր առաջնորդի անուն ազգանունը, պաշտոնը և հեռախոսի
                      համարը, երբվանից և որքան հաճախակի եք այցելում տվյալ եկեղեցին)։
                    </Typography>
                    <MDBox
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch !important",
                      }}
                    >
                      <Grid container item spacing={3}>
                        <Grid item xs={7} md={7}>
                          <Typography
                            sx={{
                              color: "#667F94",
                              marginBottom: "20px",
                              fontSize: "12px",
                              marginTop: "10px",
                              lineHeight: 1.5,
                              width: { md: "998px", sm: "320px", xs: "320px" },
                            }}
                          >
                            Ներբեռնեք և փոխանցեք հետևյալ հանձնարարական նամակի ձևը լրացնող անձին
                          </Typography>
                        </Grid>
                        <Grid item xs={7} md={5}>
                          <Button
                            variant="contained"
                            component="label"
                            sx={{
                              backgroundColor: "#002B4D !important",
                              color: "white !important",
                              width: "150px",
                              height: "40px",
                              border: "1px solid #002B4D !important",
                              borderRadius: "10px !important",
                              marginLeft: "20px",
                              textTransform: "none",
                            }}
                            onClick={() => downloadFile()}
                          >
                            <SaveAltIcon
                              sx={{
                                margin: "0 10px",
                              }}
                            />
                            Ներբեռնել
                          </Button>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>

                <Grid container item spacing={3}>
                  <Grid item xs={7} md={12}>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        width: { md: "998px", sm: "320px", xs: "320px" },
                        color: "#002B4D",
                        marginBottom: "20px",
                      }}
                    >
                      Երաշխավորագրերի քանակը*
                    </Typography>
                    <Typography
                      sx={{
                        color: "#667F94",
                        marginBottom: "20px",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        width: { md: "998px", sm: "320px", xs: "320px" },
                      }}
                    >
                      Նշեք, թե քանի անձի եք դիմել (դիմելու) երաշխավորագրի համար
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        required
                        sx={{
                          color: "black",
                          width: { md: "998px", sm: "320px", xs: "320px" },
                          lineHeight: "3.1em",
                          borderRadius: "10px",
                          background: "#FFFFFF",
                          "& fieldset": {
                            borderRadius: "10px",
                            border: "none",
                          },
                        }}
                        labelId="expects_pastors"
                        id="expects_pastors"
                        name="expects_pastors"
                        error={!!errors.expects_pastors}
                        value={values.expects_pastors}
                        onChange={(event) => {
                          setFieldValue("expects_pastors", event.target.value);
                        }}
                      >
                        {dateArray.map((item) => (
                          <MenuItem key={Number(item)} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography
                      variant="p"
                      component="p"
                      sx={{
                        color: "#667F94",
                        fontSize: "12px",
                        marginTop: "10px",
                        lineHeight: 1.5,
                        width: { md: "998px", sm: "320px", xs: "320px" },
                      }}
                    >
                      Հանձնարարական նամակներ անհրաժեշ է ուղարկել
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
                      հասցեին կամ մեր գրասենյակ՝ Ք. Երևան, Բաղրամյան 18, Հեռախոս՝ (+374-10) 54-35-76
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
                    style={
                      !isMobile ? { marginLeft: 0, marginTop: "10px" } : { marginLeft: "20px" }
                    }
                    sx={{
                      width: "250px",
                      backgroundColor: "#FFFFFF !important",
                      color: "#002B4D !important",
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
                    Ստուգել և հանձնել դիմումը
                  </Button>
                  {submitted ? (
                    <Typography
                      sx={{
                        color: "blue",
                      }}
                    >
                      {submitted}
                    </Typography>
                  ) : (
                    ""
                  )}
                </MDBox>
              </Grid>
            </MDBox>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}

// Setting default props for the StageEight
StageEight.defaultProps = {
  handleCancel: {},
};

// Typechecking props for the StageEight
StageEight.propTypes = {
  handleCancel: PropTypes.func,
};

export default StageEight;
