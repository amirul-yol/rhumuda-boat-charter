import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  FormControl,
  Popover,
  Typography,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";

interface PassengerCounterProps {
  value: number;
  onChange: (value: number) => void;
}

const PassengerCounter: React.FC<PassengerCounterProps> = ({
  value,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const MIN_PASSENGERS = 1;
  const MAX_PASSENGERS = 20;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIncrement = () => {
    if (value < MAX_PASSENGERS) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > MIN_PASSENGERS) {
      onChange(value - 1);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon sx={{ fontSize: "1.2rem", color: "text.secondary" }} />
          <InputLabel
            shrink={false}
            sx={{
              position: "relative",
              transform: "none",
              color: "text.primary",
            }}
          >
            Passengers
          </InputLabel>
        </Box>
        <TextField
          value={`${value} Passenger${value > 1 ? "s" : ""}`}
          onClick={handleClick}
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              p: 2,
              width: "200px",
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <IconButton
              onClick={handleDecrement}
              disabled={value <= MIN_PASSENGERS}
              size="small"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              value={value}
              inputProps={{
                style: { textAlign: "center" },
                readOnly: true,
              }}
              sx={{ width: "60px" }}
            />
            <IconButton
              onClick={handleIncrement}
              disabled={value >= MAX_PASSENGERS}
              size="small"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: "block",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Maximum {MAX_PASSENGERS} passengers
          </Typography>
        </Popover>
      </FormControl>
    </Box>
  );
};

export default PassengerCounter;
