import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

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
  description: string;
  price: number;
  is_active: boolean;
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

interface PriceTier {
  id: number;
  price: number;
  type: string;
}

interface IncludedService {
  id: number;
  name?: string;
  serviceName?: string;
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

  const getAddOnName = (id: string) => {
    const addOn = addOns.find((addon) => addon.id.toString() === id);
    return addOn ? addOn.name : id;
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedPackage.description}
            </Typography>
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
              {/* <Typography variant="subtitle1" fontWeight={500}>
                Package Description
              </Typography> */}
              {packages.find(
                (pkg) => pkg.id.toString() === data.reservationDetails.packageId
              )?.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {
                    packages.find(
                      (pkg) =>
                        pkg.id.toString() === data.reservationDetails.packageId
                    )?.description
                  }
                </Typography>
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
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Reservation Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Jetty Point:</strong>{" "}
                {getJettyPointName(data.reservationDetails.jettyPoint)}
              </Typography>
              <Typography>
                <strong>Booking Date:</strong>{" "}
                {formatDate(data.reservationDetails.bookingDate)}
              </Typography>
              <Typography>
                <strong>Number of Passengers:</strong>{" "}
                {data.reservationDetails.passengers}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderPackageInfo(data.reservationDetails.packageId)}
              <Typography>
                <strong>Add-ons:</strong>
              </Typography>
              {data.reservationDetails.addOns.length > 0 ? (
                <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                  {data.reservationDetails.addOns.map((addonId) => (
                    <li key={addonId}>
                      <Typography component="span">
                        {getAddOnName(addonId)}
                      </Typography>
                    </li>
                  ))}
                </Box>
              ) : (
                <Typography>No add-ons selected</Typography>
              )}
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
                {formatDate(data.otherOptions.alternativeDate1)}
              </Typography>
              <Typography>
                <strong>Alternative Date 2:</strong>{" "}
                {formatDate(data.otherOptions.alternativeDate2)}
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
