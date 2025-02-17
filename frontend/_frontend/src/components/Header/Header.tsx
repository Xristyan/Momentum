"use client";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";

import { Button } from "@mui/material";
import { Navigation } from "./partials/Navigation";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1); // Apply blur when scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xxl">
        <Box
          sx={[
            {
              maxWidth: "xl",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              pt: 2,
              pb: 2,
              ...(!scrolled && {
                borderBottom: "1px solid",
                borderColor: "divider",
              }),
            },
          ]}
        >
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Navigation scrolled={scrolled} />
          <Button
            sx={{
              p: "1.5rem 2.5rem 1.5rem 2.5rem ",
            }}
            variant="contained"
            color="primary"
            rounded
          >
            <Typography
              sx={{ lineHeight: "1.6rem", textTransform: "capitalize" }}
            >
              Get Started
            </Typography>
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
