import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/logo-rhumuda.PNG";
import SearchBar from "../SearchBar/SearchBar";
import { SYSTEM_PADDING } from "../../constants/layout";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchVisible = !location.pathname.startsWith('/inquiry') && !location.pathname.startsWith('/summary');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenBookingDialog = () => {
    handleClose();
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
    setBookingId("");
  };

  const handleBookingSubmit = () => {
    if (bookingId.trim()) {
      // Remove any spaces and special characters
      const cleanBookingId = bookingId.trim().replace(/[^a-zA-Z0-9]/g, '');
      console.log('Submitting Booking ID:', cleanBookingId); // Debug log
      handleCloseBookingDialog();
      navigate(`/summary/${encodeURIComponent(cleanBookingId)}`);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
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
              onClick={() => navigate('/')}
              sx={{
                height: 100,
                marginRight: 2,
                cursor: 'pointer',
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
                onClick={handleOpenBookingDialog}
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
                <MenuItem onClick={() => handleNavigation('/about')}>About Us</MenuItem>
                <MenuItem onClick={() => handleNavigation('/contact')}>Contact Us</MenuItem>
                <MenuItem onClick={() => handleNavigation('/services')}>Services</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
          {isSearchVisible && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <SearchBar />
            </Box>
          )}
        </Stack>
      </Container>

      {/* Booking ID Dialog */}
      <Dialog 
        open={openBookingDialog} 
        onClose={handleCloseBookingDialog}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '400px',
            p: 2,
          }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          Enter Booking ID
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Booking ID"
            type="text"
            fullWidth
            variant="outlined"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleBookingSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseBookingDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleBookingSubmit} 
            variant="contained" 
            color="primary"
            disabled={!bookingId.trim()}
          >
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
