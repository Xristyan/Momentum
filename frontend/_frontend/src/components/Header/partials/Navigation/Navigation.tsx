"use client";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const pages = ["about", "Pricing", "Blog"];

export const Navigation = ({ scrolled }: { scrolled: boolean }) => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        gap: 1,
      }}
    >
      {pages.map((page, i) => (
        <Link
          key={i}
          href={`/${page.toLowerCase()}`}
          sx={{
            textDecoration: "none",
          }}
          component={NextLink}
        >
          <Typography
            fontWeight={500}
            sx={[
              ({ palette }) => ({
                "&:hover": {
                  color: palette.text.primary,
                },
              }),
              {
                fontWeight: 500,
                mx: 2,
                letterSpacing: ".08rem",
                textTransform: "capitalize",
                color:
                  pathname === `/${page.toLowerCase()}`
                    ? "primary.main"
                    : "primary.white",
              },
            ]}
          >
            {page}
          </Typography>
        </Link>
      ))}
    </Box>
  );
};
