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
  Chip
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import SendIcon from '@mui/icons-material/Send';

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
        fetch("http://localhost:8080/api/packages/category/3")
      ]);

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.message || "Failed to fetch booking data");
      }

      // Check if any package response failed
      const failedPackageResponse = packageResponses.find(response => !response.ok);
      if (failedPackageResponse) {
        throw new Error("Failed to fetch packages data");
      }

      const bookingData = await bookingResponse.json();
      const packagesData = (await Promise.all(packageResponses.map(r => r.json()))).flat();

      setBooking(bookingData);
      setPackages(packagesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [bookingId]);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      console.log("Loaded data:", JSON.parse(savedData));
      setData(JSON.parse(savedData));
    }
  }, []);

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

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.bookingId === bookingId) {
        // Use saved data
        setBooking(parsedData);
        setLoading(false);
        return;
      }
    }

    fetchBookingData();
  }, [bookingId]);

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
      case 'COMPLETE':
        return {
          label: 'Booking Complete',
          color: 'success' as const,
          icon: <CheckCircleIcon />,
          description: 'Your booking has been approved by our team.'
        };
      case 'PENDING':
        return {
          label: 'Inquiry Sent',
          color: 'warning' as const,
          icon: <PendingIcon />,
          description: 'Your inquiry has been sent and is awaiting approval from our team.'
        };
      case 'CANCELLED':
        return {
          label: 'Booking Cancelled',
          color: 'error' as const,
          icon: <ErrorIcon />,
          description: 'This booking has been cancelled.'
        };
      case 'INCOMPLETE':
      default:
        return {
          label: 'Incomplete',
          color: 'error' as const,
          icon: <ErrorIcon />,
          description: 'Please review your booking details and click "Send Inquiry" to submit your booking.'
        };
    }
  };

  const handleSendInquiry = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/submit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'PENDING' })  // Update to PENDING when sending inquiry
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit inquiry');
      }

      setSuccessMessage('Your inquiry has been sent successfully!');
      setShowCompletionDialog(true);
      fetchBookingData(); // Refresh to get updated status
    } catch (error) {
      console.error('Error sending inquiry:', error);
      setError(error instanceof Error ? error.message : 'Failed to send inquiry');
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
      case 'COMPLETE':
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
      case 'PENDING':
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
      case 'CANCELLED':
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
      case 'INCOMPLETE':
      default:
        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            onClick={handleSendInquiry}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Inquiry'}
          </Button>
        );
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
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
          <Typography variant="h6">
            No booking data found
          </Typography>
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
        <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Booking Summary
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Booking ID:</strong> {booking.bookingId}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Package:</strong>{" "}
                {getPackageName(booking.packageDetails)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {selectedPackage?.description && (
                <Description text={selectedPackage.description} />
              )}
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <strong>Name:</strong>{" "}
                {`${booking.firstName} ${booking.lastName}`}
              </Typography>
              <Typography>
                <strong>Email:</strong> {booking.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {booking.phoneNumber}
              </Typography>
              <Typography>
                <strong>Address:</strong>{" "}
                {`${booking.addressLine1}${
                  booking.addressLine2 ? `, ${booking.addressLine2}` : ""
                }, ${booking.postalCode} ${booking.city}, ${booking.country}`}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleEditClick}
              sx={{ bgcolor: "#0384BD", "&:hover": { bgcolor: "#026994" } }}
            >
              Edit Details
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Services
          </Typography>
          <Grid container spacing={3}>
            {/* Duration, Capacity, and Distance */}
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                  <Typography variant="body2">
                    Duration: {selectedPackage?.durationMinutes || 0} minutes
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <GroupsIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                  <Typography variant="body2">
                    Max Capacity: {selectedPackage?.maxCapacity || 0} persons
                  </Typography>
                </Stack>
                {selectedPackage?.distanceMinKm && selectedPackage?.distanceMaxKm && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DirectionsBoatIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                    <Typography variant="body2">
                      Distance: {selectedPackage.distanceMinKm} - {selectedPackage.distanceMaxKm} km
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>

            {/* Included Services */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Services Included:
              </Typography>
              <Stack spacing={0.5}>
                {selectedPackage?.services?.map((service) => (
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
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
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
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            <img
              src={locationMap}
              alt="Location Map"
              style={{
                width: "60%",
                height: "auto",
                borderRadius: "4px",
              }}
            />
          </Box>
        </Paper>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Booking Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip
                icon={getStatusDetails(booking?.status).icon}
                label={getStatusDetails(booking?.status).label}
                color={getStatusDetails(booking?.status).color}
                sx={{ fontSize: '1rem', py: 2, px: 1 }}
              />
            </Box>
            <Typography color="text.secondary">
              {getStatusDetails(booking?.status).description}
            </Typography>
            {booking?.status === 'PENDING' && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Submitted on: {dayjs(booking.createdAt).format('DD MMM YYYY, HH:mm')}
              </Typography>
            )}
          </Paper>
        </Grid>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Estimated Cost
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography>
                  <strong>Jetty Point:</strong>{" "}
                  {getJettyPointName(booking.jettyPoint)}
                </Typography>
                <Typography>
                  <strong>Booking Date:</strong>{" "}
                  {formatDate(booking.bookingDate)}
                </Typography>
                <Typography>
                  <strong>Passengers:</strong>{" "}
                  {booking.passengers}
                </Typography>
                <Typography>
                  <strong>Alternative Date 1:</strong>{" "}
                  {formatDate(booking.alternativeDate1)}
                </Typography>
                <Typography>
                  <strong>Alternative Date 2:</strong>{" "}
                  {formatDate(booking.alternativeDate2)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography>
                  <strong>Base Cost:</strong>{" "}
                  {(() => {
                    const hasFixedPrice = selectedPackage?.priceTiers.some(
                      (tier) => tier.type === "FIXED"
                    );

                    const baseCost = selectedPackage ? (
                      hasFixedPrice
                        ? selectedPackage.basePrice
                        : selectedPackage.basePrice * booking.passengers
                    ) : 0;

                    const addOnsCost = booking.addOns ? booking.addOns.reduce(
                      (total, addon) => total + addon.price,
                      0
                    ) : 0;

                    return `RM${baseCost + addOnsCost}`;
                  })()}
                </Typography>
                <Typography component="div">
                  <strong>Add-ons:</strong>
                  {booking.addOns && booking.addOns.length > 0 ? (
                    <Box
                      component="ul"
                      sx={{ mt: 1, pl: 2, listStyleType: "none" }}
                    >
                      {booking.addOns.map((addon, index) => (
                        <li key={addon.id}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {index + 1}. {addon.name} - RM{addon.price}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      No add-ons selected
                    </Typography>
                  )}
                </Typography>
                <Typography sx={{ mt: 1 }} variant="subtitle1">
                  <strong>Est. Total:</strong>{" "}
                  {(() => {
                    const hasFixedPrice = selectedPackage?.priceTiers.some(
                      (tier) => tier.type === "FIXED"
                    );

                    const baseCost = selectedPackage ? (
                      hasFixedPrice
                        ? selectedPackage.basePrice
                        : selectedPackage.basePrice * booking.passengers
                    ) : 0;

                    const addOnsCost = booking.addOns ? booking.addOns.reduce(
                      (total, addon) => total + addon.price,
                      0
                    ) : 0;

                    return `RM${baseCost + addOnsCost}`;
                  })()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            {renderActionButton()}
          </Box>
        </Paper>
      </Box>
      {/* Only render dialog if bookingId exists */}
      {bookingId && (
        <BookingEditDialog 
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          bookingId={bookingId}
          onUpdate={handleBookingUpdate}
        />
      )}
      <CompletionDialog
        open={showCompletionDialog}
        onClose={handleCloseDialog}
      />
      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SummaryPage;
