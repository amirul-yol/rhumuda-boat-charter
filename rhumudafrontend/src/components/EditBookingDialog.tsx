import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AdapterDayjs
} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import PaidIcon from "@mui/icons-material/Paid";
import CheckIcon from "@mui/icons-material/Check";

interface EditBookingDialogProps {
  open: boolean;
  onClose: () => void;
  bookingData: any;
  onUpdate: (updatedData: any) => Promise<void>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`edit-booking-tabpanel-${index}`}
      aria-labelledby={`edit-booking-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `edit-booking-tab-${index}`,
    "aria-controls": `edit-booking-tabpanel-${index}`,
  };
}

const EditBookingDialog: React.FC<EditBookingDialogProps> = ({
  open,
  onClose,
  bookingData,
  onUpdate,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(bookingData);
  const [jettyPoints, setJettyPoints] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [addOns, setAddOns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jetty points
        const jettyResponse = await fetch("http://localhost:8080/api/jetty-points");
        const jettyData = await jettyResponse.json();
        setJettyPoints(jettyData);

        // Fetch packages
        const packagesResponses = await Promise.all([
          fetch("http://localhost:8080/api/packages/category/1"),
          fetch("http://localhost:8080/api/packages/category/2"),
          fetch("http://localhost:8080/api/packages/category/3"),
        ]);
        const packagesData = await Promise.all(packagesResponses.map(r => r.json()));
        setPackages(packagesData.flat());

        // Fetch add-ons
        const addOnsResponse = await fetch("http://localhost:8080/api/addons");
        const addOnsData = await addOnsResponse.json();
        setAddOns(addOnsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onUpdate(formData);
      onClose();
    } catch (error) {
      console.error("Error updating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Booking Details</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Customer Info" {...a11yProps(0)} />
            <Tab label="Reservation Details" {...a11yProps(1)} />
            <Tab label="Additional Options" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Customer Info Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 1"
                value={formData.addressLine1}
                onChange={(e) => handleInputChange("addressLine1", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2"
                value={formData.addressLine2}
                onChange={(e) => handleInputChange("addressLine2", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Reservation Details Tab */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Jetty Point</InputLabel>
                <Select
                  value={formData.jettyPoint.id.toString()}
                  onChange={(e: SelectChangeEvent) =>
                    handleInputChange("jettyPoint", {
                      id: parseInt(e.target.value),
                      name: jettyPoints.find(jp => jp.id.toString() === e.target.value)?.name
                    })
                  }
                >
                  {jettyPoints.map((point) => (
                    <MenuItem key={point.id} value={point.id.toString()}>
                      {point.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Booking Date"
                  value={dayjs(formData.bookingDate)}
                  onChange={(newValue) =>
                    handleInputChange(
                      "bookingDate",
                      newValue ? newValue.format("YYYY-MM-DD") : null
                    )
                  }
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Passengers"
                value={formData.passengers}
                onChange={(e) =>
                  handleInputChange("passengers", parseInt(e.target.value))
                }
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Package</InputLabel>
                <Select
                  value={formData.packageDetails.id.toString()}
                  onChange={(e: SelectChangeEvent) => {
                    const selectedPackage = packages.find(p => p.id.toString() === e.target.value);
                    if (selectedPackage) {
                      handleInputChange("packageDetails", {
                        id: selectedPackage.id,
                        name: selectedPackage.name,
                        description: selectedPackage.description,
                        basePrice: selectedPackage.basePrice,
                        maxCapacity: selectedPackage.maxCapacity,
                        durationMinutes: selectedPackage.durationMinutes,
                        services: selectedPackage.services
                      });
                    }
                  }}
                >
                  {packages.map((pkg) => (
                    <MenuItem key={pkg.id} value={pkg.id.toString()}>
                      {pkg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Package Info */}
            {formData.packageDetails && (
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Package Info
                  </Typography>
                  <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        <AccessTimeIcon
                          sx={{ fontSize: "small", verticalAlign: "middle", mr: 0.5 }}
                        />
                        Duration: {formData.packageDetails.durationMinutes} minutes
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        <GroupIcon
                          sx={{ fontSize: "small", verticalAlign: "middle", mr: 0.5 }}
                        />
                        Max Capacity: {formData.packageDetails.maxCapacity} persons
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        <PaidIcon
                          sx={{ fontSize: "small", verticalAlign: "middle", mr: 0.5 }}
                        />
                        RM{formData.packageDetails.basePrice}{" "}
                        {formData.packageDetails.maxCapacity ? "/ FIXED" : "/ PERSON"}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="subtitle2" gutterBottom>
                    Services Included:
                  </Typography>
                  <List dense>
                    {formData.packageDetails.services?.map((service: any) => (
                      <ListItem key={service.id} sx={{ py: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon sx={{ fontSize: "small" }} />
                        </ListItemIcon>
                        <ListItemText primary={service.name} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Add-ons
              </Typography>
              <FormGroup>
                {addOns.map((addon) => (
                  <FormControlLabel
                    key={addon.id}
                    control={
                      <Checkbox
                        checked={formData.addOns.some((a: any) => a.id === addon.id)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFormData((prev: any) => ({
                            ...prev,
                            addOns: isChecked
                              ? [...prev.addOns, { id: addon.id, name: addon.name, price: addon.price }]
                              : prev.addOns.filter((a: any) => a.id !== addon.id),
                          }));
                        }}
                      />
                    }
                    label={`${addon.name} (RM${addon.price})`}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Additional Options Tab */}
        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Alternative Date 1"
                  value={formData.alternativeDate1 ? dayjs(formData.alternativeDate1) : null}
                  onChange={(newValue) =>
                    handleInputChange(
                      "alternativeDate1",
                      newValue ? newValue.format("YYYY-MM-DD") : null
                    )
                  }
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Alternative Date 2"
                  value={formData.alternativeDate2 ? dayjs(formData.alternativeDate2) : null}
                  onChange={(newValue) =>
                    handleInputChange(
                      "alternativeDate2",
                      newValue ? newValue.format("YYYY-MM-DD") : null
                    )
                  }
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Special Remarks"
                value={formData.specialRemarks || ""}
                onChange={(e) => handleInputChange("specialRemarks", e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: "#0384BD", "&:hover": { bgcolor: "#026994" } }}
        >
          {loading ? "Updating..." : "Update Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookingDialog;
