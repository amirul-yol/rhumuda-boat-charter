import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";

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

const InquiryPage: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState<number>(0);
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

  const [reservationDetails, setReservationDetails] =
    React.useState<ReservationDetails>({
      jettyPoint: "",
      bookingDate: "",
      passengers: 1,
      packageId: "",
      addOns: [],
    });

  // Temporary mock data
  const mockPackages = [
    {
      id: "1",
      name: "Private Boat Charter",
      description: "Private boat charter for up to 8 people",
    },
    {
      id: "2",
      name: "Sharing Boat Charter",
      description: "Shared boat experience",
    },
  ];

  const mockAddOns = [
    { id: "1", name: "Life jacket & Safety equipment", price: 10 },
    { id: "2", name: "Snorkeling in water garden", price: 10 },
    { id: "3", name: "Boat tour around Pulau Kapas", price: 10 },
  ];

  const handleCustomerInfoChange =
    (field: keyof CustomerInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomerInfo((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleReservationDetailsChange =
    (field: keyof ReservationDetails) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setReservationDetails((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleAddOnChange =
    (addOnId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newAddOns = event.target.checked
        ? [...reservationDetails.addOns, addOnId]
        : reservationDetails.addOns.filter((id) => id !== addOnId);

      setReservationDetails((prev) => ({
        ...prev,
        addOns: newAddOns,
      }));
    };

  const handleNext = () => {
    setActiveSection((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveSection((prev) => prev - 1);
  };

  const renderCustomerInfo = () => (
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

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ bgcolor: "#0384BD", "&:hover": { bgcolor: "#026994" } }}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );

  const renderPackageInfo = () => {
    const selectedPackage = mockPackages.find(
      (pkg) => pkg.id === reservationDetails.packageId
    );

    if (!selectedPackage) return null;

    return (
      <Box
        sx={{
          mt: 3,
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          bgcolor: "#f8f8f8",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Package Info
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={500}>
              {selectedPackage.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedPackage.description}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ color: "#0384BD", fontSize: 20 }} />
              <Typography variant="body2">Duration: 12 hours</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <GroupsIcon sx={{ color: "#0384BD", fontSize: 20 }} />
              <Typography variant="body2">Max Capacity: 8 persons</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PaidIcon sx={{ color: "#0384BD", fontSize: 20 }} />
              <Typography variant="body2">Price: RM 750</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Services Included:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <Chip label="Return trip" size="small" />
              <Chip label="Free Activity" size="small" />
              <Chip label="Snorkeling" size="small" />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderReservationDetails = () => (
    <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Reservation Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Jetty Point"
            value={reservationDetails.jettyPoint}
            onChange={handleReservationDetailsChange("jettyPoint")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Booking Date"
            value={reservationDetails.bookingDate}
            onChange={handleReservationDetailsChange("bookingDate")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Passengers"
            type="number"
            value={reservationDetails.passengers}
            onChange={handleReservationDetailsChange("passengers")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Package</InputLabel>
            <Select
              value={reservationDetails.packageId}
              onChange={(e) =>
                setReservationDetails((prev) => ({
                  ...prev,
                  packageId: e.target.value,
                }))
              }
              label="Package"
            >
              {mockPackages.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Add-ons (RM10 each)
          </Typography>
          <FormGroup>
            {mockAddOns.map((addon) => (
              <FormControlLabel
                key={addon.id}
                control={
                  <Checkbox
                    checked={reservationDetails.addOns.includes(addon.id)}
                    onChange={handleAddOnChange(addon.id)}
                  />
                }
                label={addon.name}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>

      {renderPackageInfo()}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          sx={{ color: "#0384BD", borderColor: "#0384BD" }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ bgcolor: "#0384BD", "&:hover": { bgcolor: "#026994" } }}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Booking Inquiry
        </Typography>

        {activeSection === 0 && renderCustomerInfo()}
        {activeSection === 1 && renderReservationDetails()}
      </Box>
    </Container>
  );
};

export default InquiryPage;
