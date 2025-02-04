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
import EditBookingDialog from "../components/EditBookingDialog";

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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchBookingData = async () => {
    if (!bookingId) {
      setError("No booking ID provided");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch booking details");
      }

      setBooking(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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
    const fetchPackages = async () => {
      try {
        // Fetch all categories (1, 2, and 3)
        const responses = await Promise.all([
          fetch("http://localhost:8080/api/packages/category/1"),
          fetch("http://localhost:8080/api/packages/category/2"),
          fetch("http://localhost:8080/api/packages/category/3"),
        ]);

        const results = await Promise.all(responses.map((r) => r.json()));
        // Combine all packages into a single array
        const allPackages = results.flat();
        setPackages(allPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
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
    setOpenEditDialog(true);
  };

  const handleUpdateBooking = async (updatedData: any) => {
    setUpdateLoading(true);
    try {
      // Transform the data to match backend expectations
      const bookingData = {
        bookingId: bookingId, // Include the bookingId in the request
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        phoneNumber: updatedData.phoneNumber,
        addressLine1: updatedData.addressLine1,
        addressLine2: updatedData.addressLine2 || null,
        postalCode: updatedData.postalCode,
        city: updatedData.city,
        country: updatedData.country,
        jettyPoint: updatedData.jettyPoint.id.toString(),
        packageId: updatedData.packageDetails.id.toString(),
        bookingDate: updatedData.bookingDate,
        passengers: updatedData.passengers,
        addOns: updatedData.addOns.map((addon: any) => addon.id.toString()),
        alternativeDate1: updatedData.alternativeDate1 || null,
        alternativeDate2: updatedData.alternativeDate2 || null,
        specialRemarks: updatedData.specialRemarks || null,
        status: "PENDING"
      };

      console.log("Sending update data:", JSON.stringify(bookingData, null, 2));

      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();
      console.log("Backend response:", responseData);

      if (!response.ok) {
        console.error("Backend error details:", responseData);
        throw new Error(responseData.message || "Failed to update booking");
      }

      // Refetch the booking data to update the UI
      await fetchBookingData();
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleSendInquiry = async () => {
    if (!booking) return;

    try {
      // Transform the data to match backend expectations
      const bookingData = {
        bookingId: booking.bookingId,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        addressLine1: booking.addressLine1,
        addressLine2: booking.addressLine2 || null,
        postalCode: booking.postalCode,
        city: booking.city,
        country: booking.country,
        jettyPoint: booking.jettyPoint.id.toString(),
        packageId: booking.packageDetails.id.toString(),
        bookingDate: booking.bookingDate,
        passengers: booking.passengers,
        addOns: booking.addOns.map((addon: any) => addon.id.toString()),
        alternativeDate1: booking.alternativeDate1 || null,
        alternativeDate2: booking.alternativeDate2 || null,
        specialRemarks: booking.specialRemarks || null,
        status: "CONFIRMED"
      };

      console.log("Sending inquiry data:", JSON.stringify(bookingData, null, 2));

      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();
      console.log("Backend response:", responseData);

      if (!response.ok) {
        console.error("Backend error details:", responseData);
        throw new Error(responseData.message || "Failed to update booking");
      }

      setCompletionDialogOpen(true);
    } catch (error) {
      console.error("Error updating booking:", error);
      setError("Failed to send inquiry. Please try again.");
    }
  };

  useEffect(() => {
    if (clearLocalStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [clearLocalStorage]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">No booking data found</Alert>
        </Box>
      </Container>
    );
  }

  const selectedPackage = packages.find(
    (pkg) => pkg.id === booking.packageDetails.id
  );

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
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0384BD",
                "&:hover": {
                  bgcolor: "rgba(3, 132, 189, 0.9)",
                },
                px: 4,
              }}
              onClick={handleSendInquiry}
            >
              Send Inquiry
            </Button>
          </Box>
        </Paper>
      </Box>
      <EditBookingDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        bookingData={booking}
        onUpdate={handleUpdateBooking}
      />
      <CompletionDialog
        open={completionDialogOpen}
        onClose={() => setCompletionDialogOpen(false)}
      />
    </Container>
  );
};

export default SummaryPage;
