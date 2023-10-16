import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import typography from "assets/theme/base/typography";

// icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import image from "../../../../assets/images/home-images/DSC08026 1.png";
import AMAAH4 from "../../../../components/AMAAH4";

function ScholarshipHolder() {
  return (
    <Box
      marginTop={{
        xs: 15,
        sm: 15,
        md: 18,
        lg: 8,
        xl: 8,
      }}
      display={{
        xs: "grid",
        sm: "grid",
        md: "grid",
        lg: "flex",
        xl: "flex",
      }}
      padding={{
        xs: "58px 37px",
        sm: "58px 150px",
        md: "58px 120px",
        lg: "191px 120px",
        xl: "191px 120px",
      }}
      height={{
        xs: 940,
        sm: 940,
        md: 800,
        lg: 400,
        xl: 400,
      }}
      sx={{ background: "#EFF3F7" }}
    >
      <Container>
        <Grid
          container
          rowSpacing={12}
          sx={{
            flexWrap: "wrap",
            gridColumn: 1,
            gridRow: 2,
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            sx={{
              display: "grid",
              padding: "0 !important",
              marginTop: "50px",
            }}
            justifyContent={{
              xs: "revert",
              sm: "revert",
              md: "center",
              lg: "revert",
              xl: "revert",
            }}
          >
            <Box
              width={{
                xs: "265px",
                sm: "265px",
                md: "200px",
                lg: "200px",
                xl: "200px",
              }}
              height={{
                xs: "249px",
                sm: "249px",
                md: "200px",
                lg: "200px",
                xl: "200px",
              }}
              sx={{
                left: "1px",
                position: "relative",
                top: "32px",
                background: "#3255707a",
                opacity: 5,
                borderRadius: "10px",
              }}
            >
              <Box
                width={{
                  xs: "265px",
                  sm: "265px",
                  md: "200px",
                  lg: "200px",
                  xl: "200px",
                }}
                height={{
                  xs: "249px",
                  sm: "249px",
                  md: "200px",
                  lg: "200px",
                  xl: "200px",
                }}
                sx={{
                  position: "relative",
                  top: "-18px",
                  left: "21px",
                  background: "#325570",
                  opacity: 5,
                  borderRadius: "10px",
                }}
              >
                <Box
                  component="img"
                  width={{
                    xs: "257px",
                    sm: "257px",
                    md: "200px",
                    lg: "200px",
                    xl: "200px",
                  }}
                  height={{
                    xs: "247px",
                    sm: "247px",
                    md: "200px",
                    lg: "200px",
                    xl: "200px",
                  }}
                  sx={{
                    borderRadius: "10px",
                    position: "absolute",
                    zIndex: 1,
                    right: 0,
                    bottom: "144px",
                    left: {
                      xs: "27px",
                      sm: "27px",
                      md: "19px",
                      lg: "22px",
                      xl: "22px",
                    },
                    top: "-23px",
                    marginBottom: "50px",
                  }}
                  alt="Image of part of apply the program"
                  src={`${image}`}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={9}
            xl={9}
            sx={{ padding: "0 !important", marginTop: "50px" }}
          >
            <AMAAH4
              fontSize={{
                xs: 24,
                sm: 24,
                md: 32,
              }}
              width={{
                xs: 278,
                sm: 278,
                md: 300,
                lg: 556,
                xl: 556,
              }}
              sx={{ fontWeight: "500", marginBottom: "15px", fontFamily: "Mardoto-Medium" }}
            >
              Հաստատված կրթաթոշակառուները պետք է՝
            </AMAAH4>

            <Box
              display={{
                xs: "grid",
                sm: "grid",
                md: "grid",
                lg: "flex",
                xl: "flex",
              }}
              width={{
                xs: 300,
                sm: 300,
                md: 300,
                lg: 710,
                xl: 710,
              }}
              sx={{ alignItems: "start", justifyContent: "space-between" }}
            >
              <Box
                borderRight={{
                  lg: "1px solid #CCD4DB",
                  md: "none",
                  sm: "none",
                  xs: "none",
                }}
                borderBottom={{
                  lg: "none",
                  md: "1px solid #CCD4DB",
                  sm: "1px solid #CCD4DB",
                  xs: "1px solid #CCD4DB",
                }}
                sx={{
                  display: "grid",
                  height: "150px",
                  marginBottom: "12px",
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: "#1FB6AB" }} />
                <Typography
                  variant="h6"
                  fontSize={{
                    lg: 16,
                    md: 16,
                    sm: 20,
                    xs: 12,
                  }}
                  sx={{
                    color: "#002B4D",
                    textAlign: "left",
                    fontFamily: "Mardoto-Medium",
                    fontSize: "18px",
                  }}
                >
                  լրացնեն
                </Typography>
                <Typography
                  variant="p"
                  fontSize={{
                    lg: 13,
                    md: 13,
                    sm: 20,
                    xs: 12,
                  }}
                  width={{
                    xs: 157,
                    sm: 157,
                    md: 157,
                    lg: 157,
                    xl: 157,
                  }}
                  sx={{
                    color: "#325570",
                    textAlign: "left",
                    fontFamily: typography.fontFamily,
                    fontSize: "16px",
                  }}
                >
                  «Ուսանողի կարիքի գնահատման» ձևաթուղթը
                </Typography>
              </Box>
              <Box
                borderRight={{
                  lg: "1px solid #CCD4DB",
                  md: "none",
                  sm: "none",
                  xs: "none",
                }}
                borderBottom={{
                  lg: "none",
                  md: "1px solid #CCD4DB",
                  sm: "1px solid #CCD4DB",
                  xs: "1px solid #CCD4DB",
                }}
                sx={{ display: "grid", height: "120px", marginBottom: "12px" }}
              >
                <CheckCircleOutlineIcon sx={{ color: "#1FB6AB" }} />
                <Typography
                  variant="p"
                  fontSize={{
                    lg: 16,
                    md: 16,
                    sm: 20,
                    xs: 12,
                  }}
                  sx={{
                    color: "#002B4D",
                    textAlign: "left",
                    fontFamily: "Mardoto-Medium",
                    fontSize: "18px",
                  }}
                >
                  հաստատեն
                </Typography>
                <Typography
                  variant="p"
                  fontSize={{
                    lg: 13,
                    md: 13,
                    sm: 20,
                    xs: 12,
                  }}
                  width={{
                    xs: 157,
                    sm: 157,
                    md: 157,
                    lg: 157,
                    xl: 157,
                  }}
                  sx={{
                    color: "#325570",
                    textAlign: "left",
                    fontFamily: typography.fontFamily,
                    fontSize: "16px",
                  }}
                >
                  «Կրթաթոշակառուի հայտարարությունը»
                </Typography>
              </Box>
              <Box sx={{ display: "grid", height: "150px" }}>
                <CheckCircleOutlineIcon sx={{ color: "#1FB6AB" }} />
                <Typography
                  variant="p"
                  fontSize={{
                    lg: 16,
                    md: 16,
                    sm: 20,
                    xs: 12,
                  }}
                  sx={{
                    color: "#002B4D",
                    textAlign: "left",
                    fontFamily: "Mardoto-Medium",
                    fontSize: "18px",
                  }}
                >
                  տվյալ ուստարվա ավարտին տրամադրեն
                </Typography>
                <Typography
                  variant="p"
                  fontSize={{
                    lg: 13,
                    md: 13,
                    sm: 20,
                    xs: 12,
                  }}
                  width={{
                    xs: 197,
                    sm: 197,
                    md: 197,
                    lg: 197,
                    xl: 197,
                  }}
                  sx={{
                    color: "#325570",
                    textAlign: "left",
                    fontFamily: typography.fontFamily,
                    fontSize: "16px",
                  }}
                >
                  հաշվետվություն իրենց ակադեմիական և անձնային աճի վերաբերյալ
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ScholarshipHolder;
