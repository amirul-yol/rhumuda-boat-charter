import React from "react";
import { AppBar, Toolbar, Box, Container } from "@mui/material";
import logo from "../../assets/images/logo-rhumuda.PNG";
import { SYSTEM_PADDING } from "../../constants/layout";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth={false} disableGutters sx={{ px: SYSTEM_PADDING.x }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: "150px",
            height: "150px",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Rhumuda Charter Logo"
            sx={{
              height: 100,
              marginRight: 2,
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
