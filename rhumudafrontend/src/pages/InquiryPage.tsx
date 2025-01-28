import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Container,
} from "@mui/material";

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

const InquiryPage: React.FC = () => {
  const [customerInfo, setCustomerInfo] = React.useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const handleCustomerInfoChange =
    (field: keyof CustomerInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomerInfo((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Booking Inquiry
        </Typography>

        <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Customer Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={customerInfo.firstName}
                onChange={handleCustomerInfoChange("firstName")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={customerInfo.lastName}
                onChange={handleCustomerInfoChange("lastName")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={customerInfo.phoneNumber}
                onChange={handleCustomerInfoChange("phoneNumber")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange("email")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 1"
                value={customerInfo.addressLine1}
                onChange={handleCustomerInfoChange("addressLine1")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2"
                value={customerInfo.addressLine2}
                onChange={handleCustomerInfoChange("addressLine2")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Postal Code"
                value={customerInfo.postalCode}
                onChange={handleCustomerInfoChange("postalCode")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                value={customerInfo.city}
                onChange={handleCustomerInfoChange("city")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Country"
                value={customerInfo.country}
                onChange={handleCustomerInfoChange("country")}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default InquiryPage;
