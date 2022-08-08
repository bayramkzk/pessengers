import FlightIcon from "@mui/icons-material/Flight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FlightIcon sx={{ mr: 1, width: 64, height: 64 }} />
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "2rem",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            PESSENGERS
          </Typography>
        </Box>

        <Box sx={{ display: "flex", width: "100%", gap: "1rem" }}>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
