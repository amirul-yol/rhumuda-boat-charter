import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Grid } from "@mui/material";

// Import interfaces from InquiryPage
interface CustomerInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
}

interface ReservationDetails {
  jettyPoint: string;
  bookingDate: string;
  passengers: number;
  packageId: string;
  addOns: string[];
}

interface OtherOptions {
  alternativeDate1: string;
  alternativeDate2: string;
  specialRemarks: string;
}

interface StorageData {
  customerInfo: CustomerInfo;
  activeSection: number;
  reservationDetails: ReservationDetails;
  otherOptions: OtherOptions;
  bookingId?: string;
}

const STORAGE_KEY = "rhumuda_inquiry_form";

const SummaryPage: React.FC = () => {
  const [data, setData] = useState<StorageData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      console.log("Loaded data:", JSON.parse(savedData));
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Booking Summary
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Booking ID
          </Typography>
          <Typography>{data.bookingId || "Not generated"}</Typography>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Customer Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>First Name:</strong> {data.customerInfo.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {data.customerInfo.lastName}
              </Typography>
              <Typography>
                <strong>Phone Number:</strong> {data.customerInfo.phoneNumber}
              </Typography>
              <Typography>
                <strong>Email:</strong> {data.customerInfo.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Address Line 1:</strong>{" "}
                {data.customerInfo.addressLine1}
              </Typography>
              <Typography>
                <strong>Address Line 2:</strong>{" "}
                {data.customerInfo.addressLine2 || "N/A"}
              </Typography>
              <Typography>
                <strong>Postal Code:</strong> {data.customerInfo.postalCode}
              </Typography>
              <Typography>
                <strong>City:</strong> {data.customerInfo.city}
              </Typography>
              <Typography>
                <strong>Country:</strong> {data.customerInfo.country}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Reservation Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Jetty Point:</strong>{" "}
                {data.reservationDetails.jettyPoint}
              </Typography>
              <Typography>
                <strong>Booking Date:</strong>{" "}
                {data.reservationDetails.bookingDate}
              </Typography>
              <Typography>
                <strong>Number of Passengers:</strong>{" "}
                {data.reservationDetails.passengers}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Package ID:</strong> {data.reservationDetails.packageId}
              </Typography>
              <Typography>
                <strong>Add-ons:</strong>{" "}
                {data.reservationDetails.addOns.length > 0
                  ? data.reservationDetails.addOns.join(", ")
                  : "No add-ons selected"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Other Options
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <strong>Alternative Date 1:</strong>{" "}
                {data.otherOptions.alternativeDate1 || "Not specified"}
              </Typography>
              <Typography>
                <strong>Alternative Date 2:</strong>{" "}
                {data.otherOptions.alternativeDate2 || "Not specified"}
              </Typography>
              <Typography>
                <strong>Special Remarks:</strong>{" "}
                {data.otherOptions.specialRemarks || "No special remarks"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default SummaryPage;
