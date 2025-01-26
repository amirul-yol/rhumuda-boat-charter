import React from "react";
import { Box, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const BookingDatePicker = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  // Disable past dates and dates more than 3 months ahead
  const disableDates = (date: Dayjs) => {
    const today = dayjs();
    const threeMonthsFromNow = today.add(3, "month");
    return (
      date.isBefore(today, "day") || date.isAfter(threeMonthsFromNow, "day")
    );
  };

  return (
    <Box sx={{ minWidth: 200, mt: 2 }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Booking Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            shouldDisableDate={disableDates}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default BookingDatePicker;
