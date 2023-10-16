import Container from "@mui/material/Container";
import { Grid, Typography, Box } from "@mui/material";
import MDBox from "components/MDBox";
import { useState } from "react";
import typography from "assets/theme/base/typography";

import image from "../../../../assets/images/home-images/Screenshot 2023-02-13 at 14.34 1.png";

import cards from "./data";
import AMAAH4 from "../../../../components/AMAAH4";

function NecessaryDocuments() {
  const [id, setId] = useState("");
  const [hover, setHover] = useState(false);
  function mouseEnter(itemId) {
    setHover(true);
    setId(itemId);
  }
  function mouseLeave() {
    setHover(false);
    setId("");
  }
  return (
    <Container>
      <Grid
        container
        spacing={1}
        sx={{
          height: "auto",
        }}
        marginLeft={{ xs: 0, sm: 0, md: "-127px", lg: "-127px", xl: "-127px" }}
      >
        <Grid
          item
          xs={7}
          md={12}
          sx={{
            marginTop: { md: "5%", sm: "5%", xs: "10%" },
          }}
          margin={{
            xs: "30px 0",
            sm: "30px 85px",
            md: "30px 60px",
            lg: "30px 9px",
            xl: "30px 9px",
          }}
        >
          <AMAAH4
            fontSize={{
              lg: 32,
              md: 32,
              sm: 24,
              xs: 24,
            }}
            width={{
              xs: 357,
              sm: 357,
              md: 560,
              lg: 700,
              xl: 726,
            }}
            sx={{
              marginTop: "70px",
              textAlign: "center",
              fontFamily: "Mardoto-Medium",
            }}
          >
            Անհրաժեշտ փաստաթղթեր
          </AMAAH4>
        </Grid>
        <Grid
          item
          xs={7}
          md={12}
          sx={{
            display: "flex",
          }}
          margin={{
            xs: "0 auto",
            sm: "0 auto",
            md: "0 122px",
            lg: "0 155px",
            xl: "0 155px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              justifyContent: "space-around",
              gap: "15px",
            }}
          >
            {cards.map((item) => (
              <a href="https://amaa.am/ծրագրեր/կրթաթոշակ/" target="_blank" rel="noreferrer">
                <Box
                  key={item.id}
                  sx={{
                    height: {
                      xs: 192,
                      sm: 192,
                      md: 192,
                      lg: 192,
                      xl: 192,
                    },
                    width: {
                      xs: 186,
                      sm: 186,
                      md: 184,
                      lg: 184,
                      xl: 184,
                    },
                    textAlign: "center",
                    backgroundColor: "#FFFFFF",
                    color: "black",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontFamily: typography.fontFamily,
                    boxShadow: "0px 4px 48px rgba(82, 172, 255, 0.08)",
                    "&:hover": {
                      background: "#1FB6AB",
                    },
                    "&:hover .item_icon": {
                      color: "#FFFFFF",
                    },
                    "&:hover .card_title": {
                      color: "#FFFFFF",
                    },
                    "&:hover .card_content": {
                      color: "#FFFFFF",
                    },
                  }}
                  onMouseEnter={() => mouseEnter(item.id)}
                  onMouseLeave={() => mouseLeave()}
                >
                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "56px",
                      marginTop: "24px",
                    }}
                  >
                    {hover && id === item.id ? item.iconWhite : item.iconColor}
                  </MDBox>
                  <Typography
                    className="card_title"
                    fontSize={{
                      lg: 12,
                      md: 12,
                      sm: 12,
                      xs: 12,
                    }}
                    sx={{
                      color: "#002B4D",
                      height: 0,
                      lineHeight: "16px",
                      marginTop: "8px",
                      fontFamily: typography.fontFamily,
                    }}
                  >
                    {item.cardTitle}
                  </Typography>
                  <Typography
                    className="card_content"
                    fontSize={{
                      lg: 14,
                      md: 14,
                      sm: 14,
                      xs: 14,
                    }}
                    sx={{
                      color: "#002B4D",
                      height: 0,
                      padding: 0,
                      lineHeight: "24px",
                      marginTop: "48px",
                      fontFamily: typography.fontFamily,
                    }}
                  >
                    {item.cardContent}
                  </Typography>
                </Box>
              </a>
            ))}
          </Box>
        </Grid>
        <Grid
          display={{
            xs: "grid",
            sm: "grid",
            md: "grid",
            lg: "flex",
            xl: "flex",
          }}
          width={{
            xs: 350,
            sm: 350,
            md: 444,
            lg: 800,
            xl: 800,
          }}
          sx={{ margin: "0 auto" }}
        >
          <Grid
            item
            xs={7}
            md={6}
            sx={{
              width: { md: "454px", sm: "300px", xs: "300px" },
              padding: "0 !important",
              margin: {
                xs: "18px 54px",
                sm: "18px auto",
                md: "18px auto",
                lg: "18px 0",
                xl: "18px 0",
              },
              gridColumn: 2,
              gridRow: 2,
            }}
          >
            <MDBox
              sx={{
                width: "280px",
                height: "280px",
                background: "#FFFFFF",
                boxShadow: "0px 4px 48px rgba(82, 172, 255, 0.08)",
                borderRadius: "150px",
                margin: "18px auto",
              }}
            >
              <Box
                component="img"
                width={{
                  xs: "240px",
                  sm: "240px",
                  md: "240px",
                  lg: "285px",
                  xl: "285px",
                }}
                sx={{
                  position: "relative",
                  left: "45px",
                  top: {
                    xs: "18px",
                    sm: "18px",
                    md: "18px",
                    lg: "18px",
                    xl: "18px",
                  },
                }}
                alt="Image of part of necessary documents"
                src={`${image}`}
              />
            </MDBox>
          </Grid>
          <Grid
            item
            xs={7}
            md={6}
            sx={{
              width: { md: "400px", sm: "350px", xs: "350px" },
              padding: "0 !important",
              margin: {
                xs: "0 24px",
                sm: "0 24px",
                md: "0",
                lg: "0",
                xl: "0",
              },
              gridColumn: 2,
              gridRow: 1,
            }}
          >
            <MDBox
              sx={{
                width: { md: "400px", sm: "500px", xs: "300px" },
                marginTop: "50px",
              }}
            >
              <Typography
                variant="p"
                component="p"
                sx={{
                  textAlign: "left",
                  color: "#002B4D",
                  marginTop: "10px",
                  lineHeight: 1.5,
                  marginBottom: "5px",
                  fontFamily: typography.fontFamily,
                  fontSize: "16px",
                }}
              >
                * Հայտն առցանց լրացնելու դեպքում, դիմումի ձևից բացի, մյուս փաստաթղթերը հարկավոր է
                Վերբեռնել սկանավորված տարբերակով։
              </Typography>
              <Typography
                variant="p"
                component="p"
                fontSize={{
                  lg: 16,
                  md: 14,
                  sm: 14,
                  xs: 14,
                }}
                sx={{
                  textAlign: "left",
                  color: "#002B4D",
                  marginTop: "56px",
                  lineHeight: 1.5,
                  marginBottom: "60px",
                  fontFamily: typography.fontFamily,
                  fontSize: "16px",
                }}
              >
                ** Բնութագրական նամակները չեն կարող տրամադրվել դիմորդի ազգականների, հարազատների,
                ծանոթների և-կամ ընկերների կողմից։ Նամակին կից հարկավոր է նշել բնութագիրը տրամադրող
                անձի անունը, ազգանունը, հեռախոսահամարը, էլեկտրոնային հասցեն և դիմորդի հետ եղած կապը։
              </Typography>
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NecessaryDocuments;
