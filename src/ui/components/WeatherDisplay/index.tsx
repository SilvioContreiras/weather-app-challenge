import React from "react";
import { WeatherForecast } from "@domain/models/Weather";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { formatDate } from "@utils/formatDate";
import { WeatherIcon } from './styles'

interface WeatherProps {
  forecast: WeatherForecast[];
}

const WeatherDisplay: React.FC<WeatherProps> = ({ forecast }) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
      mt={10}
      mb={10}
    >
      {forecast.map((day, index) => (
        <Card key={index}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={2}
            >
              <WeatherIcon src={day.icon} alt={day.shortForecast} />
            </Box>
            <Typography variant="subtitle2" align="center">
              {day.name} {formatDate(day.startTime)}
            </Typography>
            <Typography variant="h6" align="center">
              {day.temperature}°F
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ width: "160px" }}
              align="center"
            >
              {day.shortForecast}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default WeatherDisplay;
