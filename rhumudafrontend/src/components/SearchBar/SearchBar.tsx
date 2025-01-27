import React from "react";
import JettyPointDropdown from "../JettyPointDropdown";
import BookingDatePicker from "../BookingDatePicker";
import PassengerCounter from "../PassengerCounter";
import { Box, Paper, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC = () => {
  const handleSearch = () => {
    console.log("Search clicked");
  };

  return (
    <Paper
      sx={{
        p: "12px",
        borderRadius: "30px",
        border: "2px solid black",
        width: "750px",
        margin: "0 auto",
        height: "45px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "stretch", width: "100%", px: 2 }}
      >
        <Box sx={{ flex: 1 }}>
          <JettyPointDropdown />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "auto",
            mx: 2,
            borderColor: "rgba(0, 0, 0, 0.12)",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <BookingDatePicker />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "auto",
            mx: 2,
            borderColor: "rgba(0, 0, 0, 0.12)",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <PassengerCounter />
        </Box>
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleSearch}
            sx={{
              backgroundColor: "black",
              borderRadius: "12px",
              height: "45px",
              width: "45px",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            <SearchIcon sx={{ color: "white", fontSize: "1.2rem" }} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchBar;
