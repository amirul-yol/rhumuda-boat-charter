import React from "react";
import JettyPointDropdown from "../components/JettyPointDropdown";
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
          Jetty Point Dropdown Test
        </Typography>
        <JettyPointDropdown />
      </Paper>
    </Box>
  );
};

export default TestPage;
