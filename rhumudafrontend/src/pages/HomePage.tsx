import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import boatIcon from "../../src/assets/icons/boat_color.png";
import islandIcon from "../../src/assets/icons/island_color.png";
import fishingIcon from "../../src/assets/icons/fishing_color.png";
import { Package } from "../types/package";
import PackageCard from "../components/PackageCard/PackageCard";
import FishingCategoryHeader from "../components/FishingCategoryHeader";

const HomePage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("boat");
  const [categoryName, setCategoryName] = useState<string>("Boat Charter");

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    try {
      const response = await fetch(
        `http://localhost:8080/api/package-categories/${
          category === "boat" ? 1 : category === "island" ? 2 : 3
        }`
      );
      const data = await response.json();
      setCategoryName(data.name);
    } catch (err) {
      setError("Failed to load category name");
    }
  };

  const sortFishingPackages = (packages: Package[]) => {
    if (selectedCategory !== "fishing") return packages;

    // Sort by fishing type (Deep Sea first, then Squid)
    return [...packages].sort((a, b) => {
      if (a.fishingType === "DEEP_SEA" && b.fishingType === "SQUID") return -1;
      if (a.fishingType === "SQUID" && b.fishingType === "DEEP_SEA") return 1;
      return 0;
    });
  };

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const categoryId =
          selectedCategory === "boat"
            ? 1
            : selectedCategory === "island"
            ? 2
            : 3;
        const response = await fetch(
          `http://localhost:8080/api/packages/category/${categoryId}`
        );
        const data = (await response.json()) as Package[];

        // Sort packages if it's fishing category
        const sortedPackages = sortFishingPackages(data);
        setPackages(sortedPackages);
      } catch (err) {
        console.error("Error details:", err);
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedCategory]);

  const renderPackages = () => {
    if (selectedCategory === "fishing") {
      const deepSeaPackages = packages.filter(
        (pkg) => pkg.fishingType === "DEEP_SEA"
      );
      const squidPackages = packages.filter(
        (pkg) => pkg.fishingType === "SQUID"
      );

      return (
        <Box sx={{ width: "100%" }}>
          {deepSeaPackages.length > 0 && (
            <Box>
              <FishingCategoryHeader type="DEEP_SEA" />
              <Grid container spacing={3}>
                {deepSeaPackages.map((pkg) => (
                  <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                    <PackageCard {...pkg} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {squidPackages.length > 0 && (
            <Box>
              <FishingCategoryHeader type="SQUID" />
              <Grid container spacing={3}>
                {squidPackages.map((pkg) => (
                  <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                    <PackageCard {...pkg} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <PackageCard {...pkg} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      {/* Category Selector Section */}
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

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && renderPackages()}
      </Box>
    </Box>
  );
};

export default HomePage;
