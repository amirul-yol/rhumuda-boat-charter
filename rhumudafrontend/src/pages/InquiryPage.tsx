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
import { useLocation } from "react-router-dom";
import JettyPointDropdown from "../components/JettyPointDropdown";
import BookingDatePicker from "../components/BookingDatePicker";
import PassengerCounter from "../components/PassengerCounter";

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

interface ValidationErrors {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  postalCode: string;
  city: string;
  country: string;
}

const STORAGE_KEY = "rhumuda_inquiry_form";

const saveToLocalStorage = (data: {
  customerInfo: CustomerInfo;
  activeSection: number;
}) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

const InquiryPage: React.FC = () => {
  const location = useLocation();
  const searchValues = location.state || {
    jettyPoint: "",
    bookingDate: "",
    passengers: 1,
  };

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
      jettyPoint: searchValues.jettyPoint,
      bookingDate: searchValues.bookingDate,
      passengers: searchValues.passengers,
      packageId: "",
      addOns: [],
    });

  const [otherOptions, setOtherOptions] = React.useState<OtherOptions>({
    alternativeDate1: "",
    alternativeDate2: "",
    specialRemarks: "",
  });

  const [errors, setErrors] = React.useState<ValidationErrors>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "",
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

  const validateName = (name: string): string => {
    if (!name) return "This field is required";
    if (name.length < 2) return "Must be at least 2 characters";
    if (!/^[a-zA-Z\s]*$/.test(name)) return "Only letters and spaces allowed";
    return "";
  };

  const validatePhoneNumber = (phone: string): string => {
    if (!phone) return "This field is required";

    // Remove any potential spaces
    const cleanPhone = phone.replace(/\s/g, "");

    // Check for valid formats: +601234567890 or 01234567890
    const phoneRegex = /^(\+?60|0)\d{9,10}$/;

    if (!phoneRegex.test(cleanPhone)) {
      return "Invalid format. Use +601234567890 or 01234567890";
    }

    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email) return "This field is required";

    // RFC 5322 standard email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }

    return "";
  };

  const validateAddressLine1 = (address: string): string => {
    if (!address) return "This field is required";
    if (address.length < 5) return "Address must be at least 5 characters long";
    return "";
  };

  const validatePostalCode = (postalCode: string): string => {
    if (!postalCode) return "This field is required";

    // Check for exactly 5 digits
    const postalCodeRegex = /^\d{5}$/;

    if (!postalCodeRegex.test(postalCode)) {
      return "Invalid format. Must be 5 digits (e.g., 12345)";
    }

    return "";
  };

  const validateCity = (city: string): string => {
    if (!city) return "This field is required";
    if (city.length < 2) return "Must be at least 2 characters";
    if (!/^[a-zA-Z\s]*$/.test(city)) return "Only letters and spaces allowed";
    return "";
  };

  const validateCountry = (country: string): string => {
    if (!country) return "This field is required";
    if (country.length < 2) return "Must be at least 2 characters";
    if (!/^[a-zA-Z\s]*$/.test(country))
      return "Only letters and spaces allowed";
    return "";
  };

  const handleCustomerInfoChange =
    (field: keyof CustomerInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCustomerInfo((prev) => {
        const newInfo = {
          ...prev,
          [field]: value,
        };
        // Auto-save to localStorage
        saveToLocalStorage({
          customerInfo: newInfo,
          activeSection,
        });
        return newInfo;
      });

      switch (field) {
        case "firstName":
        case "lastName":
          setErrors((prev) => ({
            ...prev,
            [field]: validateName(value),
          }));
          break;
        case "phoneNumber":
          setErrors((prev) => ({
            ...prev,
            phoneNumber: validatePhoneNumber(value),
          }));
          break;
        case "email":
          setErrors((prev) => ({
            ...prev,
            email: validateEmail(value),
          }));
          break;
        case "addressLine1":
          setErrors((prev) => ({
            ...prev,
            addressLine1: validateAddressLine1(value),
          }));
          break;
        case "postalCode":
          setErrors((prev) => ({
            ...prev,
            postalCode: validatePostalCode(value),
          }));
          break;
        case "city":
          setErrors((prev) => ({
            ...prev,
            city: validateCity(value),
          }));
          break;
        case "country":
          setErrors((prev) => ({
            ...prev,
            country: validateCountry(value),
          }));
          break;
      }
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

  const handleOtherOptionsChange =
    (field: keyof OtherOptions) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOtherOptions((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleNext = () => {
    if (activeSection === 0) {
      const firstNameError = validateName(customerInfo.firstName);
      const lastNameError = validateName(customerInfo.lastName);
      const phoneNumberError = validatePhoneNumber(customerInfo.phoneNumber);
      const emailError = validateEmail(customerInfo.email);
      const addressLine1Error = validateAddressLine1(customerInfo.addressLine1);
      const postalCodeError = validatePostalCode(customerInfo.postalCode);
      const cityError = validateCity(customerInfo.city);
      const countryError = validateCountry(customerInfo.country);

      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        phoneNumber: phoneNumberError,
        email: emailError,
        addressLine1: addressLine1Error,
        postalCode: postalCodeError,
        city: cityError,
        country: countryError,
      });

      if (
        firstNameError ||
        lastNameError ||
        phoneNumberError ||
        emailError ||
        addressLine1Error ||
        postalCodeError ||
        cityError ||
        countryError
      ) {
        return;
      }

      // Save to localStorage before proceeding
      saveToLocalStorage({
        customerInfo,
        activeSection: activeSection + 1,
      });
    }

    setActiveSection((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveSection((prev) => prev - 1);
  };

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setCustomerInfo(savedData.customerInfo);
      setActiveSection(savedData.activeSection);
    }
  }, []);

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
            error={!!errors.firstName}
            helperText={errors.firstName}
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                firstName: validateName(customerInfo.firstName),
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={customerInfo.lastName}
            onChange={handleCustomerInfoChange("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName}
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                lastName: validateName(customerInfo.lastName),
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={customerInfo.phoneNumber}
            onChange={handleCustomerInfoChange("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            placeholder="+601234567890"
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                phoneNumber: validatePhoneNumber(customerInfo.phoneNumber),
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            value={customerInfo.email}
            onChange={handleCustomerInfoChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="example@email.com"
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                email: validateEmail(customerInfo.email),
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 1"
            value={customerInfo.addressLine1}
            onChange={handleCustomerInfoChange("addressLine1")}
            error={!!errors.addressLine1}
            helperText={errors.addressLine1}
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                addressLine1: validateAddressLine1(customerInfo.addressLine1),
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2"
            value={customerInfo.addressLine2}
            onChange={handleCustomerInfoChange("addressLine2")}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Postal Code"
            value={customerInfo.postalCode}
            onChange={handleCustomerInfoChange("postalCode")}
            error={!!errors.postalCode}
            helperText={errors.postalCode}
            placeholder="12345"
            inputProps={{ maxLength: 5 }}
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                postalCode: validatePostalCode(customerInfo.postalCode),
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="City"
            value={customerInfo.city}
            onChange={handleCustomerInfoChange("city")}
            error={!!errors.city}
            helperText={errors.city}
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                city: validateCity(customerInfo.city),
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Country"
            value={customerInfo.country}
            onChange={handleCustomerInfoChange("country")}
            error={!!errors.country}
            helperText={errors.country}
            onBlur={() => {
              setErrors((prev) => ({
                ...prev,
                country: validateCountry(customerInfo.country),
              }));
            }}
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
          <JettyPointDropdown
            value={reservationDetails.jettyPoint}
            onChange={(value) =>
              setReservationDetails((prev) => ({
                ...prev,
                jettyPoint: value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BookingDatePicker
            value={reservationDetails.bookingDate}
            onChange={(value) =>
              setReservationDetails((prev) => ({
                ...prev,
                bookingDate: value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PassengerCounter
            value={reservationDetails.passengers}
            onChange={(value) =>
              setReservationDetails((prev) => ({
                ...prev,
                passengers: value,
              }))
            }
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

  const renderOtherOptions = () => (
    <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Other Options
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Alternative Booking Date 1"
            value={otherOptions.alternativeDate1}
            onChange={handleOtherOptionsChange("alternativeDate1")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Alternative Booking Date 2"
            value={otherOptions.alternativeDate2}
            onChange={handleOtherOptionsChange("alternativeDate2")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Special Remarks/Requests"
            value={otherOptions.specialRemarks}
            onChange={handleOtherOptionsChange("specialRemarks")}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
      </Grid>

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
        {activeSection === 2 && renderOtherOptions()}
      </Box>
    </Container>
  );
};

export default InquiryPage;
