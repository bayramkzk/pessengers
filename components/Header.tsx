import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import LogoLabelDesktop from "./LogoLabelDesktop";
import LogoLabelMobile from "./LogoLabelMobile";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";
import ProfileMenu from "./ProfileMenu";

const pages = [
  { name: "Flights", href: "/flights" },
  { name: "Profile", href: "/profile" },
  { name: "About", href: "/about" },
];

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoLabelDesktop />
          <NavMenu pages={pages} />
          <LogoLabelMobile />
          <NavBar pages={pages} />
          <ProfileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
