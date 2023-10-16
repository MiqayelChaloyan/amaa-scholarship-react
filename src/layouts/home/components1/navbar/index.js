import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import typography from "assets/theme/base/typography";

import { AppBar, Box, Drawer, Link } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { logOut } from "hooks/allRequests/userApis";

// @mui material icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

// NavBar menu logo image
import logo from "../../../../assets/images/home-images/Horizontal_Dark.png";

import getUser from "../../../../hooks/isLoggedIn";

function Navbar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [navbar, setNavbar] = useState(true);
  const navigate = useNavigate();

  const [isLoggedIn] = useState(getUser());
  const navItemsNotAuthenticated = [
    { id: 1, path: "Մուտք գործել", to: "/authentication/sign-in" },
    { id: 2, path: "Գրանցվել", to: "/authentication/sign-up" },
  ];
  const navItemsAuthenticated = [{ id: 3, path: "Դուրս Գալ", to: "/" }];

  const changeBackground = () => {
    if (window.scrollY >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  }, []);

  async function logout() {
    const out = await logOut();
    if (out) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("applicationId");
      localStorage.removeItem("activeStep");
      navigate("/");
    }
  }
  return (
    <AppBar position="fixed" elevation={0} color="transparent">
      <Box style={navbar ? { backgroundColor: "#00233F" } : { backgroundColor: "#00233Fd6" }}>
        <Container>
          <Box
            maxWidth="sl"
            sx={{
              pt: 0,
              height: "65px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              transition: "all 0.5s",
            }}
          >
            <img
              style={{
                cursor: "pointer",
                width: "250px",
                height: "auto",
              }}
              src={logo}
              alt="logo-navbar"
            />
            <Box
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                alignItems: "center",
                gap: "24px",
              }}
            >
              {!isLoggedIn
                ? navItemsNotAuthenticated.map((item) => (
                    <Link
                      href={item.to}
                      key={item.id}
                      underline="none"
                      color="#fff"
                      sx={{
                        fontWeight: typography.fontWeightRegular,
                        fontFamily: typography.fontFamily,
                        fontSize: "16px",
                        width: "120px",
                        height: "40px",
                        borderRadius: "10px",
                        opacity: 0.7,
                        transition: "all 0.5s",
                        textAlign: "center",
                        lineHeight: "40px",
                        "&:hover": {
                          backgroundColor: "#002B4D",
                          opacity: 1,
                        },
                      }}
                    >
                      {item.path}
                    </Link>
                  ))
                : navItemsAuthenticated.map((item) => (
                    <Button
                      key={item.id}
                      sx={{
                        color: "#fff",
                        fontWeight: typography.fontWeightRegular,
                        fontFamily: typography.fontFamily,
                        fontSize: "16px",
                        borderRadius: "10px",
                        opacity: 0.7,
                        transition: "all 0.5s",
                        textAlign: "center",
                        lineHeight: "24px",
                        width: "108px",
                        height: "40px",
                        padding: 0,
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "#002B4D",
                          opacity: 1,
                        },
                      }}
                      onClick={() => logout()}
                    >
                      {item.path}
                    </Button>
                  ))}
            </Box>

            <MoreHorizIcon
              sx={{
                display: {
                  xs: "block",
                  lg: "none",
                },
                cursor: "pointer",
                color: "#33C9BF",
              }}
              onClick={() => setOpenMobileMenu(true)}
            />
            <Drawer anchor="left" open={openMobileMenu}>
              <Box
                sx={{
                  position: "relative",
                  width: 250,
                  backgroundColor: "#1FB6AB",
                  height: "100%",
                  py: 3,
                  px: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                }}
                role="presentation"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <CloseIcon
                      sx={{
                        display: {
                          xs: "block",
                          lg: "none",
                        },
                        cursor: "pointer",
                        color: "#fff",
                        marginLeft: "185px",
                      }}
                      onClick={() => setOpenMobileMenu(false)}
                    />
                    {!isLoggedIn
                      ? navItemsNotAuthenticated.map((item) => (
                          <Link
                            href={item.to}
                            key={item.id}
                            underline="none"
                            color="#fff"
                            sx={{
                              fontWeight: typography.fontWeightRegular,
                              fontFamily: typography.fontFamily,
                              fontSize: "16px",
                              padding: "10px 27px",
                              borderRadius: "10px",
                              opacity: 0.7,
                              transition: "all 0.5s",
                              "&:hover": {
                                backgroundColor: "#002B4D",
                                padding: "10px 27px",
                                opacity: 1,
                              },
                            }}
                          >
                            {item.path}
                          </Link>
                        ))
                      : navItemsAuthenticated.map((item) => (
                          <Button
                            key={item.id}
                            sx={{
                              color: "#fff",
                              fontWeight: typography.fontWeightRegular,
                              fontFamily: typography.fontFamily,
                              fontSize: "16px",
                              padding: "10px 27px",
                              borderRadius: "10px",
                              opacity: 0.7,
                              transition: "all 0.5s",
                              "&:hover": {
                                color: "#fff",
                                backgroundColor: "#002B4D",
                                padding: "10px 27px",
                                opacity: 1,
                              },
                            }}
                            onClick={() => logout()}
                          >
                            {item.path}
                          </Button>
                        ))}
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
}

export default Navbar;
