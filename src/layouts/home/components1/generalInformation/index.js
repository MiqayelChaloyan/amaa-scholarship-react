/* eslint-disable no-unused-vars */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import desktopImage from "../../../../assets/images/home-images/Landing Page hero image.1.png";
import mobileImage from "../../../../assets/images/home-images/Landing Page hero image - Mobile.png";

// icon to cards
import AssignmentTurnedInIcon from "../../../../assets/images/home-images/AssignmentTurnedInIcon.png";
import FinancialIcon from "../../../../assets/images/home-images/VectorIcon.png";
import CalendarIcon from "../../../../assets/images/home-images/CalendarToday.png";

function GeneralInformation() {
  const matches = useMediaQuery("(min-width:1180px)");

  return (
    <Box
      padding={{
        xs: "58px 37px",
        sm: "58px 150px",
        md: "58px 120px",
        lg: "53px 120px",
        xl: "53px 120px",
      }}
      height={{
        xs: 1308,
        sm: 1200,
        md: 720,
        lg: 720,
        xl: 734,
      }}
      sx={{ background: "#002B4D" }}
    >
      <Container>
        <Grid container rowSpacing={2} sx={{ marginTop: 0 }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={8}
            xl={8}
            marginTop={{
              xs: "381px",
              sm: "381px",
              md: "72px",
              lg: "72px",
              xl: "72px",
            }}
          >
            <Typography
              fontSize={{
                xs: 40,
                sm: 40,
                md: 64,
                lg: 64,
                xl: 64,
              }}
              width={{
                xs: 200,
                sm: 200,
                md: 300,
                lg: 300,
                xl: 300,
              }}
              variant="h1"
              component="h1"
              color="#FFFFFF"
              sx={{
                lineHeight: "1.1em",
                fontWeight: 900,
                textTransform: "uppercase",
                fontFamily: "Mardoto-Black",
              }}
            >
              <span style={{ color: "#1FB6AB" }}>AMAA-ի </span>Կրթաթոշակի ծրագիր
            </Typography>
            <Typography
              fontSize={{
                xs: 15,
                sm: 15,
                md: 17,
                lg: 18,
                xl: 18,
              }}
              width={{
                xs: 200,
                sm: 200,
                md: 300,
                lg: 300,
                xl: 300,
              }}
              variant="h4"
              component="h4"
              color="#FFFFFF"
              sx={{ fontWeight: "500", marginBottom: "5px", marginTop: "15px" }}
            >
              Ընդհանուր տեղեկություն
            </Typography>
            <Typography
              fontSize={{
                xs: 10,
                sm: 10,
                md: 11,
                lg: 12,
                xl: 12,
              }}
              width={{
                xs: 245,
                sm: 245,
                md: 317,
                lg: 484,
                xl: 484,
              }}
              variant="p"
              component="p"
              color="#FFFFFF"
              sx={{ fontWeight: "400", marginBottom: "15px" }}
            >
              Կարևորելով որակյալ կրթության և մասնագետներ ունենալու անհրաժեշտությունը՝ Ամերիկայի Հայ
              Ավետարանչական ընկերակցությունը (AMAA) իրականացնում է կրթաթոշակի ամենամյա ծրագիր
              Հայաստանի և Արցախի պետական ու միջպետական բուհերի՝ ուսուցման առկա համակարգում սովորող
              կամ սովորել պատրաստվող ուսանողների համար, ովքեր ունեն՝
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
            {matches ? (
              <Box
                component="img"
                // width={{
                //   xs: "32%",
                //   sm: "32%",
                //   md: "33%",
                //   lg: "32%",
                //   xl: "31.4%",
                // }}
                // right={{
                //   xs: "5%",
                //   sm: "5%",
                // }}
                sx={{
                  height: "92.9%",
                  position: "absolute",
                  right: "8%",
                  top: "-52px",
                }}
                alt="Image"
                src={`${desktopImage}`}
              />
            ) : (
              <Box
                component="img"
                width={{
                  xs: "68%",
                  sm: "68%",
                  md: "75%",
                  lg: "75%",
                  xl: "75%",
                }}
                sx={{
                  position: "absolute",
                  right: "11%",
                  top: "-50px",
                }}
                alt="Image"
                src={`${mobileImage}`}
              />
            )}
          </Grid>
          <Grid
            item
            display={{
              xs: "grid",
              sm: "grid",
              md: "flex",
              lg: "flex",
              xl: "flex",
            }}
          >
            <Grid item>
              <Card
                sx={{
                  width: {
                    xs: "300px",
                    sm: "300px",
                    md: "226px",
                    lg: "226px",
                    xl: "226px",
                  },
                  height: "88px",
                  marginBottom: "15px",
                  background: "#00233F",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "15px",
                    paddingLeft: "30.67px",
                  }}
                >
                  <Box
                    component="img"
                    width={{
                      xs: 23,
                      sm: 23,
                      md: 18,
                      lg: 23,
                      xl: 23,
                    }}
                    height={{
                      xs: 30,
                      sm: 30,
                      md: 21,
                      lg: 30,
                      xl: 30,
                    }}
                    alt="icon"
                    src={AssignmentTurnedInIcon}
                  />
                  <Typography variant="span" color="#FFFFFF" sx={{ fontSize: "12px" }}>
                    բարձր ակադեմիական առաջադիմություն,
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid
              item
              sx={{
                marginLeft: { xs: 0, sm: 0, md: "16px", lg: "16px", xl: "16px" },
              }}
            >
              <Card
                sx={{
                  width: {
                    xs: "300px",
                    sm: "300px",
                    md: "178px",
                    lg: "178px",
                    xl: "178px",
                  },
                  height: "88px",
                  marginBottom: "15px",
                  background: "#00233F",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "15px",
                    paddingLeft: "30.67px",
                  }}
                >
                  <Box
                    component="img"
                    width={{
                      xs: 23,
                      sm: 23,
                      md: 18,
                      lg: 23,
                      xl: 23,
                    }}
                    height={{
                      xs: 30,
                      sm: 30,
                      md: 21,
                      lg: 30,
                      xl: 30,
                    }}
                    alt="icon"
                    src={FinancialIcon}
                  />
                  <Typography variant="p" color="#FFFFFF" sx={{ fontSize: "12px" }}>
                    ֆինանսական կարիք։
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid
              item
              sx={{
                marginLeft: { xs: 0, sm: 0, md: "16px", lg: "16px", xl: "16px" },
              }}
            >
              <Card
                sx={{
                  width: {
                    xs: "300px",
                    sm: "300px",
                    md: "310px",
                    lg: "310px",
                    xl: "310px",
                  },
                  height: "88px",
                  marginBottom: "15px",
                  background: "#1FB6AB",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "15px",
                    paddingLeft: "30.67px",
                  }}
                >
                  <Box
                    component="img"
                    width={30}
                    height={{
                      xs: 30,
                      sm: 30,
                      md: 21,
                      lg: 30,
                      xl: 30,
                    }}
                    alt="icon"
                    src={CalendarIcon}
                  />
                  <Typography variant="p" color="#FFFFFF" sx={{ fontSize: "12px" }}>
                    Հայտերի ընդունման վերջնաժամկետ՝ սեպտեմբերի 30:
                  </Typography>
                </Box>
              </Card>
            </Grid>{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={12} xl={12}>
            <Box
              width={{
                xs: 294,
                sm: 294,
                md: 500,
                lg: 1080,
                xl: 1080,
              }}
              top={{
                xs: "82px",
                sm: "-19px",
                md: 2,
                lg: "-5px",
                xl: "-5px",
              }}
              right={{
                xs: 23,
                sm: 0,
                md: 75,
                lg: 75,
                xl: 75,
              }}
              sx={{
                background: "#FFFFFF",
                height: "200px",
                position: "relative",
                margin: "0 auto",
                borderRadius: "20px",
                paddingTop: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                fontSize={{
                  xs: 12,
                  sm: 12,
                  md: 17,
                  lg: 18,
                  xl: 18,
                }}
                width={{
                  xs: "auto",
                  sm: "auto",
                  md: "auto",
                  lg: "auto",
                  xl: "auto",
                }}
                variant="h4"
                component="h4"
                color="#002B4D"
                sx={{ fontWeight: "500", marginBottom: "15px" }}
              >
                Ծրագիրն իրականացվում է երկու փուլով՝
              </Typography>
              <Box
                paddingTop={{
                  xs: "89px",
                  sm: "89px",
                  md: "78px",
                  lg: "48px",
                  xl: "48px",
                }}
                sx={{
                  display: "flex",
                  margin: "0 auto",
                  borderRadius: "20px",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  left={{
                    xs: "45px",
                    sm: "45px",
                    md: "90px",
                    lg: "147px",
                    xl: "147px",
                  }}
                  sx={{
                    display: "grid",
                    position: "relative",
                    bottom: {
                      xs: "60px",
                      sm: "60px",
                      md: "70px",
                      lg: "70px",
                      xl: "70px",
                    },
                  }}
                >
                  <Box
                    width={{
                      xs: "40px",
                      sm: "40px",
                      md: "50px",
                      lg: "50px",
                      xl: "50px",
                    }}
                    height={{
                      xs: "40px",
                      sm: "40px",
                      md: "50px",
                      lg: "50px",
                      xl: "50px",
                    }}
                    sx={{
                      marginLeft: {
                        xs: "4px",
                        sm: "4px",
                        md: 0,
                        lg: 0,
                        xl: 0,
                      },
                      background: "#002B4D",
                      borderRadius: "50px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <AssignmentIcon
                      sx={{
                        position: "absolute",
                        top: {
                          xs: "10px",
                          sm: "10px",
                          md: "15px",
                          lg: "15px",
                          xl: "15px",
                        },
                        left: {
                          xs: "10px",
                          sm: "10px",
                          md: "14px",
                          lg: "14px",
                          xl: "14px",
                        },
                        color: "#FFFFFF",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      height: "33px",
                      bottom: "17px",
                      width: "50px",
                      borderRadius: "50px 50px 0 0",
                      background:
                        "linear-gradient(180deg, rgba(51, 201, 191, 0.3) 0%, rgba(217, 217, 217, 0) 100%)",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      height: "44px",
                      right: "17px",
                      bottom: "56px",
                      width: "85px",
                      borderRadius: "50px 50px 0 0",
                      background:
                        "linear-gradient(180deg, rgba(51, 201, 191, 0.3) 0%, rgba(217, 217, 217, 0) 100%)",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      borderLeft: "2px solid #33C9BF",
                      height: "22px",
                      position: "relative",
                      left: {
                        lg: "23px",
                        md: "23px",
                        sm: "23px",
                        xs: "23px",
                      },
                      bottom: "81px",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "50px",
                      background: "#33C9BF",
                      width: "10px",
                      height: "10px",
                      position: "relative",
                      left: "19px",
                      bottom: "81px",
                    }}
                  >
                    {" "}
                  </Box>
                  <Typography
                    variant="p"
                    fontSize={{
                      lg: 13,
                      md: 13,
                      sm: 11,
                      xs: 11,
                    }}
                    sx={{
                      width: "139px",
                      position: "relative",
                      right: "39px",
                      bottom: "73px",
                      color: "#002B4D",
                    }}
                  >
                    հայտի ներկայացում,
                  </Typography>
                </Box>
                <Box
                  width={{
                    xs: "92px",
                    sm: "92px",
                    md: "200px",
                    lg: "451px",
                    xl: "451px",
                  }}
                  sx={{
                    border: "1px dashed #33C9BF",
                    height: "1px",
                    position: "relative",
                    top: "6px",
                    right: {
                      xs: "32px",
                      sm: "32px",
                      md: "47px",
                      lg: "47px",
                      xl: "47px",
                    },
                  }}
                >
                  {" "}
                </Box>
                <Box
                  right={{
                    xs: "22px",
                    sm: "22px",
                    md: "90px",
                    lg: "147px",
                    xl: "147px",
                  }}
                  sx={{
                    display: "grid",
                    position: "relative",
                    bottom: {
                      xs: "60px",
                      sm: "60px",
                      md: "70px",
                      lg: "70px",
                      xl: "70px",
                    },
                  }}
                >
                  <Box
                    width={{
                      xs: "40px",
                      sm: "40px",
                      md: "50px",
                      lg: "50px",
                      xl: "50px",
                    }}
                    height={{
                      xs: "40px",
                      sm: "40px",
                      md: "50px",
                      lg: "50px",
                      xl: "50px",
                    }}
                    sx={{
                      marginLeft: {
                        xs: "4px",
                        sm: "4px",
                        md: 0,
                        lg: 0,
                        xl: 0,
                      },
                      background: "#002B4D",
                      borderRadius: "50px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <PeopleAltIcon
                      sx={{
                        position: "absolute",
                        top: {
                          xs: "10px",
                          sm: "10px",
                          md: "15px",
                          lg: "15px",
                          xl: "15px",
                        },
                        left: {
                          xs: "10px",
                          sm: "10px",
                          md: "14px",
                          lg: "14px",
                          xl: "14px",
                        },
                        color: "#FFFFFF",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      height: "33px",
                      bottom: "17px",
                      width: "50px",
                      borderRadius: "50px 50px 0 0",
                      background:
                        "linear-gradient(180deg, rgba(51, 201, 191, 0.3) 0%, rgba(217, 217, 217, 0) 100%)",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      height: "44px",
                      right: "17px",
                      bottom: "56px",
                      width: "85px",
                      borderRadius: "50px 50px 0 0",
                      background:
                        "linear-gradient(180deg, rgba(51, 201, 191, 0.3) 0%, rgba(217, 217, 217, 0) 100%)",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      borderLeft: "2px solid #33C9BF",
                      height: "22px",
                      position: "relative",
                      left: "23px",
                      bottom: "81px",
                    }}
                  >
                    {" "}
                  </Box>
                  <Box
                    sx={{
                      borderRadius: "50px",
                      background: "#33C9BF",
                      width: "10px",
                      height: "10px",
                      position: "relative",
                      left: "19px",
                      bottom: "81px",
                    }}
                  >
                    {" "}
                  </Box>
                  <Typography
                    variant="p"
                    fontSize={{
                      lg: 13,
                      md: 13,
                      sm: 11,
                      xs: 11,
                    }}
                    sx={{
                      width: "67px",
                      position: "relative",
                      right: "12px",
                      color: "#002B4D",
                      bottom: "73px",
                    }}
                  >
                    հարցազրույց։
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default GeneralInformation;
