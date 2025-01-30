import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  FormHelperText,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import { useLocation, useNavigate } from "react-router-dom";
import JettyPointDropdown from "../components/JettyPointDropdown";
import BookingDatePicker from "../components/BookingDatePicker";
import PassengerCounter from "../components/PassengerCounter";
import AddOnSelection from "../components/AddOnSelection";
import PackageDropdown from "../components/PackageDropdown";
import AlternativeDatePicker from "../components/AlternativeDatePicker";

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

interface ClearSections {
  customerInfo: boolean;
  reservationDetails: boolean;
  otherOptions: boolean;
}

interface ReservationValidationErrors {
  packageId: string;
}

interface AddOn {
  id: number;
  name: string;
  description: string | null;
  price: number;
  isActive: boolean;
}

interface IncludedService {
  name: string;
  id: number;
  serviceName: string;
  description: string | null;
}

interface PriceTier {
  id: number;
  ageMin: number | null;
  ageMax: number | null;
  price: number;
  type: string;
  label: string | null;
}

interface Package {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  maxCapacity: number;
  duration: number;
  distanceMinKm: number | null;
  distanceMaxKm: number | null;
  durationMinutes: number | null;
  isActive: boolean;
  categoryId: number;
  includedServices: IncludedService[];
  priceTiers: PriceTier[];
  services: IncludedService[];
}

interface StorageData {
  customerInfo: CustomerInfo;
  activeSection: number;
  reservationDetails: ReservationDetails;
  otherOptions: OtherOptions;
}

const STORAGE_KEY = "rhumuda_inquiry_form";

const saveToLocalStorage = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

const InquiryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const [reservationValidationErrors, setReservationValidationErrors] =
    useState<ReservationValidationErrors>({
      packageId: "",
    });

  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [sectionsToDelete, setSectionsToDelete] = useState<ClearSections>({
    customerInfo: false,
    reservationDetails: false,
    otherOptions: false,
  });

  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [addOnsError, setAddOnsError] = useState<string | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1); // Default to boat charter

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/addons");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAddOns(data);
      } catch (error) {
        console.error("Error fetching add-ons:", error);
        setAddOnsError("Failed to load add-ons");
      }
    };

    fetchAddOns();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/packages/category/${selectedCategory}`
        );
        const data = await response.json();
        console.log("Raw Package Data:", data);
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    if (selectedCategory) {
      fetchPackages();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setCustomerInfo(savedData.customerInfo);
      setActiveSection(savedData.activeSection);
      if (savedData.reservationDetails) {
        setReservationDetails(savedData.reservationDetails);
      } else {
        // Initialize with search values if no saved data
        setReservationDetails({
          jettyPoint: searchValues.jettyPoint || "",
          bookingDate: searchValues.bookingDate || "",
          passengers: searchValues.passengers || 1,
          packageId: "",
          addOns: [],
        });
      }
      if (savedData.otherOptions) {
        setOtherOptions(savedData.otherOptions);
      }
    } else {
      // Initialize with search values if no saved data at all
      setReservationDetails({
        jettyPoint: searchValues.jettyPoint || "",
        bookingDate: searchValues.bookingDate || "",
        passengers: searchValues.passengers || 1,
        packageId: "",
        addOns: [],
      });
    }
  }, []);

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
          reservationDetails,
          otherOptions,
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

  const handleAddOnChange = (addOnId: string) => {
    setReservationDetails((prev) => {
      const currentAddOns = prev.addOns || [];
      const newAddOns = currentAddOns.includes(addOnId)
        ? currentAddOns.filter((id) => id !== addOnId)
        : [...currentAddOns, addOnId];

      return {
        ...prev,
        addOns: newAddOns,
      };
    });
  };

  const handleOtherOptionsChange =
    (field: keyof OtherOptions) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOtherOptions((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleDateChange = (field: keyof OtherOptions) => (value: string) => {
    setOtherOptions((prev) => {
      const newOptions = {
        ...prev,
        [field]: value,
      };
      saveToLocalStorage({
        customerInfo,
        activeSection,
        reservationDetails,
        otherOptions: newOptions,
      });
      return newOptions;
    });
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
        reservationDetails,
        otherOptions,
      });
    }

    if (activeSection === 1) {
      // Validate reservation details
      let hasErrors = false;
      const newErrors = { packageId: "" };

      if (!reservationDetails.packageId) {
        newErrors.packageId = "Please select a package";
        hasErrors = true;
      }

      setReservationValidationErrors(newErrors);

      if (hasErrors) {
        return;
      }
    }

    setActiveSection((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveSection((prev) => prev - 1);
  };

  const handleClearClick = () => {
    setClearDialogOpen(true);
  };

  const handleClearConfirm = () => {
    if (sectionsToDelete.customerInfo) {
      setCustomerInfo({
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
      // Clear localStorage if customer info is being cleared
      localStorage.removeItem(STORAGE_KEY);
    }

    if (sectionsToDelete.reservationDetails) {
      setReservationDetails({
        jettyPoint: "",
        bookingDate: "",
        passengers: 1,
        packageId: "",
        addOns: [],
      });
    }

    if (sectionsToDelete.otherOptions) {
      setOtherOptions({
        alternativeDate1: "",
        alternativeDate2: "",
        specialRemarks: "",
      });
    }

    // If all sections are being cleared, remove from localStorage
    if (
      sectionsToDelete.customerInfo &&
      sectionsToDelete.reservationDetails &&
      sectionsToDelete.otherOptions
    ) {
      localStorage.removeItem(STORAGE_KEY);
    }

    setClearDialogOpen(false);
    setSectionsToDelete({
      customerInfo: false,
      reservationDetails: false,
      otherOptions: false,
    });
  };

  const handleSectionChange =
    (section: keyof ClearSections) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSectionsToDelete((prev) => ({
        ...prev,
        [section]: event.target.checked,
      }));
    };

  const handleSelectAllSections = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.checked;
    setSectionsToDelete({
      customerInfo: newValue,
      reservationDetails: newValue,
      otherOptions: newValue,
    });
  };

  const handleNavigateToSummary = () => {
    navigate("/summary", {
      state: {
        customerInfo,
        reservationDetails,
        otherOptions,
      },
    });
  };

  const renderButtons = () => (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="outlined"
        onClick={handleClearClick}
        sx={{
          color: "#FF0000",
          borderColor: "#FF0000",
          "&:hover": {
            bgcolor: "rgba(255, 0, 0, 0.04)",
            borderColor: "#FF0000",
          },
        }}
      >
        Clear
      </Button>
      <Box sx={{ display: "flex", gap: 2 }}>
        {activeSection > 0 && (
          <Button
            variant="outlined"
            onClick={handlePrevious}
            sx={{ color: "#0384BD", borderColor: "#0384BD" }}
          >
            Previous
          </Button>
        )}
        {activeSection < 2 && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ bgcolor: "#0384BD", "&:hover": { bgcolor: "#026994" } }}
          >
            Next
          </Button>
        )}
        {activeSection === 2 && (
          <Button
            variant="contained"
            onClick={handleNavigateToSummary}
            sx={{ bgcolor: "#0384BD", "&:hover": { bgcolor: "#026994" } }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );

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

      {renderButtons()}
    </Paper>
  );

  const renderPackageInfo = () => {
    const selectedPackage = packages.find(
      (pkg) => pkg.id.toString() === reservationDetails.packageId
    );

    console.log("Selected Package:", selectedPackage);
    console.log("Services:", selectedPackage?.services);

    if (!selectedPackage) return null;

    return (
      <Box
        sx={{
          mt: 3,
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          bgcolor: "#f8f8f8",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Package Info
        </Typography>

        <Grid container spacing={3}>
          {/* Package Name and Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={500}>
              {selectedPackage.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedPackage.description}
            </Typography>
          </Grid>

          {/* Duration and Capacity */}
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                <Typography variant="body2">
                  Duration: {selectedPackage.durationMinutes} minutes
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <GroupsIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                <Typography variant="body2">
                  Max Capacity: {selectedPackage.maxCapacity} persons
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Price Tiers */}
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PaidIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                <Stack>
                  {selectedPackage.priceTiers.map((tier) => (
                    <Typography key={tier.id} variant="body2">
                      {tier.price === 0 ? "FREE" : `RM${tier.price}`} |{" "}
                      {tier.type}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          {/* Included Services */}
          {selectedPackage.services && selectedPackage.services.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Services Included:
              </Typography>
              <Stack spacing={0.5}>
                {selectedPackage.services.map((service) => (
                  <Typography
                    key={service.id}
                    variant="body2"
                    color="text.secondary"
                  >
                    {service.name || service.serviceName}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  };

  const renderReservationDetails = () => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Reservation Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as number);
                setReservationDetails((prev) => ({
                  ...prev,
                  packageId: "",
                }));
              }}
              label="Category"
            >
              <MenuItem value={1}>Boat Charter</MenuItem>
              <MenuItem value={2}>Day Trip</MenuItem>
              <MenuItem value={3}>Fishing</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PackageDropdown
            value={reservationDetails.packageId}
            onChange={(value) => {
              setReservationDetails((prev) => ({
                ...prev,
                packageId: value,
              }));
            }}
            error={reservationValidationErrors.packageId}
            categoryId={selectedCategory}
          />
        </Grid>
        <Grid item xs={12}>
          {renderPackageInfo()}
          <AddOnSelection
            selectedAddOns={reservationDetails.addOns}
            onAddOnChange={handleAddOnChange}
          />
        </Grid>
      </Grid>

      {renderButtons()}
    </Paper>
  );

  const renderOtherOptions = () => (
    <Paper elevation={0} sx={{ p: 4, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Other Options
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AlternativeDatePicker
            label="Alternative Booking Date 1"
            value={otherOptions.alternativeDate1}
            onChange={handleDateChange("alternativeDate1")}
            mainBookingDate={reservationDetails.bookingDate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AlternativeDatePicker
            label="Alternative Booking Date 2"
            value={otherOptions.alternativeDate2}
            onChange={handleDateChange("alternativeDate2")}
            mainBookingDate={reservationDetails.bookingDate}
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
            inputProps={{ maxLength: 500 }}
            helperText={`${otherOptions.specialRemarks.length}/500 characters`}
          />
        </Grid>
      </Grid>

      {renderButtons()}
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

      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        PaperProps={{
          sx: {
            width: "400px",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#0384BD",
            color: "white",
            py: 2,
          }}
        >
          Clear Sections
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to clear your progress? Please select which
            section you want to clear:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={sectionsToDelete.customerInfo}
                  onChange={handleSectionChange("customerInfo")}
                />
              }
              label="Customer Information"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sectionsToDelete.reservationDetails}
                  onChange={handleSectionChange("reservationDetails")}
                />
              }
              label="Reservation Details"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sectionsToDelete.otherOptions}
                  onChange={handleSectionChange("otherOptions")}
                />
              }
              label="Other Options"
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  sectionsToDelete.customerInfo &&
                  sectionsToDelete.reservationDetails &&
                  sectionsToDelete.otherOptions
                }
                onChange={handleSelectAllSections}
              />
            }
            label="All of the above"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setClearDialogOpen(false)}
            variant="outlined"
            sx={{ color: "#0384BD", borderColor: "#0384BD" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClearConfirm}
            variant="contained"
            sx={{ bgcolor: "#FF0000", "&:hover": { bgcolor: "#D32F2F" } }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InquiryPage;
