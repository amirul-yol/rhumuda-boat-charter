import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import locationMap from "../assets/images/location-rhumuda.png";
import Description from "../components/Description";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CompletionDialog from "../components/CompletionDialog";
import BookingEditDialog from "../components/BookingEditDialog";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";
import SendIcon from "@mui/icons-material/Send";

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

interface JettyPoint {
  id: number;
  name: string;
  isActive: boolean;
}

interface AddOn {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
}

interface PriceTier {
  id: number;
  ageMin: number | null;
  ageMax: number | null;
  price: number;
  type: string;
  label: string | null;
}

interface IncludedService {
  id: number;
  name?: string;
  serviceName?: string;
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
  priceTiers: PriceTier[];
  services: IncludedService[];
}

interface StorageData {
  customerInfo: CustomerInfo;
  activeSection: number;
  reservationDetails: ReservationDetails;
  otherOptions: OtherOptions;
  bookingId?: string;
}

interface BookingData {
  bookingId: string;
  status: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  jettyPoint: {
    id: number;
    name: string;
  };
  packageDetails: {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    maxCapacity: number;
    durationMinutes: number;
    services: Array<{
      id: number;
      name: string;
    }>;
  };
  bookingDate: string;
  passengers: number;
  alternativeDate1: string | null;
  alternativeDate2: string | null;
  specialRemarks: string | null;
  addOns: Array<{
    id: number;
    name: string;
    price: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "rhumuda_inquiry_form";

const formatDate = (dateString: string | null) => {
  return dateString ? dayjs(dateString).format("DD/MM/YYYY") : "Not specified";
};

const SummaryPage: React.FC = () => {
  const [data, setData] = useState<StorageData | null>(null);
  const [jettyPoints, setJettyPoints] = useState<JettyPoint[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const navigate = useNavigate();
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  const [clearLocalStorage, setClearLocalStorage] = useState(false);
  const { bookingId } = useParams<{ bookingId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const fetchBookingData = async () => {
    if (!bookingId) {
      setError("No booking ID provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch booking data and all packages from all categories
      const [bookingResponse, ...packageResponses] = await Promise.all([
        fetch(`http://localhost:8080/api/bookings/${bookingId}`),
        fetch("http://localhost:8080/api/packages/category/1"),
        fetch("http://localhost:8080/api/packages/category/2"),
        fetch("http://localhost:8080/api/packages/category/3"),
      ]);

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.message || "Failed to fetch booking data");
      }

      // Check if any package response failed
      const failedPackageResponse = packageResponses.find(
        (response) => !response.ok
      );
      if (failedPackageResponse) {
        throw new Error("Failed to fetch packages data");
      }

      const bookingData = await bookingResponse.json();
      const packagesData = (
        await Promise.all(packageResponses.map((r) => r.json()))
      ).flat();

      setBooking(bookingData);
      setPackages(packagesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided");
      setLoading(false);
      return;
    }
    fetchBookingData();
  }, [bookingId]);

  useEffect(() => {
    const fetchJettyPoints = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jetty-points");
        const data = await response.json();
        setJettyPoints(data);
      } catch (error) {
        console.error("Error fetching jetty points:", error);
      }
    };

    fetchJettyPoints();
  }, []);

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
      }
    };

    fetchAddOns();
  }, []);

  const getJettyPointName = (jettyPoint: any) => {
    return jettyPoint?.name || "Unknown Jetty Point";
  };

  const getPackageName = (packageDetails: any) => {
    return packageDetails?.name || "Unknown Package";
  };

  const getAddOnName = (id: string) => {
    const addon = addOns.find((a) => a.id.toString() === id);
    return addon ? addon.name : id;
  };

  const renderPackageInfo = (packageId: string) => {
    const selectedPackage = packages.find(
      (pkg) => pkg.id.toString() === packageId
    );

    if (!selectedPackage) return null;

    return (
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* Package Description */}
          <Grid item xs={12}>
            <Description text={selectedPackage.description} />
          </Grid>

          {/* Duration, Capacity, and Distance */}
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
              {selectedPackage.distanceMinKm &&
                selectedPackage.distanceMaxKm && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DirectionsBoatIcon
                      sx={{ color: "#0384BD", fontSize: 20 }}
                    />
                    <Typography variant="body2">
                      Distance: {selectedPackage.distanceMinKm} -{" "}
                      {selectedPackage.distanceMaxKm} km
                    </Typography>
                  </Stack>
                )}
            </Stack>
          </Grid>

          {/* Price Tiers */}
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PaidIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                <Stack>
                  {selectedPackage.priceTiers?.map((tier) => (
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

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleBookingUpdate = () => {
    setSuccessMessage("Booking updated successfully!");
    fetchBookingData();
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  useEffect(() => {
    if (clearLocalStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [clearLocalStorage]);

  const getStatusDetails = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETE":
        return {
          label: "Booking Complete",
          color: "success" as const,
          icon: <CheckCircleIcon />,
          // description: 'Your booking has been approved by our team.'
        };
      case "PENDING":
        return {
          label: "Inquiry Sent",
          color: "warning" as const,
          icon: <PendingIcon />,
          // description: 'Your inquiry has been sent and is awaiting approval from our team.'
        };
      case "CANCELLED":
        return {
          label: "Booking Cancelled",
          color: "error" as const,
          icon: <ErrorIcon />,
          // description: 'This booking has been cancelled.'
        };
      case "INCOMPLETE":
      default:
        return {
          label: "Incomplete",
          color: "error" as const,
          icon: <ErrorIcon />,
          // description: 'Please review your booking details and click "Send Inquiry" to submit your booking.'
        };
    }
  };

  const handleSendInquiry = async () => {
    try {
      setLoading(true);

      // First, update the booking status
      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}/submit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit inquiry");
      }

      setSuccessMessage(
        "Your inquiry has been sent successfully! Please check your email for confirmation."
      );
      setShowCompletionDialog(true);
      fetchBookingData(); // Refresh to get updated status
    } catch (error) {
      console.error("Error sending inquiry:", error);
      setError(
        error instanceof Error ? error.message : "Failed to send inquiry"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowCompletionDialog(false);
  };

  const renderActionButton = () => {
    if (!booking) return null;

    switch (booking.status?.toUpperCase()) {
      case "COMPLETE":
        return (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            disabled
          >
            Booking Complete
          </Button>
        );
      case "PENDING":
        return (
          <Button
            variant="contained"
            color="warning"
            startIcon={<PendingIcon />}
            disabled
          >
            Inquiry Sent
          </Button>
        );
      case "CANCELLED":
        return (
          <Button
            variant="contained"
            color="error"
            startIcon={<ErrorIcon />}
            disabled
          >
            Booking Cancelled
          </Button>
        );
      case "INCOMPLETE":
      default:
        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            onClick={handleSendInquiry}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Send Inquiry"}
          </Button>
        );
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography color="error" variant="h6" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={fetchBookingData}
            startIcon={<RefreshIcon />}
          >
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6">No booking data found</Typography>
        </Box>
      </Container>
    );
  }

  // Add null checks for booking and packages
  const selectedPackage = booking?.packageDetails?.id
    ? packages.find((pkg) => pkg.id === booking.packageDetails.id)
    : null;

  if (!booking || !selectedPackage) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column - 70% */}
        <Grid item xs={12} md={8}>
          {/* Booking ID and Package Name Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              Booking ID: #{booking?.bookingId}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Package: {getPackageName(booking?.packageDetails)}
            </Typography>
            <Divider
              sx={{ borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: 1 }}
            />
          </Box>

          {/* Package Description Section */}
          <Box sx={{ mb: 3 }}>
            {selectedPackage?.description && (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    fontSize: "1.1rem",
                    color: "black",
                    lineHeight: 1.7,
                  }}
                >
                  Embark on an unforgettable fishing adventure with RhuMuda Boat
                  Charter. Our experienced captains will take you to the best
                  fishing spots, where you can cast your line and reel in a
                  variety of fish species. Whether you're a seasoned angler or a
                  beginner, we'll provide you with all the necessary equipment
                  and expert guidance.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    fontSize: "1.1rem",
                    color: "black",
                    lineHeight: 1.7,
                  }}
                >
                  Our fishing charters offer a unique opportunity to relax,
                  unwind, and enjoy the thrill of the catch. We cater to both
                  inshore, offshore, and night fishing - depending on your
                  preferences and the season.
                </Typography>
                <Divider
                  sx={{ borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: 1 }}
                />
              </>
            )}
          </Box>

          {/* Customer Details Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Customer Details
            </Typography>
            <Box
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
                p: 3,
                mb: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: "1rem", color: "black", mb: 1 }}>
                    <strong>Name:</strong>{" "}
                    {`${booking?.firstName} ${booking?.lastName}`}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "black", mb: 1 }}>
                    <strong>Email:</strong> {booking?.email}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", color: "black", mb: 1 }}>
                    <strong>Phone:</strong> {booking?.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: "1rem", color: "black", mb: 1 }}>
                    <strong>Address:</strong>{" "}
                    {`${booking?.addressLine1}${
                      booking?.addressLine2 ? ` ${booking.addressLine2}` : ""
                    }, ${booking?.postalCode} ${booking?.city}, ${
                      booking?.country
                    }`}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleEditClick}
                  sx={{
                    bgcolor: "#0384BD",
                    "&:hover": { bgcolor: "#026994" },
                    textTransform: "none",
                    borderRadius: "4px",
                    px: 3,
                  }}
                >
                  Edit Details
                </Button>
              </Box>
            </Box>
            <Divider
              sx={{ borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: 1 }}
            />
          </Box>

          {/* Services Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Services
            </Typography>
            <Grid container spacing={3}>
              {/* Duration, Capacity, and Distance */}
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                    <Typography sx={{ fontSize: "1rem", color: "black" }}>
                      Duration: {selectedPackage?.durationMinutes || 0} minutes
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <GroupsIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                    <Typography sx={{ fontSize: "1rem", color: "black" }}>
                      Max Capacity: {selectedPackage?.maxCapacity || 0} persons
                    </Typography>
                  </Stack>
                  {selectedPackage?.distanceMinKm &&
                    selectedPackage?.distanceMaxKm && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <DirectionsBoatIcon
                          sx={{ color: "#0384BD", fontSize: 20 }}
                        />
                        <Typography sx={{ fontSize: "1rem", color: "black" }}>
                          Distance: {selectedPackage.distanceMinKm} -{" "}
                          {selectedPackage.distanceMaxKm} km
                        </Typography>
                      </Stack>
                    )}
                </Stack>
              </Grid>

              {/* Included Services - Moved to right side */}
              <Grid item xs={12} md={6}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "black",
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Services Included:
                </Typography>
                <Stack spacing={0.5}>
                  {selectedPackage?.services?.map((service) => (
                    <Typography
                      key={service.id}
                      sx={{ fontSize: "1rem", color: "black" }}
                    >
                      {service.name || service.serviceName}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            <Divider
              sx={{ borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: 1, mt: 3 }}
            />
          </Box>

          {/* Location Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Location
            </Typography>
            <Box
              component="a"
              href="https://maps.app.goo.gl/vwFiMqMgWNzB9J8f9"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "block",
                cursor: "pointer",
                width: "100%",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              <img
                src={locationMap}
                alt="Location Map"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Divider
              sx={{ borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: 1, mt: 3 }}
            />
          </Box>

          {/* Cancellation Policy Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Cancellation Policy
            </Typography>
            <Typography sx={{ fontSize: "1rem", color: "black", mb: 2 }}>
              Full refund up to 7 days prior
            </Typography>
            <Divider
              sx={{ borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: 1 }}
            />
          </Box>
        </Grid>

        {/* Right Column - 30% */}
        <Grid item xs={12} md={4}>
          {/* Booking Status Section */}
          <Paper
            elevation={3}
            sx={{ p: 3, mb: 3, position: "sticky", top: 24 }}
          >
            <Typography variant="h6" gutterBottom>
              Booking Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Chip
                icon={getStatusDetails(booking?.status).icon}
                label={getStatusDetails(booking?.status).label}
                color={getStatusDetails(booking?.status).color}
                sx={{ fontSize: "1rem", py: 2, px: 1 }}
              />
            </Box>
            {/* <Typography color="text.secondary">
              {getStatusDetails(booking?.status).description}
            </Typography> */}
            {booking?.status === "PENDING" && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Submitted on:{" "}
                {dayjs(booking?.createdAt).format("DD MMM YYYY, HH:mm")}
              </Typography>
            )}
          </Paper>

          {/* Estimated Cost Section */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              maxWidth: "400px",
              mx: "auto",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Estimated Cost
            </Typography>
            {/* Total Cost Display */}
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: "bold",
              }}
            >
              MYR{" "}
              {(() => {
                const hasFixedPrice = selectedPackage?.priceTiers.some(
                  (tier) => tier.type === "FIXED"
                );

                const baseCost = selectedPackage
                  ? hasFixedPrice
                    ? selectedPackage.basePrice
                    : selectedPackage.basePrice * (booking?.passengers || 0)
                  : 0;

                const addOnsCost = booking?.addOns
                  ? booking.addOns.reduce(
                      (total, addon) => total + addon.price,
                      0
                    )
                  : 0;

                return (baseCost + addOnsCost).toFixed(2);
              })()}
            </Typography>

            {/* Details Grid */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                Jetty Location
              </Typography>
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "4px",
                  p: 1.5,
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                {getJettyPointName(booking?.jettyPoint)}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    Date
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                      borderRadius: "4px",
                      p: 1.5,
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {formatDate(booking?.bookingDate)}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "text.secondary" }}
                  >
                    Group Size
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                      borderRadius: "4px",
                      p: 1.5,
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {booking?.passengers} persons
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Cost Breakdown */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Base Cost</Typography>
                <Typography variant="body2">
                  RM {selectedPackage?.basePrice.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Add On:
              </Typography>
              {booking?.addOns && booking.addOns.length > 0 ? (
                booking.addOns.map((addon) => (
                  <Box
                    key={addon.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                      pl: 2,
                    }}
                  >
                    <Typography variant="body2">{addon.name}</Typography>
                    <Typography variant="body2">
                      RM {addon.price.toFixed(2)}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  sx={{ pl: 2, color: "text.secondary" }}
                >
                  None
                </Typography>
              )}
            </Box>

            {/* Total and Action Button */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                  pt: 2,
                  mb: 3,
                }}
              >
                <Typography>Total</Typography>
                <Typography>
                  RM{" "}
                  {(() => {
                    const hasFixedPrice = selectedPackage?.priceTiers.some(
                      (tier) => tier.type === "FIXED"
                    );

                    const baseCost = selectedPackage
                      ? hasFixedPrice
                        ? selectedPackage.basePrice
                        : selectedPackage.basePrice * (booking?.passengers || 0)
                      : 0;

                    const addOnsCost = booking?.addOns
                      ? booking.addOns.reduce(
                          (total, addon) => total + addon.price,
                          0
                        )
                      : 0;

                    return (baseCost + addOnsCost).toFixed(2);
                  })()}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {booking?.status === "PENDING" && (
                  <Button
                    variant="contained"
                    disabled
                    fullWidth
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.12)",
                      color: "rgba(0, 0, 0, 0.38)",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    Inquiry Sent
                  </Button>
                )}
                {booking?.status !== "PENDING" && renderActionButton()}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialogs and Snackbars - Keep these outside the grid */}
      <BookingEditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        bookingId={booking?.bookingId || ""}
        onUpdate={handleBookingUpdate}
      />
      <CompletionDialog
        open={showCompletionDialog}
        onClose={handleCloseDialog}
      />
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        message={successMessage}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Container>
  );
};

export default SummaryPage;
