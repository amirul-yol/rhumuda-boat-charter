import React from "react";
import { Typography, Stack } from "@mui/material";
import { PriceTier } from "../../types/package";

interface PriceDisplayProps {
  priceTiers: PriceTier[];
  categoryId: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceTiers,
  categoryId,
}) => {
  if (categoryId === 1 || categoryId === 3) {
    // Boat Charter or Fishing
    const fixedPrice = priceTiers.find((tier) => tier.type === "FIXED");
    return (
      <Typography
        variant="subtitle1"
        sx={{ textAlign: "center", fontWeight: 500 }}
      >
        RM{fixedPrice?.price} | {fixedPrice?.label}
      </Typography>
    );
  }

  // Day Trip packages (categoryId === 2)
  return (
    <Stack spacing={0.5} alignItems="center">
      {priceTiers.map((tier, index) => (
        <Typography
          key={`${tier.type}-${tier.price}-${index}`}
          variant="subtitle2"
          sx={{
            textAlign: "center",
            fontWeight: tier.type === "ADULT" ? 500 : 400,
          }}
        >
          RM{tier.price} | {tier.label}
        </Typography>
      ))}
    </Stack>
  );
};

export default PriceDisplay;
