// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

import { useState } from "react";
import getUser from "hooks/isLoggedIn";
import typography from "assets/theme/base/typography";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import logo from "../../../../assets/images/home-images/Horizontal_Dark_Footer.png";

function Footer() {
  const [isLoggedIn] = useState(getUser());

  return (
    <MDBox position="absolute" width="100%" sx={{ paddingTop: "120px", paddingBottom: "40px" }}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <MDBox display="flex" justifyContent="start" alignItems="start" flexWrap="wrap">
            <img
              src={`${logo}`}
              alt="logo-footer"
              style={{
                cursor: "pointer",
                width: "250px",
                height: "auto",
              }}
            />
          </MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            <MDBox component="li" pr={2} lineHeight={1}>
              <Link href="https://amaa.am/#mission" target="_blank" color="#667F94">
                <MDTypography
                  variant="button"
                  sx={{ fontFamily: "Mardoto-Medium", fontSize: "14px" }}
                >
                  Մեր մասին
                </MDTypography>
              </Link>
            </MDBox>
            {!isLoggedIn ? (
              <>
                <MDBox component="li" px={2} lineHeight={1}>
                  <Link href="/authentication/sign-up" target="_blank" color="#667F94">
                    <MDTypography
                      variant="button"
                      sx={{ fontFamily: "Mardoto-Medium", fontSize: "14px" }}
                    >
                      Գրանցվել
                    </MDTypography>
                  </Link>
                </MDBox>
                <MDBox component="li" px={2} lineHeight={1}>
                  <Link href="/authentication/sign-in" target="_blank" color="#667F94">
                    <MDTypography
                      variant="button"
                      sx={{ fontFamily: "Mardoto-Medium", fontSize: "14px" }}
                    >
                      Մուտք գործել
                    </MDTypography>
                  </Link>
                </MDBox>
              </>
            ) : (
              ""
            )}
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          flexDirection={{
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          }}
          gap={{
            xs: "5px",
            sm: "5px",
            md: 0,
            lg: 0,
            xl: 0,
          }}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontFamily: typography.fontFamily,
              fontSize: "14px",
              lineHeight: "24px",
              color: "#667F94",
            }}
          >
            {new Date().getFullYear()} &copy; AMAA Armenia
          </Typography>
          <Typography
            sx={{
              fontFamily: typography.fontFamily,
              fontSize: "14px",
              lineHeight: "24px",
              color: "#667F94",
            }}
          >
            v 1.0.0
          </Typography>
        </MDBox>
      </Container>
    </MDBox>
  );
}

export default Footer;
