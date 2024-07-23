import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import WeatherDisplay from './';
import { WeatherForecast } from '@domain/models/Weather';

const mockForecast: WeatherForecast[] = [
  {
    number: 1,
    name: 'Monday',
    temperature: 70,
    temperatureUnit: 'F',
    shortForecast: 'Sunny',
    startTime: '2024-07-22T06:00:00-04:00',
    icon: 'https://example.com/icon1.png',
  },
  {
    number: 2,
    name: 'Tuesday',
    temperature: 75,
    temperatureUnit: 'F',
    shortForecast: 'Partly Cloudy',
    startTime: '2024-07-23T06:00:00-04:00',
    icon: 'https://example.com/icon2.png',
  },
];

describe('WeatherDisplay Component', () => {
  it('renders forecast items correctly', () => {
    render(<WeatherDisplay forecast={mockForecast} />);

    mockForecast.forEach((day) => {
      expect(screen.getByText(new RegExp(day.name, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${day.temperature}°F`, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(day.shortForecast, 'i'))).toBeInTheDocument();
      expect(screen.getByAltText(day.shortForecast)).toHaveAttribute('src', day.icon);
    });
  });

  it('formats dates correctly', () => {
    render(<WeatherDisplay forecast={mockForecast} />);

    expect(screen.getByText('Monday 7/22')).toBeInTheDocument();
    expect(screen.getByText('Tuesday 7/23')).toBeInTheDocument();
  });
});
