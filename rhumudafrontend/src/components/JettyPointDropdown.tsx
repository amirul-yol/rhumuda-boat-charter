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

interface JettyPointDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const JettyPointDropdown: React.FC<JettyPointDropdownProps> = ({
  value,
  onChange,
}) => {
  const [jettyPoints, setJettyPoints] = useState<JettyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJettyPoints();
  }, []);

  const fetchJettyPoints = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/jetty-points");
      const data = await response.json();
      setJettyPoints(data);

      // If no value is selected and Rhumuda point exists, select it
      if (!value) {
        const rhumudaPoint = data.find(
          (point: JettyPoint) => point.id === 1 && point.isActive
        );
        if (rhumudaPoint) {
          onChange(rhumudaPoint.id.toString());
        }
      }
    } catch (error) {
      console.error("Error fetching jetty points:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          value={value}
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
