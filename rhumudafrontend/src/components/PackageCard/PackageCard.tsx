import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Package } from "../../types/package";

type PackageCardProps = Package;

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  priceLabel,
  services,
  imageUrl,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          pb: 1,
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 160,
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box sx={{ p: 2, pt: 1.5 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          RM{price} | {priceLabel}
        </Typography>

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
