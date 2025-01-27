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

const PassengerCounter = () => {
  const [count, setCount] = useState<number>(1);
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
    if (count < MAX_PASSENGERS) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (count > MIN_PASSENGERS) {
      setCount((prev) => prev - 1);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
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
          value={`${count} Passenger${count > 1 ? "s" : ""}`}
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
              disabled={count <= MIN_PASSENGERS}
              size="small"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              value={count}
              inputProps={{
                style: { textAlign: "center" },
                readOnly: true,
              }}
              sx={{ width: "60px" }}
            />
            <IconButton
              onClick={handleIncrement}
              disabled={count >= MAX_PASSENGERS}
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
