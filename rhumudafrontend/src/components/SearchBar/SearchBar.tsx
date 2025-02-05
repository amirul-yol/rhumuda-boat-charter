import React from "react";
import { useNavigate } from "react-router-dom";
import JettyPointDropdown from "../JettyPointDropdown";
import BookingDatePicker from "../BookingDatePicker";
import PassengerCounter from "../PassengerCounter";
import { Box, Paper, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  isCompact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isCompact = false }) => {
  const navigate = useNavigate();
  const [searchValues, setSearchValues] = React.useState({
    jettyPoint: "",
    bookingDate: "",
    passengers: 1,
  });

  const handleSearch = () => {
    navigate("/inquiry", {
      state: searchValues,
    });
  };

  return (
    <Paper
      sx={{
        p: isCompact ? "6px 12px" : "12px",
        borderRadius: "30px",
        border: "2px solid black",
        width: isCompact ? "600px" : "750px",
        margin: "0 auto",
        height: isCompact ? "35px" : "45px",
        display: "flex",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          px: isCompact ? 1 : 2,
          gap: isCompact ? 1 : 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            px: isCompact ? 0.5 : 1,
          }}
        >
          <JettyPointDropdown
            value={searchValues.jettyPoint}
            onChange={(value) =>
              setSearchValues((prev) => ({
                ...prev,
                jettyPoint: value,
              }))
            }
            isCompact={isCompact}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: isCompact ? "24px" : "32px",
            my: "auto",
            borderColor: "rgba(0, 0, 0, 0.12)",
            alignSelf: "center",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <BookingDatePicker
            value={searchValues.bookingDate}
            onChange={(value: string) =>
              setSearchValues((prev) => ({
                ...prev,
                bookingDate: value,
              }))
            }
            isCompact={isCompact}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: isCompact ? "24px" : "32px",
            my: "auto",
            borderColor: "rgba(0, 0, 0, 0.12)",
            alignSelf: "center",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <PassengerCounter
            value={searchValues.passengers}
            onChange={(value) =>
              setSearchValues((prev) => ({
                ...prev,
                passengers: value,
              }))
            }
            isCompact={isCompact}
          />
        </Box>
      </Box>

      <IconButton
        onClick={handleSearch}
        sx={{
          backgroundColor: "black",
          color: "white",
          position: "absolute",
          right: isCompact ? "4px" : "8px",
          height: isCompact ? "27px" : "35px",
          width: isCompact ? "27px" : "35px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "black",
          },
        }}
      >
        <SearchIcon sx={{ fontSize: isCompact ? "1rem" : "1.2rem" }} />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
