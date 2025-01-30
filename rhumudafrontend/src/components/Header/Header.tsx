import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/logo-rhumuda.PNG";
import SearchBar from "../SearchBar/SearchBar";
import { SYSTEM_PADDING } from "../../constants/layout";

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ px: SYSTEM_PADDING.x }}>
        <Stack>
          <Toolbar
            disableGutters
            sx={{
              minHeight: "100px",
              height: "100px",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Rhumuda Charter Logo"
              onClick={() => {
                window.location.href = '/';
              }}
              sx={{
                height: 100,
                marginRight: 2,
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                color="inherit"
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                List your Boat
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Manage Booking
              </Button>
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  ml: 1,
                  color: "black",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 180,
                    borderRadius: "16px",
                    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)",
                    "& .MuiMenuItem-root": {
                      fontSize: "1rem",
                      padding: "12px 24px",
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>About Us</MenuItem>
                <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                <MenuItem onClick={handleClose}>Services</MenuItem>
              </Menu>
            </Box>
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
