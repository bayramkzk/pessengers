import { Box, Container, Typography } from "@mui/material";
import Header from "components/Header";
import { NextPage } from "next";

const AboutPage: NextPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ padding: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3em",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            marginBottom={2}
          >
            About
          </Typography>

          <Typography maxWidth={700}>
            Pessengers is a web app developed to demonstrate the idea of
            matching passengers by their interests so they can have a more
            comfortable travel with a person who have common with them. Thus,
            they can share knowledge, experience and talk about their favorite
            film series or any topic they have in common. They can be "travel
            friends".
          </Typography>

          <Typography maxWidth={700}>Copyright 2023, Rapture AISub</Typography>
        </Box>
      </Container>
    </>
  );
};

export default AboutPage;
