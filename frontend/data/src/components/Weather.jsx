import React, { useEffect, useState } from "react";
import NewSidebar from "./Newsidebar";
import {
  ThermometerSun,
  MapPin,
  CloudSun,
  Droplets,
  Wind,
  Loader,
  AlertCircle,
} from "lucide-react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // const { latitude, longitude } = position.coords;
        const latitude = 18.4583302;
        const longitude = 73.8758069;
        fetch(
          // `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9991054f1f28f55c0b4f59cf41603c12`
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9991054f1f28f55c0b4f59cf41603c12`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.cod === 200) {
              setWeather(data);
            } else {
              setError("Failed to fetch weather data.");
            }
          })
          .catch(() => {
            setError("Something went wrong while fetching weather data.");
          });
      },
      () => {
        setError("Location access denied.");
      }
    );
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-64 bg-gray-800 text-white">
        <NewSidebar />
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        {error ? (
          <div className="flex items-center gap-3 text-red-600 text-xl font-medium bg-white shadow p-6 rounded-lg">
            <AlertCircle className="text-red-500" />
            {error}
          </div>
        ) : weather && weather.main && weather.weather ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-700 flex items-center justify-center gap-2">
                <CloudSun className="text-yellow-500" /> Weather Report
              </h2>
              <p className="text-gray-500 mt-1 flex items-center justify-center gap-1">
                <MapPin size={16} /> {weather.name}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 flex items-center gap-2">
                  <ThermometerSun className="text-red-500" /> Temperature
                </p>
                <p className="font-semibold text-gray-800">
                  {(weather.main.temp-273.15).toFixed(2)}°C
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-600 flex items-center gap-2">
                  <Droplets className="text-blue-500" /> Humidity
                </p>
                <p className="font-semibold text-gray-800">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-600 flex items-center gap-2">
                  <Wind className="text-sky-500" /> Wind Speed
                </p>
                <p className="font-semibold text-gray-800">
                  {weather.wind.speed} m/s
                </p>
              </div>

              <div className="pt-4 text-center text-gray-700 italic">
                “{weather.weather[0].description}”
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-600 text-lg">
            <Loader className="animate-spin" />
            Loading weather...
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;



