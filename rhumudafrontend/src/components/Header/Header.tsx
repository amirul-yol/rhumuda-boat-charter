import React from "react";
import { AppBar, Toolbar, Box, Container, Stack } from "@mui/material";
import logo from "../../assets/images/logo-rhumuda.PNG";
import SearchBar from "../SearchBar/SearchBar";
import { SYSTEM_PADDING } from "../../constants/layout";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth={false} disableGutters sx={{ px: SYSTEM_PADDING.x }}>
        <Stack>
          <Toolbar
            disableGutters
            sx={{
              minHeight: "100px",
              height: "100px",
              justifyContent: "flex-start",
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
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <SearchBar />
          </Box>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
