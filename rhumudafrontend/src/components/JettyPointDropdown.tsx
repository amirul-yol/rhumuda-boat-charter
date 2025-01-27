import React, { useState, useEffect } from "react";
import {
  FormControl,
  TextField,
  MenuItem,
  Box,
  InputLabel,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface JettyPoint {
  id: number;
  name: string;
  isActive: boolean;
}

const JettyPointDropdown = () => {
  const [jettyPoints, setJettyPoints] = useState<JettyPoint[]>([]);
  const [selectedJetty, setSelectedJetty] = useState("1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJettyPoints();
  }, []);

  const fetchJettyPoints = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jetty-points");
      const data = await response.json();
      setJettyPoints(data);
    } catch (error) {
      console.error("Error fetching jetty points:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: any) => {
    setSelectedJetty(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
          <LocationOnIcon
            sx={{ fontSize: "1.2rem", color: "text.secondary" }}
          />
          <InputLabel
            shrink={false}
            sx={{
              position: "relative",
              transform: "none",
              color: "text.primary",
            }}
          >
            Jetty Point
          </InputLabel>
        </Box>
        <TextField
          select
          value={selectedJetty}
          onChange={handleChange}
          disabled={loading}
          variant="standard"
        >
          {jettyPoints.map((point) => (
            <MenuItem key={point.id} value={point.id}>
              {point.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
};

export default JettyPointDropdown;
