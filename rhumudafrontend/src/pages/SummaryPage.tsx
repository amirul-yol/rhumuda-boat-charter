import React from "react";
import { Container, Typography, Box } from "@mui/material";

const SummaryPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Booking Summary
        </Typography>
      </Box>
    </Container>
  );
};

export default SummaryPage;
