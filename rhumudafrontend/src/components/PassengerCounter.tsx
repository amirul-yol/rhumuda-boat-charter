import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PassengerCounter = () => {
  const [count, setCount] = useState<number>(1);
  const MIN_PASSENGERS = 1;
  const MAX_PASSENGERS = 20;

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= MIN_PASSENGERS && value <= MAX_PASSENGERS) {
      setCount(value);
    }
  };

  return (
    <Box sx={{ minWidth: 200, mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel shrink htmlFor="passenger-counter">
          Number of Passengers
        </InputLabel>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
          }}
        >
          <IconButton
            onClick={handleDecrement}
            disabled={count <= MIN_PASSENGERS}
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            id="passenger-counter"
            value={count}
            onChange={handleInputChange}
            inputProps={{
              min: MIN_PASSENGERS,
              max: MAX_PASSENGERS,
              style: { textAlign: "center" },
            }}
            sx={{ width: "100px" }}
          />
          <IconButton
            onClick={handleIncrement}
            disabled={count >= MAX_PASSENGERS}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </FormControl>
    </Box>
  );
};

export default PassengerCounter;
