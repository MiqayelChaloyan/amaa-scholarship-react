import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import MDBox from "components/MDBox";
import typography from "assets/theme/base/typography";

import image from "../../../../assets/images/home-images/DSC07150 1.png";
import AMAAH4 from "../../../../components/AMAAH4";

function ApplyTheProgram() {
  return (
    <Box
      mt={8}
      display={{
        xs: "grid",
        sm: "grid",
        md: "grid",
        lg: "flex",
        xl: "flex",
      }}
      padding={{
        xs: "58px 0",
        sm: "58px 150px",
        md: "58px 120px",
        lg: "58px 120px",
        xl: "58px 120px",
      }}
      sx={{ background: "#FFFFFF" }}
    >
      <Container>
        <Grid
          container
          rowSpacing={2}
          sx={{
            flexWrap: "wrap-reverse",
            gridColumn: 1,
            gridRow: 2,
            marginTop: "35px",
            marginBottom: "30px",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <AMAAH4
              fontSize={{
                xs: "24px",
                sm: "24px",
                md: "32px",
              }}
              width={{
                xs: 278,
                sm: 278,
                md: 300,
                lg: 368,
                xl: 368,
              }}
              sx={{ marginBottom: "15px", fontFamily: "Mardoto-Medium" }}
            >
              Ծրագրին դիմելու համար հարկավոր է
            </AMAAH4>
            <Box
              display={{
                xs: "grid",
                sm: "grid",
                md: "grid",
                lg: "flex",
                xl: "grid",
              }}
            >
              <MDBox
                width={{
                  xs: 281,
                  sm: 426,
                  md: 353,
                  lg: 352,
                  xl: 352,
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                }}
              >
                <Box>
                  {" "}
                  <Box
                    sx={{
                      background: "#33C9BF",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50px",
                      opacity: 0.1,
                      position: "absolute",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      background: "#33C9BF",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50px",
                      position: "relative",
                      top: "7px",
                      left: "7px",
                    }}
                  >
                    {" "}
                  </Box>
                </Box>
                <Typography
                  variant="p"
                  fontSize={{
                    lg: "16px",
                    md: "16px",
                    sm: "14px",
                    xs: "14px",
                  }}
                  width={{
                    xs: 228,
                    sm: 228,
                    md: 297,
                    lg: 298,
                    xl: 298,
                  }}
                  sx={{
                    color: "black",
                    textAlign: "left",
                    fontFamily: typography.fontFamily,
                    fontSize: "16px",
                  }}
                >
                  գրանցվել
                  <Link
                    target="_blank"
                    variant="body2"
                    underline="always"
                    fontSize={{
                      lg: "16px",
                      md: "16px",
                      sm: "14px",
                      xs: "14px",
                    }}
                    sx={{
                      color: "#325570",
                      transition: "0.5s",
                      fontFamily: typography.fontFamily,
                      fontSize: "16px",
                      "&:hover": {
                        color: "#1FB6AB",
                      },
                    }}
                    href="http://scholarship.amaa.am/"
                  >
                    {"  scholarship.amaa.am  "}
                  </Link>{" "}
                  կայքում,
                </Typography>
              </MDBox>
              <MDBox
                height={{
                  xs: 60,
                  sm: 60,
                  md: 35,
                  lg: 60,
                  xl: 60,
                }}
                margin={{
                  xs: "-8px 11px",
                  sm: "-8px 11px",
                  md: "none",
                  lg: "-8px 11px",
                  xl: "-8px 11px",
                }}
                sx={{
                  borderLeft: "2px dashed #33C9BF",
                  width: "16px",
                }}
              >
                {" "}
              </MDBox>
              <MDBox
                width={{
                  xs: 281,
                  sm: 500,
                  md: 381,
                  lg: 440,
                  xl: 440,
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  marginBottom: "50px",
                }}
              >
                <Box>
                  {" "}
                  <Box
                    sx={{
                      background: "#33C9BF",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50px",
                      opacity: 0.1,
                      position: "absolute",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      background: "#33C9BF",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50px",
                      position: "relative",
                      top: "7px",
                      left: "7px",
                    }}
                  >
                    {" "}
                  </Box>
                </Box>
                <Typography
                  variant="p"
                  fontSize={{
                    lg: "16px",
                    md: "16px",
                    sm: "14px",
                    xs: "14px",
                  }}
                  sx={{
                    color: "black",
                    textAlign: "left",
                    margin: "-2px 45px",
                    fontFamily: typography.fontFamily,
                    fontSize: "16px",
                  }}
                >
                  լրացնել առցանց հայտը և կցել անհրաժեշտ փաստաթղթերը (դրա անհնարինության դեպքում կապ
                  հաստատել ծրագրի համակարգողի հետ հետևյալ հեռախոսահամարով՝ 010 54 35 76)։
                </Typography>
              </MDBox>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            sx={{ marginBottom: "50px", display: "flex", justifyContent: "center" }}
          >
            <Box
              width={{
                xs: "300px",
                sm: "300px",
                md: "500px",
                lg: "500px",
                xl: "500px",
              }}
              height={{
                xs: "200px",
                sm: "200px",
                md: "300px",
                lg: "300px",
                xl: "300px",
              }}
              sx={{
                background: "#33C9BF",
                position: "absolute",
                opacity: 0.6,
                borderRadius: "10px",
                transform: "rotate(-12deg)",
              }}
            >
              {" "}
            </Box>
            <Box
              component="img"
              width={{
                xs: "300px",
                sm: "300px",
                md: "auto",
                lg: "auto",
                xl: "auto",
              }}
              sx={{
                borderRadius: "10px",
                position: "relative",
                zIndex: 1,
                left: 0,
                top: 0,
              }}
              alt="Image of part of apply the program"
              src={`${image}`}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ApplyTheProgram;
