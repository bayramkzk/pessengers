import FlightIcon from "@mui/icons-material/Flight";
import Typography from "@mui/material/Typography";

export default function LogoLabelMobile() {
  return (
    <>
      <FlightIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          userSelect: "none",
        }}
      >
        PESSENGERS
      </Typography>
    </>
  );
}
