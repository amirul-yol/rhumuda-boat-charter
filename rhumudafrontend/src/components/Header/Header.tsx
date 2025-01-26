import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import logo from "../../assets/images/logo-rhumuda.PNG";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <Box
          component="img"
          src={logo}
          alt="Rhumuda Charter Logo"
          sx={{
            height: 50,
            marginRight: 2,
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
