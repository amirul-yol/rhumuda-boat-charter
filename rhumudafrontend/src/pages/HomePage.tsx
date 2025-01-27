import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import boatIcon from "../../src/assets/icons/boat_color.png";
import islandIcon from "../../src/assets/icons/island_color.png";
import fishingIcon from "../../src/assets/icons/fishing_color.png";

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* Package Icons Section */}
      <Stack
        direction="row"
        spacing={4}
        justifyContent="left"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Box
          component="img"
          src={boatIcon}
          alt="Boat Charter"
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <Box
          component="img"
          src={islandIcon}
          alt="Island Trips"
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <Box
          component="img"
          src={fishingIcon}
          alt="Fishing Trips"
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Stack>

      {/* Package Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 4,
          mb: 3,
          textAlign: "left",
          fontWeight: 500,
          color: "text.primary",
        }}
      >
        Boat Charter Packages
      </Typography>
    </Box>
  );
};

export default HomePage;
