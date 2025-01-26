import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

interface JettyPoint {
  id: number;
  name: string;
  isActive: boolean;
}

const JettyPointDropdown = () => {
  const [jettyPoints, setJettyPoints] = useState<JettyPoint[]>([]);
  const [selectedJetty, setSelectedJetty] = useState("");
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
        <InputLabel id="jetty-point-label">Jetty Point</InputLabel>
        <Select
          labelId="jetty-point-label"
          id="jetty-point-select"
          value={selectedJetty}
          label="Jetty Point"
          onChange={handleChange}
          disabled={loading}
        >
          {jettyPoints.map((point) => (
            <MenuItem key={point.id} value={point.id}>
              {point.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default JettyPointDropdown;
