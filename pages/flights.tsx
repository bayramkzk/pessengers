import Container from "@mui/material/Container";
import Header from "components/Header";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md"></Container>
    </>
  );
};

export default HomePage;
