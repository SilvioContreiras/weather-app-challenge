/*import { useQuery } from "react-query";
import { getWeatherForecast } from "@services/weatherService";
import { Coordinates } from "@domain/models/Address";
import { WeatherForecast } from "@domain/models/Weather";

const useWeatherForecast = (coordinates: Coordinates | null) => {
  return useQuery<WeatherForecast[], Error>(
    ["weatherForecast", coordinates],
    () => {
      if (coordinates) {
        return getWeatherForecast(coordinates.y, coordinates.x);
      }
      return Promise.reject(new Error("Coordinates are not set"));
    },
    {
      enabled: !!coordinates,
      onError: (err) => {
        console.error("Error fetching weather forecast:", err);
      },
    }
  );
};

export default useWeatherForecast;*/

import { useQuery } from 'react-query';
import { getWeatherForecast } from '@services/weatherService';
import { Coordinates } from '@domain/models/Address';
import { WeatherForecast } from '@domain/models/Weather';

const useWeatherForecast = (coordinates: Coordinates | null) => {
  return useQuery<WeatherForecast[], Error>(
    ['weatherForecast', coordinates],
    () => getWeatherForecast(coordinates!.y, coordinates!.x),
    {
      enabled: !!coordinates,
    }
  );
};

export default useWeatherForecast;

