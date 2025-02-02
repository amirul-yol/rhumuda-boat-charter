import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import locationMap from "../assets/images/location-rhumuda.png";
import Description from "../components/Description";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CompletionDialog from "../components/CompletionDialog";

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

const STORAGE_KEY = "rhumuda_inquiry_form";

const formatDate = (dateString: string) => {
  return dateString ? dayjs(dateString).format("DD/MM/YYYY") : "Not specified";
};

const SummaryPage: React.FC = () => {
  const [data, setData] = useState<StorageData | null>(null);
  const [jettyPoints, setJettyPoints] = useState<JettyPoint[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const navigate = useNavigate();
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);

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

  const getJettyPointName = (id: string) => {
    const jettyPoint = jettyPoints.find((point) => point.id.toString() === id);
    return jettyPoint ? jettyPoint.name : id;
  };

  const getPackageName = (id: string) => {
    const pkg = packages.find((p) => p.id.toString() === id);
    return pkg ? pkg.name : id;
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

  const handleEditDetails = () => {
    navigate("/inquiry");
  };

  const handleSendInquiry = async () => {
    if (!data) return;

    try {
      // Prepare booking data
      const bookingData = {
        bookingId: data.bookingId,
        status: "PENDING",
        ...data.customerInfo,
        ...data.reservationDetails,
        ...data.otherOptions,
      };

      // Send booking data to backend
      const bookingResponse = await fetch(
        "http://localhost:8080/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }

      const booking = await bookingResponse.json();

      // If there are add-ons, create booking add-ons relationships
      if (data.reservationDetails.addOns.length > 0) {
        const addOnsData = data.reservationDetails.addOns.map((addonId) => ({
          bookingId: booking.id,
          addonId: parseInt(addonId),
        }));

        const addOnsResponse = await fetch(
          "http://localhost:8080/api/booking-addons",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addOnsData),
          }
        );

        if (!addOnsResponse.ok) {
          throw new Error("Failed to create booking add-ons");
        }
      }

      // Clear localStorage after successful submission
      localStorage.removeItem("rhumuda_inquiry_form");

      // Show completion dialog
      setCompletionDialogOpen(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      // Here you would typically show an error message to the user
    }
  };

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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Booking ID:</strong> {data.bookingId || "Not generated"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Package:</strong>{" "}
                {getPackageName(data.reservationDetails.packageId)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {packages.find(
                (pkg) => pkg.id.toString() === data.reservationDetails.packageId
              )?.description && (
                <Description
                  text={
                    packages.find(
                      (pkg) =>
                        pkg.id.toString() === data.reservationDetails.packageId
                    )?.description || ""
                  }
                />
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
                {`${data.customerInfo.firstName} ${data.customerInfo.lastName}`}
              </Typography>
              <Typography>
                <strong>Email:</strong> {data.customerInfo.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {data.customerInfo.phoneNumber}
              </Typography>
              <Typography>
                <strong>Address:</strong>{" "}
                {`${data.customerInfo.addressLine1}${
                  data.customerInfo.addressLine2
                    ? `, ${data.customerInfo.addressLine2}`
                    : ""
                }, ${data.customerInfo.postalCode} ${data.customerInfo.city}, ${
                  data.customerInfo.country
                }`}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditDetails}
              sx={{
                color: "#0384BD",
                borderColor: "#0384BD",
                "&:hover": {
                  borderColor: "#0384BD",
                  backgroundColor: "rgba(3, 132, 189, 0.04)",
                },
              }}
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
                    Duration:{" "}
                    {
                      packages.find(
                        (pkg) =>
                          pkg.id.toString() ===
                          data.reservationDetails.packageId
                      )?.durationMinutes
                    }{" "}
                    minutes
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <GroupsIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                  <Typography variant="body2">
                    Max Capacity:{" "}
                    {
                      packages.find(
                        (pkg) =>
                          pkg.id.toString() ===
                          data.reservationDetails.packageId
                      )?.maxCapacity
                    }{" "}
                    persons
                  </Typography>
                </Stack>
                {packages.find(
                  (pkg) =>
                    pkg.id.toString() === data.reservationDetails.packageId
                )?.distanceMinKm &&
                  packages.find(
                    (pkg) =>
                      pkg.id.toString() === data.reservationDetails.packageId
                  )?.distanceMaxKm && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <DirectionsBoatIcon
                        sx={{ color: "#0384BD", fontSize: 20 }}
                      />
                      <Typography variant="body2">
                        Distance:{" "}
                        {
                          packages.find(
                            (pkg) =>
                              pkg.id.toString() ===
                              data.reservationDetails.packageId
                          )?.distanceMinKm
                        }{" "}
                        -{" "}
                        {
                          packages.find(
                            (pkg) =>
                              pkg.id.toString() ===
                              data.reservationDetails.packageId
                          )?.distanceMaxKm
                        }{" "}
                        km
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
                {packages
                  .find(
                    (pkg) =>
                      pkg.id.toString() === data.reservationDetails.packageId
                  )
                  ?.services.map((service) => (
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
                  {getJettyPointName(data.reservationDetails.jettyPoint)}
                </Typography>
                <Typography>
                  <strong>Booking Date:</strong>{" "}
                  {formatDate(data.reservationDetails.bookingDate)}
                </Typography>
                <Typography>
                  <strong>Passengers:</strong>{" "}
                  {data.reservationDetails.passengers}
                </Typography>
                <Typography>
                  <strong>Alternative Date 1:</strong>{" "}
                  {formatDate(data.otherOptions.alternativeDate1)}
                </Typography>
                <Typography>
                  <strong>Alternative Date 2:</strong>{" "}
                  {formatDate(data.otherOptions.alternativeDate2)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Typography>
                  <strong>Base Cost:</strong>{" "}
                  {(() => {
                    const selectedPackage = packages.find(
                      (pkg) =>
                        pkg.id.toString() === data.reservationDetails.packageId
                    );

                    if (!selectedPackage) return "RM0";

                    // Check if package has fixed pricing
                    const hasFixedPrice = selectedPackage.priceTiers.some(
                      (tier) => tier.type === "FIXED"
                    );

                    const basePrice = selectedPackage.basePrice;

                    return `RM${
                      hasFixedPrice
                        ? basePrice
                        : basePrice * data.reservationDetails.passengers
                    }`;
                  })()}
                </Typography>
                <Typography component="div">
                  <strong>Add-ons:</strong>
                  {data.reservationDetails.addOns.length > 0 ? (
                    <Box
                      component="ul"
                      sx={{ mt: 1, pl: 2, listStyleType: "none" }}
                    >
                      {data.reservationDetails.addOns.map((addonId, index) => {
                        const addon = addOns.find(
                          (a) => a.id.toString() === addonId
                        );
                        return addon ? (
                          <li key={addonId}>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {index + 1}. {addon.name} - RM{addon.price}
                            </Typography>
                          </li>
                        ) : null;
                      })}
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
                    const selectedPackage = packages.find(
                      (pkg) =>
                        pkg.id.toString() === data.reservationDetails.packageId
                    );

                    if (!selectedPackage) return "RM0";

                    const hasFixedPrice = selectedPackage.priceTiers.some(
                      (tier) => tier.type === "FIXED"
                    );

                    const basePrice = selectedPackage.basePrice;
                    const baseCost = hasFixedPrice
                      ? basePrice
                      : basePrice * data.reservationDetails.passengers;

                    const addOnsCost = data.reservationDetails.addOns.reduce(
                      (total, addonId) => {
                        const addon = addOns.find(
                          (a) => a.id.toString() === addonId
                        );
                        return total + (addon?.price || 0);
                      },
                      0
                    );

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
      <CompletionDialog
        open={completionDialogOpen}
        onClose={() => setCompletionDialogOpen(false)}
      />
    </Container>
  );
};

export default SummaryPage;
