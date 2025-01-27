import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, CircularProgress, Alert } from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import boatIcon from "../../src/assets/icons/boat_color.png";
import islandIcon from "../../src/assets/icons/island_color.png";
import fishingIcon from "../../src/assets/icons/fishing_color.png";
import { Package } from "../types/package";
import PackageCard from "../components/PackageCard/PackageCard";

const HomePage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("boat");
  const [categoryName, setCategoryName] = useState<string>("Boat Charter");

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    try {
      const response = await fetch(`http://localhost:8080/api/package-categories/${
        category === "boat" ? 1 : category === "island" ? 2 : 3
      }`);
      const data = await response.json();
      setCategoryName(data.name);
    } catch (err) {
      setError("Failed to load category name");
    }
  };

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchPackages = async () => {
      try {
        // Simulated API call
        const response = await Promise.resolve([
          {
            id: "1",
            title: "Package 1",
            price: "750",
            priceLabel: "Private boat",
            services: [
              { name: "Return trip" },
              { name: "Free Activity" },
              { name: "Snorkeling" },
            ],
            imageUrl: "../../src/assets/packages/boat/package1.jpg",
          },
        ]);
        setPackages(response);
      } catch (err) {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedCategory]);

  return (
    <Box>
      {/* Package Selector Section */}
      <Stack
        direction="row"
        spacing={4}
        justifyContent="left"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Box
          component="img"
          src={boatIcon}
          alt="Boat Charter"
          onClick={() => handleCategorySelect("boat")}
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <Box
          component="img"
          src={islandIcon}
          alt="Island Trips"
          onClick={() => handleCategorySelect("island")}
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <Box
          component="img"
          src={fishingIcon}
          alt="Fishing Trips"
          onClick={() => handleCategorySelect("fishing")}
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Stack>

      {/* Package Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mt: 4,
          mb: 3,
          textAlign: "left",
          fontWeight: 500,
          color: "text.primary",
        }}
      >
        {categoryName}
      </Typography>

      <Box sx={{ mt: 4, display: "flex", gap: 3 }}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
