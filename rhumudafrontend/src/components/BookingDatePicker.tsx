import React from "react";
import { Box, FormControl, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const BookingDatePicker = () => {
  const tomorrow = dayjs().add(1, "day");
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    tomorrow
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  // Disable past dates and dates more than 3 months ahead
  const disableDates = (date: Dayjs) => {
    const today = dayjs();
    const threeMonthsFromNow = today.add(3, "month");
    return (
      date.isBefore(today, "day") || date.isAfter(threeMonthsFromNow, "day")
    );
  };

  return (
    <Box sx={{ minWidth: 200, mt: 0 }}>
      <FormControl fullWidth>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
          <CalendarMonthIcon
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
            Booking Date
          </InputLabel>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            shouldDisableDate={disableDates}
            format="DD/MM/YYYY"
            open={open}
            onClose={() => setOpen(false)}
            slotProps={{
              textField: {
                fullWidth: true,
                onClick: handleClick,
                variant: "standard",
                InputProps: {
                  readOnly: true,
                },
              },
              popper: {
                sx: {
                  "& .MuiPaper-root": {
                    width: "320px",
                  },
                  "& .MuiPickersCalendarHeader-root": {
                    paddingLeft: "12px",
                    paddingRight: "12px",
                  },
                  "& .MuiDayCalendar-header, .MuiDayCalendar-weekContainer": {
                    justifyContent: "space-around",
                    margin: "0 6px",
                  },
                },
                placement: "bottom",
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 8],
                    },
                  },
                  {
                    name: "flip",
                    options: {
                      fallbackPlacements: ["top"],
                    },
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      mainAxis: true,
                      altAxis: true,
                      tether: false,
                      altBoundary: true,
                    },
                  },
                ],
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default BookingDatePicker;
