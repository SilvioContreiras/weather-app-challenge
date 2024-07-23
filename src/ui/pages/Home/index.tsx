import React, { useState } from "react";
import { useQueryClient } from "react-query";
import AddressForm from "@components/AddressForm";
import WeatherDisplay from "@components/WeatherDisplay";
import { getCoordinates } from "@services/geocodingService";
import { Coordinates } from "@domain/models/Address";
import { Snackbar, Alert, Container, Typography, CircularProgress, Box } from "@mui/material";
import { validateAddress } from "@utils/validateAddress";
import useWeatherForecast from "ui/hooks/useWeatherForecast";
import { setErrorMessage } from "@utils/setErrorMessage";

const Home: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: forecast, isLoading } = useWeatherForecast(coordinates);

  const handleAddressSubmit = async (address: string) => {
    if (!validateAddress(address)) {
      setError("Please provide a valid address with a structure number and street name.");
      return;
    }

    try {
      setError(null);
      const coords = await getCoordinates(address);
      setCoordinates(coords);
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      setError(setErrorMessage(err));
    }
  };

  const handleClear = () => {
    setCoordinates(null);
    setError(null);
    queryClient.removeQueries("weatherForecast");
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" my={4}>
        <Typography variant="h5" gutterBottom>
          Weather Forecast
        </Typography>
      </Box>
      <AddressForm onAddressSubmit={handleAddressSubmit} onClear={handleClear} />
      
      {forecast && forecast.length && <WeatherDisplay forecast={forecast} />}

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
