import React from "react";
import JettyPointDropdown from "../components/JettyPointDropdown";
import BookingDatePicker from "../components/BookingDatePicker";
import PassengerCounter from "../components/PassengerCounter";
import { Box, Typography, Paper } from "@mui/material";

const TestPage: React.FC = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Test Page
      </Typography>
      <Typography paragraph>
        This is a dedicated page for testing components.
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Booking Form Test
        </Typography>
        <JettyPointDropdown />
        <BookingDatePicker />
        <PassengerCounter />
      </Paper>
    </Box>
  );
};

export default TestPage;
