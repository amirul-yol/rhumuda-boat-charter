import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import PaidIcon from '@mui/icons-material/Paid';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import EditIcon from '@mui/icons-material/Edit';

interface BookingData {
  bookingId: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string | null;
  postalCode: string;
  city: string;
  country: string;
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
    distanceMinKm: number | null;
    distanceMaxKm: number | null;
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

const ManageBooking = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      if (!bookingId) {
        setError('No booking ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          if (data && data.message) {
            throw new Error(data.message);
          } else if (response.status === 404) {
            throw new Error(`No booking found with ID: ${bookingId}`);
          } else {
            throw new Error(`Failed to fetch booking details: ${response.statusText}`);
          }
        }

        setBooking(data);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [bookingId]);

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit booking:', bookingId);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert 
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={handleBack}>
                Go Back
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert 
            severity="info"
            action={
              <Button color="inherit" size="small" onClick={handleBack}>
                Go Back
              </Button>
            }
          >
            No booking information available
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Booking Details
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{ bgcolor: '#0384BD', '&:hover': { bgcolor: 'rgba(3, 132, 189, 0.9)' } }}
          >
            Edit Booking
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Booking ID
              </Typography>
              <Typography variant="body1" gutterBottom>
                {booking.bookingId}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: booking.status === 'CONFIRMED' ? 'success.main' : 
                         booking.status === 'PENDING' ? 'warning.main' : 
                         'error.main'
                }}
              >
                {booking.status}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Customer Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography>
                    {`${booking.firstName} ${booking.lastName}`}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact
                  </Typography>
                  <Typography>{booking.email}</Typography>
                  <Typography>{booking.phoneNumber}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Address
              </Typography>
              <Typography>
                {booking.addressLine1}
                {booking.addressLine2 && <><br />{booking.addressLine2}</>}
                <br />
                {`${booking.postalCode} ${booking.city}`}
                <br />
                {booking.country}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Package Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {booking.packageDetails.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {booking.packageDetails.description}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                  <Typography variant="body2">
                    Duration: {booking.packageDetails.durationMinutes} minutes
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <GroupsIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                  <Typography variant="body2">
                    Max Capacity: {booking.packageDetails.maxCapacity} persons
                  </Typography>
                </Stack>
                {booking.packageDetails.distanceMinKm && booking.packageDetails.distanceMaxKm && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DirectionsBoatIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                    <Typography variant="body2">
                      Distance: {booking.packageDetails.distanceMinKm} - {booking.packageDetails.distanceMaxKm} km
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PaidIcon sx={{ color: "#0384BD", fontSize: 20 }} />
                  <Typography variant="body2">
                    Base Price: RM{booking.packageDetails.basePrice}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Included Services:
              </Typography>
              <Stack spacing={0.5}>
                {booking.packageDetails.services.map((service) => (
                  <Typography key={service.id} variant="body2" color="text.secondary">
                    {service.name}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Jetty Point
                  </Typography>
                  <Typography>
                    {booking.jettyPoint.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Number of Passengers
                  </Typography>
                  <Typography>
                    {booking.passengers}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Booking Date
                  </Typography>
                  <Typography>
                    {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
                {booking.alternativeDate1 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Alternative Date 1
                    </Typography>
                    <Typography>
                      {new Date(booking.alternativeDate1).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
                {booking.alternativeDate2 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Alternative Date 2
                    </Typography>
                    <Typography>
                      {new Date(booking.alternativeDate2).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>
            {booking.specialRemarks && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Special Remarks
                </Typography>
                <Typography>
                  {booking.specialRemarks}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>

        {booking.addOns && booking.addOns.length > 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add-ons
            </Typography>
            <Grid container spacing={2}>
              {booking.addOns.map((addon) => (
                <Grid item xs={12} key={addon.id}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{addon.name}</Typography>
                    <Typography>RM{addon.price}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default ManageBooking;
