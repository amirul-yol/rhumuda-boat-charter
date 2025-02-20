import React, { useState, useEffect } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

interface AddOn {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  perPerson: boolean;
}

interface AddOnSelectionProps {
  selectedAddOns: string[];
  onAddOnChange: (addOnId: string) => void;
  passengers: number;
}

const AddOnSelection: React.FC<AddOnSelectionProps> = ({
  selectedAddOns,
  onAddOnChange,
  passengers,
}) => {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/addons");
        if (!response.ok) throw new Error("Failed to fetch add-ons");
        const data = await response.json();
        setAddOns(data);
      } catch (error) {
        console.error("Error fetching add-ons:", error);
        setError("Failed to load add-ons");
      }
    };

    fetchAddOns();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const getAddOnPriceLabel = (addon: AddOn) => {
    const basePrice = addon.price;
    if (addon.perPerson) {
      const totalPrice = basePrice * passengers;
      return `${addon.name} (RM${basePrice}/person × ${passengers} = RM${totalPrice})`;
    }
    return `${addon.name} (RM${basePrice})`;
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Add-ons
      </Typography>
      <FormGroup>
        {addOns.map((addon) => (
          <FormControlLabel
            key={addon.id}
            control={
              <Checkbox
                checked={selectedAddOns.includes(addon.id.toString())}
                onChange={() => onAddOnChange(addon.id.toString())}
              />
            }
            label={getAddOnPriceLabel(addon)}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default AddOnSelection;
