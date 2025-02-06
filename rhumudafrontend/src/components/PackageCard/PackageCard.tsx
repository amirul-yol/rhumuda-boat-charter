import React from "react";
import { Box, Typography, Button, Paper, Chip, Stack } from "@mui/material";
import { Package } from "../../types/package";
import PriceDisplay from "./PriceDisplay";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import StraightenIcon from "@mui/icons-material/Straighten";

const PackageCard: React.FC<Package> = ({
  title,
  name,
  categoryId,
  priceTiers = [],
  services = [],
  imageUrl,
  maxCapacity,
  durationMinutes,
  distanceMinKm,
  distanceMaxKm,
}) => {
  const renderAdditionalInfo = () => {
    const items = [];

    if (durationMinutes) {
      items.push(
        <Stack key="duration" direction="row" spacing={0.5} alignItems="center">
          <AccessTimeIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2">
            {Math.floor(durationMinutes / 60)}h
          </Typography>
        </Stack>
      );
    }

    if (maxCapacity) {
      items.push(
        <Stack key="capacity" direction="row" spacing={0.5} alignItems="center">
          <GroupsIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2">{maxCapacity} pax</Typography>
        </Stack>
      );
    }

    if (distanceMinKm && distanceMaxKm) {
      items.push(
        <Stack key="distance" direction="row" spacing={0.5} alignItems="center">
          <StraightenIcon sx={{ fontSize: 16 }} />
          <Typography variant="body2">
            {distanceMinKm}-{distanceMaxKm}km
          </Typography>
        </Stack>
      );
    }

    return items.length > 0 ? (
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 1, mb: 2 }}
      >
        {items}
      </Stack>
    ) : null;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        height: 620,
        border: "1px solid black",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: "0 0 auto", pt: 2 }}>
        <Typography
          variant="h6"
          sx={{
            p: 2,
            pb: 1,
            textAlign: "center",
            color: "black",
            fontWeight: 500,
            fontSize: "1.25rem",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            pb: 2,
            textAlign: "center",
            color: "black",
            fontWeight: 500,
            fontSize: "1.5rem",
          }}
        >
          {name}
        </Typography>
      </Box>

      <Box sx={{ flex: "0 0 160px", position: "relative" }}>
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: "90%",
            height: "90%",
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <PriceDisplay priceTiers={priceTiers} categoryId={categoryId} />

        {renderAdditionalInfo()}

        <Box
          sx={{
            mt: 2,
            mb: 3,
            borderTop: "1px solid #e0e0e0",
            pt: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              mb: 1,
              fontWeight: 500,
            }}
          >
            Service Includes:
          </Typography>
          {services.map((service, index) => (
            <Typography
              key={index}
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: "center",
                mb: 0.5,
              }}
            >
              {service.name}
            </Typography>
          ))}
        </Box>
      </Box>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#0384BD",
            textTransform: "none",
            borderRadius: 1,
            "&:hover": {
              bgcolor: "#026994",
            },
          }}
        >
          Book Now
        </Button>
      </Box>
    </Paper>
  );
};

export default PackageCard;
